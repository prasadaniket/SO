package com.unicord.stoneoven.controller;

import com.unicord.stoneoven.model.dto.ReviewDTO;
import com.unicord.stoneoven.model.entity.FranchiseOwner;
import com.unicord.stoneoven.model.entity.Review;
import com.unicord.stoneoven.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/reviews")
    public ResponseEntity<Review> submitReview(@Valid @RequestBody ReviewDTO.CreateRequest request) {
        return ResponseEntity.ok(reviewService.submitReview(request));
    }

    @GetMapping("/cms/reviews")
    public ResponseEntity<Page<Review>> getReviews(
            @AuthenticationPrincipal FranchiseOwner currentUser,
            @RequestParam(required = false) UUID outletId,
            Pageable pageable) {

        UUID effectiveOutletId = outletId;
        if (currentUser.getRole() == FranchiseOwner.Role.franchise_owner) {
            effectiveOutletId = currentUser.getAssignedOutlet() != null
                    ? currentUser.getAssignedOutlet().getId() : null;
        }
        return ResponseEntity.ok(reviewService.getReviews(effectiveOutletId, pageable));
    }
}
