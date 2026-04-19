package com.unicord.stoneoven.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "customers", indexes = {
    @Index(name = "idx_customers_device_id", columnList = "deviceId", unique = true),
    @Index(name = "idx_customers_phone", columnList = "phone", unique = true),
    @Index(name = "idx_customers_last_visit", columnList = "lastVisitDate")
})
@Data
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String deviceId;

    @Column(nullable = false)
    private String fullName;

    @Column(unique = true, nullable = false, length = 15)
    private String phone;

    @Column
    private String email;

    @Column(nullable = false)
    private LocalDate birthDate;

    @Column
    private LocalDate anniversaryDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MaritalStatus maritalStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "first_visit_outlet_id")
    private Outlet firstVisitOutlet;

    @Column
    private LocalDateTime lastVisitDate;

    @Column(nullable = false)
    private Integer totalVisits = 1;

    @Column(nullable = false)
    private Boolean hasSubmittedFirstReview = false;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public enum Gender {
        Male, Female, Transgender, RatherNotSay
    }

    public enum MaritalStatus {
        Married, Unmarried
    }
}
