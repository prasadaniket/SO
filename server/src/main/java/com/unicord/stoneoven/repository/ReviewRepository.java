package com.unicord.stoneoven.repository;

import com.unicord.stoneoven.model.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Review, UUID> {

    Page<Review> findByOutletIdOrderByCreatedAtDesc(UUID outletId, Pageable pageable);

    List<Review> findByCustomerIdOrderByCreatedAtDesc(UUID customerId);

    @Query("SELECT AVG(r.stars) FROM Review r WHERE r.outlet.id = :outletId AND r.isVisible = true")
    Double getAverageRatingByOutlet(@Param("outletId") UUID outletId);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.outlet.id = :outletId")
    Long countByOutletId(@Param("outletId") UUID outletId);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.createdAt >= :since")
    Long countNewReviewsSince(@Param("since") LocalDateTime since);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.outlet.id = :outletId AND r.createdAt >= :since")
    Long countNewReviewsByOutletSince(@Param("outletId") UUID outletId, @Param("since") LocalDateTime since);

    Page<Review> findByIsVisibleTrueOrderByCreatedAtDesc(Pageable pageable);
}
