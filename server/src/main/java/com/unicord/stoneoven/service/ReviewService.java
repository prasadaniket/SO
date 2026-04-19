package com.unicord.stoneoven.service;

import com.unicord.stoneoven.model.dto.ReviewDTO;
import com.unicord.stoneoven.model.entity.Customer;
import com.unicord.stoneoven.model.entity.Outlet;
import com.unicord.stoneoven.model.entity.Review;
import com.unicord.stoneoven.repository.CustomerRepository;
import com.unicord.stoneoven.repository.OutletRepository;
import com.unicord.stoneoven.repository.ReviewRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final CustomerRepository customerRepository;
    private final OutletRepository outletRepository;

    public ReviewService(ReviewRepository reviewRepository,
                         CustomerRepository customerRepository,
                         OutletRepository outletRepository) {
        this.reviewRepository = reviewRepository;
        this.customerRepository = customerRepository;
        this.outletRepository = outletRepository;
    }

    @Transactional
    public Review submitReview(ReviewDTO.CreateRequest request) {
        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        Outlet outlet = outletRepository.findById(request.getOutletId())
                .orElseThrow(() -> new RuntimeException("Outlet not found"));

        Review review = new Review();
        review.setCustomer(customer);
        review.setOutlet(outlet);
        review.setReviewText(request.getReviewText());
        review.setStars(request.getStars());
        review.setReviewType(request.getReviewType());

        return reviewRepository.save(review);
    }

    public Page<Review> getReviews(UUID outletId, Pageable pageable) {
        if (outletId != null) {
            return reviewRepository.findByOutletIdOrderByCreatedAtDesc(outletId, pageable);
        }
        return reviewRepository.findByIsVisibleTrueOrderByCreatedAtDesc(pageable);
    }
}
