package com.unicord.stoneoven.controller;

import com.unicord.stoneoven.model.dto.VisitDTO;
import com.unicord.stoneoven.model.entity.CustomerVisit;
import com.unicord.stoneoven.service.VisitTrackingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/visits")
public class VisitController {

    private final VisitTrackingService visitTrackingService;

    public VisitController(VisitTrackingService visitTrackingService) {
        this.visitTrackingService = visitTrackingService;
    }

    @PostMapping
    public ResponseEntity<CustomerVisit> recordVisit(@Valid @RequestBody VisitDTO.CreateRequest request) {
        return ResponseEntity.ok(visitTrackingService.recordVisit(request));
    }
}
