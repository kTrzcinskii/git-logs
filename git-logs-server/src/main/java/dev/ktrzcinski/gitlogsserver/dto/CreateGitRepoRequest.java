package dev.ktrzcinski.gitlogsserver.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateGitRepoRequest {

    @NotNull(message = "Name is required")
    @Size(min = 2, max = 30, message = "The length of the name must be between 2 and 30")
    private String name;

    @NotNull(message = "Url is required")
    @Size(min = 10, max = 200, message = "The length of the url must be between 10 and 200")
    private String url;

}
