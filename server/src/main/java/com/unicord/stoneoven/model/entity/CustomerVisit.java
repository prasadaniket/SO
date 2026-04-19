package com.unicord.stoneoven.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "customer_visits", indexes = {
    @Index(name = "idx_customer_visits_customer", columnList = "customer_id,visitedAt"),
    @Index(name = "idx_customer_visits_device", columnList = "deviceId,visitedAt"),
    @Index(name = "idx_customer_visits_outlet", columnList = "outlet_id,visitedAt")
})
@Data
public class CustomerVisit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Column(nullable = false)
    private String deviceId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "outlet_id", nullable = false)
    private Outlet outlet;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VisitType visitType = VisitType.qr_scan;

    @Column(nullable = false)
    private LocalDateTime visitedAt = LocalDateTime.now();

    public enum VisitType {
        qr_scan, payment
    }
}
