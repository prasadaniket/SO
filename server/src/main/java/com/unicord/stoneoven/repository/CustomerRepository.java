package com.unicord.stoneoven.repository;

import com.unicord.stoneoven.model.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, UUID> {

    Optional<Customer> findByDeviceId(String deviceId);

    Optional<Customer> findByPhone(String phone);

    @Query("SELECT c FROM Customer c WHERE c.lastVisitDate < :cutoffDate OR c.lastVisitDate IS NULL")
    List<Customer> findInactiveCustomers(@Param("cutoffDate") LocalDateTime cutoffDate);

    @Query("SELECT c FROM Customer c WHERE FUNCTION('MONTH', c.birthDate) = :month AND FUNCTION('DAY', c.birthDate) = :day")
    List<Customer> findByBirthDate(@Param("month") int month, @Param("day") int day);

    @Query("SELECT c FROM Customer c WHERE c.maritalStatus = 'Married' AND FUNCTION('MONTH', c.anniversaryDate) = :month AND FUNCTION('DAY', c.anniversaryDate) = :day")
    List<Customer> findByAnniversaryDate(@Param("month") int month, @Param("day") int day);

    @Query("SELECT COUNT(c) FROM Customer c WHERE c.firstVisitOutlet.id = :outletId")
    Long countByOutletId(@Param("outletId") UUID outletId);

    Page<Customer> findByFirstVisitOutletId(UUID outletId, Pageable pageable);

    @Query("SELECT COUNT(c) FROM Customer c WHERE c.createdAt >= :since")
    Long countNewCustomersSince(@Param("since") LocalDateTime since);

    @Query("SELECT COUNT(c) FROM Customer c WHERE c.firstVisitOutlet.id = :outletId AND c.createdAt >= :since")
    Long countNewCustomersByOutletSince(@Param("outletId") UUID outletId, @Param("since") LocalDateTime since);
}
