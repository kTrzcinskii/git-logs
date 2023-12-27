package dev.ktrzcinski.gitlogsserver.controller;

import dev.ktrzcinski.gitlogsserver.dto.CreateGitRepoRequest;
import dev.ktrzcinski.gitlogsserver.dto.GetGitRepoLogResponse;
import dev.ktrzcinski.gitlogsserver.dto.GetGitRepoResponse;
import dev.ktrzcinski.gitlogsserver.dto.SuccessResponse;
import dev.ktrzcinski.gitlogsserver.service.GitRepoService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/gitrepo")
@RequiredArgsConstructor
public class GitRepoController {
    private final GitRepoService gitRepoService;

    @GetMapping
    public ResponseEntity<Page<GetGitRepoResponse>> getAll(@RequestParam(defaultValue = "0", name = "page") @PositiveOrZero(message = "Page number cannot be negative.") int page) {
        return ResponseEntity.status(HttpStatus.OK).body(gitRepoService.getAll(page));
    }

    @GetMapping("/logs")
    public ResponseEntity<List<GetGitRepoLogResponse>> getGitRepoLogs(@RequestParam(name = "gitRepoId") @PositiveOrZero() Integer gitRepoId) {
        return ResponseEntity.status(HttpStatus.OK).body(gitRepoService.getGitRepoLogs(gitRepoId));
    }

    @PostMapping("/create")
    public ResponseEntity<SuccessResponse> create(@Valid @RequestBody CreateGitRepoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(gitRepoService.create(request));
    }
}
