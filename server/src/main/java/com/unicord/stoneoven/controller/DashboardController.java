package com.unicord.stoneoven.controller;

import com.unicord.stoneoven.model.dto.DashboardStatsDTO;
import com.unicord.stoneoven.model.entity.AutomationLog;
import com.unicord.stoneoven.model.entity.FranchiseOwner;
import com.unicord.stoneoven.repository.AutomationLogRepository;
import com.unicord.stoneoven.service.AutomationService;
import com.unicord.stoneoven.service.DashboardService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cms")
public class DashboardController {

    private final DashboardService dashboardService;
    private final AutomationService automationService;
    private final AutomationLogRepository automationLogRepository;

    public DashboardController(DashboardService dashboardService,
                               AutomationService automationService,
                               AutomationLogRepository automationLogRepository) {
        this.dashboardService = dashboardService;
        this.automationService = automationService;
        this.automationLogRepository = automationLogRepository;
    }

    @GetMapping("/dashboard/stats")
    public ResponseEntity<DashboardStatsDTO> getStats(@AuthenticationPrincipal FranchiseOwner currentUser) {
        return ResponseEntity.ok(dashboardService.getStats(currentUser));
    }

    @GetMapping("/automation-logs")
    public ResponseEntity<Page<AutomationLog>> getAutomationLogs(Pageable pageable) {
        return ResponseEntity.ok(automationLogRepository.findAllByOrderBySentAtDesc(pageable));
    }

    // Only main_owner can trigger re-engagement
    @PostMapping("/reengagement/trigger")
    @PreAuthorize("hasRole('MAIN_OWNER')")
    public ResponseEntity<String> triggerReengagement() {
        automationService.sendReengagementMessages();
        return ResponseEntity.ok("Re-engagement campaign triggered successfully");
    }
}
