package com.unicord.stoneoven.controller;

import com.unicord.stoneoven.model.entity.Outlet;
import com.unicord.stoneoven.service.OutletService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/outlets")
public class OutletController {

    private final OutletService outletService;

    public OutletController(OutletService outletService) {
        this.outletService = outletService;
    }

    @GetMapping
    public ResponseEntity<List<Outlet>> getAllOutlets() {
        return ResponseEntity.ok(outletService.getAllActiveOutlets());
    }

    @GetMapping("/{code}")
    public ResponseEntity<Outlet> getOutletByCode(@PathVariable String code) {
        return ResponseEntity.ok(outletService.getOutletByCode(code));
    }
}
