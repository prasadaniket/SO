package com.unicord.stoneoven.service;

import com.unicord.stoneoven.model.entity.MenuCategory;
import com.unicord.stoneoven.model.entity.MenuItem;
import com.unicord.stoneoven.repository.MenuCategoryRepository;
import com.unicord.stoneoven.repository.MenuItemRepository;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class MenuService {

    private final MenuCategoryRepository categoryRepository;
    private final MenuItemRepository menuItemRepository;

    public MenuService(MenuCategoryRepository categoryRepository, MenuItemRepository menuItemRepository) {
        this.categoryRepository = categoryRepository;
        this.menuItemRepository = menuItemRepository;
    }

    // All outlets share the same menu
    public Map<MenuCategory, List<MenuItem>> getFullMenu() {
        List<MenuCategory> categories = categoryRepository.findByIsActiveTrueOrderByDisplayOrderAsc();
        Map<MenuCategory, List<MenuItem>> menu = new LinkedHashMap<>();
        for (MenuCategory category : categories) {
            List<MenuItem> items = menuItemRepository
                    .findByCategoryIdAndIsAvailableTrueOrderByDisplayOrderAsc(category.getId());
            menu.put(category, items);
        }
        return menu;
    }

    public List<MenuItem> getAllAvailableItems() {
        return menuItemRepository.findByIsAvailableTrueOrderByCategoryIdAscDisplayOrderAsc();
    }
}
