package dev.ktrzcinski.gitlogsserver.service;

import dev.ktrzcinski.gitlogsserver.dto.CreateGitRepoRequest;
import dev.ktrzcinski.gitlogsserver.dto.GetGitRepoLogResponse;
import dev.ktrzcinski.gitlogsserver.dto.GetGitRepoResponse;
import dev.ktrzcinski.gitlogsserver.dto.SuccessResponse;
import dev.ktrzcinski.gitlogsserver.model.GitRepo;
import dev.ktrzcinski.gitlogsserver.model.User;
import dev.ktrzcinski.gitlogsserver.repository.GitRepoRepository;
import dev.ktrzcinski.gitlogsserver.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.eclipse.jgit.api.CloneCommand;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.LogCommand;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.revwalk.RevCommit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GitRepoService {
    private final GitRepoRepository gitRepoRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public Page<GetGitRepoResponse> getAll(int pageNumber) {
        var username = userService.getCurrentUserUsername();
        int pageSize = 10;
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return gitRepoRepository.findAllByUserUsername(username, pageable).map(this::mapToGetGitRepoResponse);
    }

    private GetGitRepoResponse mapToGetGitRepoResponse(GitRepo gitRepo) {
        return GetGitRepoResponse.builder()
                .name(gitRepo.getName())
                .id(gitRepo.getId())
                .repositoryUrl(gitRepo.getRepositoryUrl())
                .build();
    }

    public SuccessResponse create(CreateGitRepoRequest request) {
        User user = userRepository.findByUsername(userService.getCurrentUserUsername())
                .orElseThrow(RuntimeException::new);
        var gitRepo = GitRepo.builder()
                .name(request.getName())
                .repositoryUrl(request.getUrl())
                .build();
        gitRepo.setUser(user);
        gitRepoRepository.save(gitRepo);
        return SuccessResponse.builder().success(true).build();
    }

    public List<GetGitRepoLogResponse> getGitRepoLogs(Integer gitRepoId) {
        GitRepo gitRepo = gitRepoRepository.findById(gitRepoId).orElseThrow(RuntimeException::new);
        String repoUrl = gitRepo.getRepositoryUrl();
        File repoDir = cloneRepository(repoUrl);
        try (Git git = Git.open(repoDir)) {
            Iterable<RevCommit> logs = fetchLogs(git);
            List<GetGitRepoLogResponse> response = new ArrayList<>();
            for (RevCommit log : logs) {
                response.add(mapToGetGitRepoLogResponse(log));
            }
            return response;
        } catch (Exception e) {
            throw new RuntimeException("couldn't get git logs");
        }
    }

    private GetGitRepoLogResponse mapToGetGitRepoLogResponse(RevCommit commit) {
        return GetGitRepoLogResponse.builder()
                .authorName(commit.getAuthorIdent().getName())
                .authorEmail(commit.getAuthorIdent().getEmailAddress())
                .commitId(commit.getId().getName())
                .createdAt(LocalDateTime.ofInstant(Instant.ofEpochSecond(commit.getCommitTime()), ZoneId.systemDefault()))
                .content(commit.getFullMessage())
                .build();
    }

    private Iterable<RevCommit> fetchLogs(Git git) throws GitAPIException {
        LogCommand logCommand = git.log();
        int maxLogCount = 30;
        logCommand.setMaxCount(maxLogCount);
        return logCommand.call();
    }

    private static File cloneRepository(String repositoryUrl) {
        File tempDirectory = createTempDirectory();
        try {
            CloneCommand cloneCommand = Git.cloneRepository()
                    .setURI(repositoryUrl)
                    .setDirectory(tempDirectory)
                    .setCloneAllBranches(false);
            cloneCommand.call();
            return tempDirectory;
        } catch (Exception e) {
            throw new RuntimeException("couldn't clone repo");
        }
    }

    private static File createTempDirectory() {
        try {
            File tempDirectory = File.createTempFile("temp-git-repo-", Long.toString(System.nanoTime()));
            if (!(tempDirectory.delete() && tempDirectory.mkdir())) {
                throw new IllegalStateException("Unable to create a temporary directory");
            }
            return tempDirectory;
        } catch (IOException e) {
            throw new RuntimeException("couldn't create temp dir");
        }

    }
}
