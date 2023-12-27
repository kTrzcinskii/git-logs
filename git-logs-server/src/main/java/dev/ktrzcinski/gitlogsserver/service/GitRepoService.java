package dev.ktrzcinski.gitlogsserver.service;

import dev.ktrzcinski.gitlogsserver.dto.CreateGitRepoRequest;
import dev.ktrzcinski.gitlogsserver.dto.GetGitRepoResponse;
import dev.ktrzcinski.gitlogsserver.dto.SuccessResponse;
import dev.ktrzcinski.gitlogsserver.model.GitRepo;
import dev.ktrzcinski.gitlogsserver.model.User;
import dev.ktrzcinski.gitlogsserver.repository.GitRepoRepository;
import dev.ktrzcinski.gitlogsserver.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GitRepoService {
    private final GitRepoRepository gitRepoRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public Page<GetGitRepoResponse> getAll(int pageNumber) {
        var username = userService.getCurrentUserUsername();
        int pageSize = 100;
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
}
