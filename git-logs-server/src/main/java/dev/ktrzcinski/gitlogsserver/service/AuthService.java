package dev.ktrzcinski.gitlogsserver.service;

import dev.ktrzcinski.gitlogsserver.dto.AuthResponse;
import dev.ktrzcinski.gitlogsserver.dto.LoginRequest;
import dev.ktrzcinski.gitlogsserver.dto.RegisterRequest;
import dev.ktrzcinski.gitlogsserver.model.User;
import dev.ktrzcinski.gitlogsserver.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("User already taken"); // todo: should be custom exception here
        }
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(RuntimeException::new); // todo: should be custom exception here
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }
}
