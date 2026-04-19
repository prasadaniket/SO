package com.unicord.stoneoven.controller;

import com.unicord.stoneoven.model.entity.MenuItem;
import com.unicord.stoneoven.service.MenuService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    // All outlets share same menu
    @GetMapping
    public ResponseEntity<List<MenuItem>> getMenu() {
        return ResponseEntity.ok(menuService.getAllAvailableItems());
    }

    // Outlet-specific endpoint (same menu for all outlets currently)
    @GetMapping("/outlet/{code}")
    public ResponseEntity<List<MenuItem>> getMenuByOutlet(@PathVariable String code) {
        return ResponseEntity.ok(menuService.getAllAvailableItems());
    }
}
