package com.unicord.stoneoven.repository;

import com.unicord.stoneoven.model.entity.CustomerVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CustomerVisitRepository extends JpaRepository<CustomerVisit, UUID> {

    List<CustomerVisit> findByCustomerIdOrderByVisitedAtDesc(UUID customerId);

    @Query("SELECT v FROM CustomerVisit v WHERE v.deviceId = :deviceId ORDER BY v.visitedAt DESC")
    List<CustomerVisit> findByDeviceIdOrderByVisitedAtDesc(@Param("deviceId") String deviceId);

    @Query("SELECT COUNT(v) FROM CustomerVisit v WHERE v.outlet.id = :outletId")
    Long countByOutletId(@Param("outletId") UUID outletId);

    @Query("SELECT v FROM CustomerVisit v WHERE v.outlet.id = :outletId ORDER BY v.visitedAt DESC")
    List<CustomerVisit> findByOutletIdOrderByVisitedAtDesc(@Param("outletId") UUID outletId);

    Optional<CustomerVisit> findTopByDeviceIdOrderByVisitedAtDesc(String deviceId);
}
