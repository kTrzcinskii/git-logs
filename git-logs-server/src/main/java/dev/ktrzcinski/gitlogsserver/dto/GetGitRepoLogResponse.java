package dev.ktrzcinski.gitlogsserver.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetGitRepoLogResponse {
    private String commitId;
    private String authorName;
    private String authorEmail;
    private LocalDateTime createdAt;
    private String content;
}
