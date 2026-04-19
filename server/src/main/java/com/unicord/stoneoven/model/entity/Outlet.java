package com.unicord.stoneoven.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "outlets")
@Data
public class Outlet {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false, length = 10)
    private String code;

    @Column(nullable = false)
    private String name;

    @Column
    private String location;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(unique = true, nullable = false)
    private String googlePlaceId;

    @Column(columnDefinition = "TEXT")
    private String googleMapsUrl;

    @Column
    private String instagramUrl;

    @Column
    private String facebookUrl;

    @Column(nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
