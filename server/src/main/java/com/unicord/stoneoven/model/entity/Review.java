package com.unicord.stoneoven.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "reviews", indexes = {
    @Index(name = "idx_reviews_outlet", columnList = "outlet_id,createdAt"),
    @Index(name = "idx_reviews_customer", columnList = "customer_id")
})
@Data
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "outlet_id", nullable = false)
    private Outlet outlet;

    @Column(columnDefinition = "TEXT")
    private String reviewText;

    @Column(nullable = false)
    private Integer stars;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReviewType reviewType;

    @Column(nullable = false)
    private Boolean postedToGoogle = false;

    @Column(nullable = false)
    private Boolean isVisible = true;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public enum ReviewType {
        first_visit, repeat
    }
}
