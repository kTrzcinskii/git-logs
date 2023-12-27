package dev.ktrzcinski.gitlogsserver.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotNull(message = "Username is required")
    @Size(min = 2, max = 30, message = "The length of the username must be between 2 and 30")
    private String username;

    @NotNull(message = "Password is required")
    @Size(min = 2, max = 30, message = "The length of the password must be between 2 and 30")
    private String password;
}
