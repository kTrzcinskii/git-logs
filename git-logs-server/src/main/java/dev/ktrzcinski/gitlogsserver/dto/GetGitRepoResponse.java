package dev.ktrzcinski.gitlogsserver.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetGitRepoResponse {
    private Integer id;
    private String name;
    private String repositoryUrl;
}
