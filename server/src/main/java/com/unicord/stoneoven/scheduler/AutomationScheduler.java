package com.unicord.stoneoven.scheduler;

import com.unicord.stoneoven.service.AutomationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class AutomationScheduler {

    private static final Logger log = LoggerFactory.getLogger(AutomationScheduler.class);

    private final AutomationService automationService;

    public AutomationScheduler(AutomationService automationService) {
        this.automationService = automationService;
    }

    @Scheduled(cron = "0 0 0 * * ?", zone = "Asia/Kolkata")
    public void runDailyAutomation() {
        log.info("Starting daily automation job...");
        try {
            LocalDate today = LocalDate.now();
            LocalDate in5Days = today.plusDays(5);
            LocalDate tomorrow = today.plusDays(1);

            automationService.sendBirthdayMessages(in5Days, "5_days_before");
            automationService.sendBirthdayMessages(tomorrow, "1_day_before");
            automationService.sendAnniversaryMessages(in5Days, "5_days_before");
            automationService.sendAnniversaryMessages(tomorrow, "1_day_before");
            automationService.sendReengagementMessages();

            log.info("Daily automation completed successfully");
        } catch (Exception e) {
            log.error("Daily automation failed: {}", e.getMessage(), e);
        }
    }
}
