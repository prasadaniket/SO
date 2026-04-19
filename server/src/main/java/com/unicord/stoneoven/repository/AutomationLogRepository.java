package com.unicord.stoneoven.repository;

import com.unicord.stoneoven.model.entity.AutomationLog;
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
public interface AutomationLogRepository extends JpaRepository<AutomationLog, UUID> {

    List<AutomationLog> findByCustomerIdOrderBySentAtDesc(UUID customerId);

    // Check if automation was already sent to prevent duplicates
    @Query("SELECT COUNT(a) > 0 FROM AutomationLog a WHERE a.customer.id = :customerId " +
           "AND a.automationType = :type AND a.messageStage = :stage AND a.sentAt >= :since")
    boolean existsByCustomerAndTypeAndStageSince(
        @Param("customerId") UUID customerId,
        @Param("type") AutomationLog.AutomationType type,
        @Param("stage") AutomationLog.MessageStage stage,
        @Param("since") LocalDateTime since
    );

    Page<AutomationLog> findAllByOrderBySentAtDesc(Pageable pageable);

    @Query("SELECT a FROM AutomationLog a WHERE a.automationType = :type ORDER BY a.sentAt DESC")
    Page<AutomationLog> findByAutomationType(@Param("type") AutomationLog.AutomationType type, Pageable pageable);
}
