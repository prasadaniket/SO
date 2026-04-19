package com.unicord.stoneoven.model.dto;

import com.unicord.stoneoven.model.entity.FranchiseOwner;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private UUID userId;
    private String fullName;
    private String email;
    private FranchiseOwner.Role role;
    private UUID assignedOutletId;
    private String assignedOutletName;
}
