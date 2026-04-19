package com.unicord.stoneoven.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "automation_logs", indexes = {
    @Index(name = "idx_automation_logs_customer", columnList = "customer_id,sentAt"),
    @Index(name = "idx_automation_logs_type", columnList = "automationType,status")
})
@Data
public class AutomationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AutomationType automationType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MessageStage messageStage;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime sentAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(columnDefinition = "TEXT")
    private String errorMessage;

    public enum AutomationType {
        birthday_whatsapp,
        birthday_email,
        anniversary_whatsapp,
        anniversary_email,
        reengagement_whatsapp,
        reengagement_email
    }

    public enum MessageStage {
        five_days_before,
        one_day_before,
        thirty_days_inactive
    }

    public enum Status {
        success, failed
    }
}
