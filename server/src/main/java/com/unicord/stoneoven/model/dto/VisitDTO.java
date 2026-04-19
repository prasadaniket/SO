package com.unicord.stoneoven.model.dto;

import com.unicord.stoneoven.model.entity.CustomerVisit;
import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

public class VisitDTO {

    @Data
    public static class CreateRequest {
        @NotBlank
        private String deviceId;

        @NotNull
        private UUID outletId;

        private CustomerVisit.VisitType visitType = CustomerVisit.VisitType.qr_scan;

        // For payment QR tracking (UPI phone extraction)
        private String phone;
    }

    @Data
    public static class Response {
        private UUID id;
        private UUID customerId;
        private String customerName;
        private UUID outletId;
        private String outletName;
        private CustomerVisit.VisitType visitType;
        private LocalDateTime visitedAt;
    }
}
