package com.unicord.stoneoven.repository;

import com.unicord.stoneoven.model.entity.FranchiseOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FranchiseOwnerRepository extends JpaRepository<FranchiseOwner, UUID> {
    Optional<FranchiseOwner> findByEmail(String email);
    List<FranchiseOwner> findByIsActiveTrue();
    Optional<FranchiseOwner> findByEmailAndIsActiveTrue(String email);
}
