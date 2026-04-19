package com.unicord.stoneoven.repository;

import com.unicord.stoneoven.model.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, UUID> {
    List<MenuItem> findByCategoryIdAndIsAvailableTrueOrderByDisplayOrderAsc(UUID categoryId);
    List<MenuItem> findByIsAvailableTrueOrderByCategoryIdAscDisplayOrderAsc();
    List<MenuItem> findByIsVegAndIsAvailableTrue(Boolean isVeg);
}
