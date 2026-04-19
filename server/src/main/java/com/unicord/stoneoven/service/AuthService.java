package com.unicord.stoneoven.service;

import com.unicord.stoneoven.model.dto.LoginRequest;
import com.unicord.stoneoven.model.dto.LoginResponse;
import com.unicord.stoneoven.model.entity.FranchiseOwner;
import com.unicord.stoneoven.repository.FranchiseOwnerRepository;
import com.unicord.stoneoven.security.JwtTokenProvider;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final FranchiseOwnerRepository franchiseOwnerRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(FranchiseOwnerRepository franchiseOwnerRepository,
                       BCryptPasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider) {
        this.franchiseOwnerRepository = franchiseOwnerRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public LoginResponse login(LoginRequest request) {
        FranchiseOwner owner = franchiseOwnerRepository
                .findByEmailAndIsActiveTrue(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), owner.getPasswordHash())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtTokenProvider.generateToken(owner.getEmail(), owner.getRole().name());

        String assignedOutletName = owner.getAssignedOutlet() != null
                ? owner.getAssignedOutlet().getName() : null;
        java.util.UUID assignedOutletId = owner.getAssignedOutlet() != null
                ? owner.getAssignedOutlet().getId() : null;

        return new LoginResponse(
                token,
                owner.getId(),
                owner.getFullName(),
                owner.getEmail(),
                owner.getRole(),
                assignedOutletId,
                assignedOutletName
        );
    }
}
