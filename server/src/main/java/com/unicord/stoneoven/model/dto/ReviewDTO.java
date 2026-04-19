package com.unicord.stoneoven.model.dto;

import com.unicord.stoneoven.model.entity.Review;
import lombok.Data;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.UUID;

public class ReviewDTO {

    @Data
    public static class CreateRequest {
        @NotNull
        private UUID customerId;

        @NotNull
        private UUID outletId;

        private String reviewText;

        @NotNull
        @Min(1) @Max(5)
        private Integer stars;

        @NotNull
        private Review.ReviewType reviewType;
    }

    @Data
    public static class Response {
        private UUID id;
        private UUID customerId;
        private String customerName;
        private UUID outletId;
        private String outletName;
        private String reviewText;
        private Integer stars;
        private Review.ReviewType reviewType;
        private Boolean postedToGoogle;
        private Boolean isVisible;
        private LocalDateTime createdAt;
    }
}
