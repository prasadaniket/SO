package com.unicord.stoneoven.controller;

import com.unicord.stoneoven.model.dto.LoginRequest;
import com.unicord.stoneoven.model.dto.LoginResponse;
import com.unicord.stoneoven.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        // JWT is stateless — client discards the token
        return ResponseEntity.noContent().build();
    }
}
