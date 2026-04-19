package com.unicord.stoneoven.model.dto;

import com.unicord.stoneoven.model.entity.Customer;
import lombok.Data;

import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public class CustomerDTO {

    @Data
    public static class CreateRequest {
        @NotBlank
        private String deviceId;

        @NotBlank
        @Size(min = 2, max = 255)
        private String fullName;

        @NotBlank
        @Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid Indian phone number")
        private String phone;

        @Email
        private String email;

        @NotNull
        private LocalDate birthDate;

        private LocalDate anniversaryDate;

        @NotNull
        private Customer.Gender gender;

        @NotNull
        private Customer.MaritalStatus maritalStatus;

        @NotNull
        private UUID firstVisitOutletId;
    }

    @Data
    public static class Response {
        private UUID id;
        private String deviceId;
        private String fullName;
        private String phone;
        private String email;
        private LocalDate birthDate;
        private LocalDate anniversaryDate;
        private Customer.Gender gender;
        private Customer.MaritalStatus maritalStatus;
        private UUID firstVisitOutletId;
        private String firstVisitOutletName;
        private LocalDateTime lastVisitDate;
        private Integer totalVisits;
        private Boolean hasSubmittedFirstReview;
        private LocalDateTime createdAt;
    }

    @Data
    public static class Summary {
        private UUID id;
        private String fullName;
        private String phone;
        private String email;
        private LocalDateTime lastVisitDate;
        private Integer totalVisits;
        private String outletName;
        private LocalDateTime createdAt;
    }
}
