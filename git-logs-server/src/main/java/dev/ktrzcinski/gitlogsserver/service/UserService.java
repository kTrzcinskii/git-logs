package dev.ktrzcinski.gitlogsserver.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final JwtService jwtService;

    public String getCurrentUserUsername() {
        return jwtService.extractUsername(jwtService.getTokenFromHeaders());
    }
}
