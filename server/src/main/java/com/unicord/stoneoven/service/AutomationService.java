package com.unicord.stoneoven.service;

import com.unicord.stoneoven.model.entity.AutomationLog;
import com.unicord.stoneoven.model.entity.Customer;
import com.unicord.stoneoven.repository.AutomationLogRepository;
import com.unicord.stoneoven.repository.CustomerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AutomationService {

    private static final Logger log = LoggerFactory.getLogger(AutomationService.class);

    private final CustomerRepository customerRepository;
    private final AutomationLogRepository automationLogRepository;
    private final WhatsAppService whatsAppService;
    private final EmailService emailService;

    public AutomationService(CustomerRepository customerRepository,
                             AutomationLogRepository automationLogRepository,
                             WhatsAppService whatsAppService,
                             EmailService emailService) {
        this.customerRepository = customerRepository;
        this.automationLogRepository = automationLogRepository;
        this.whatsAppService = whatsAppService;
        this.emailService = emailService;
    }

    public void sendBirthdayMessages(LocalDate targetDate, String stage) {
        List<Customer> customers = customerRepository.findByBirthDate(
                targetDate.getMonthValue(), targetDate.getDayOfMonth());

        AutomationLog.MessageStage msgStage = "5_days_before".equals(stage)
                ? AutomationLog.MessageStage.five_days_before
                : AutomationLog.MessageStage.one_day_before;

        for (Customer customer : customers) {
            if (alreadySent(customer, AutomationLog.AutomationType.birthday_whatsapp, msgStage)) continue;

            String msg = whatsAppService.buildBirthdayMessage(customer.getFullName(), msgStage.name());
            boolean waSent = whatsAppService.sendMessage(customer.getPhone(), msg);
            saveLog(customer, AutomationLog.AutomationType.birthday_whatsapp, msgStage,
                    waSent ? AutomationLog.Status.success : AutomationLog.Status.failed, null);

            if (customer.getEmail() != null && !alreadySent(customer, AutomationLog.AutomationType.birthday_email, msgStage)) {
                boolean emailSent = emailService.sendBirthdayEmail(customer.getEmail(), customer.getFullName(), msgStage.name());
                saveLog(customer, AutomationLog.AutomationType.birthday_email, msgStage,
                        emailSent ? AutomationLog.Status.success : AutomationLog.Status.failed, null);
            }
        }
        log.info("Birthday automation done for {} ({} customers)", stage, customers.size());
    }

    public void sendAnniversaryMessages(LocalDate targetDate, String stage) {
        List<Customer> customers = customerRepository.findByAnniversaryDate(
                targetDate.getMonthValue(), targetDate.getDayOfMonth());

        AutomationLog.MessageStage msgStage = "5_days_before".equals(stage)
                ? AutomationLog.MessageStage.five_days_before
                : AutomationLog.MessageStage.one_day_before;

        for (Customer customer : customers) {
            if (alreadySent(customer, AutomationLog.AutomationType.anniversary_whatsapp, msgStage)) continue;

            String msg = whatsAppService.buildAnniversaryMessage(customer.getFullName(), msgStage.name());
            boolean waSent = whatsAppService.sendMessage(customer.getPhone(), msg);
            saveLog(customer, AutomationLog.AutomationType.anniversary_whatsapp, msgStage,
                    waSent ? AutomationLog.Status.success : AutomationLog.Status.failed, null);

            if (customer.getEmail() != null && !alreadySent(customer, AutomationLog.AutomationType.anniversary_email, msgStage)) {
                boolean emailSent = emailService.sendAnniversaryEmail(customer.getEmail(), customer.getFullName(), msgStage.name());
                saveLog(customer, AutomationLog.AutomationType.anniversary_email, msgStage,
                        emailSent ? AutomationLog.Status.success : AutomationLog.Status.failed, null);
            }
        }
        log.info("Anniversary automation done for {} ({} customers)", stage, customers.size());
    }

    public void sendReengagementMessages() {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(30);
        List<Customer> inactiveCustomers = customerRepository.findInactiveCustomers(cutoff);

        for (Customer customer : inactiveCustomers) {
            if (alreadySent(customer, AutomationLog.AutomationType.reengagement_whatsapp,
                    AutomationLog.MessageStage.thirty_days_inactive)) continue;

            String msg = whatsAppService.buildReengagementMessage(customer.getFullName());
            boolean waSent = whatsAppService.sendMessage(customer.getPhone(), msg);
            saveLog(customer, AutomationLog.AutomationType.reengagement_whatsapp,
                    AutomationLog.MessageStage.thirty_days_inactive,
                    waSent ? AutomationLog.Status.success : AutomationLog.Status.failed, null);

            if (customer.getEmail() != null && !alreadySent(customer, AutomationLog.AutomationType.reengagement_email,
                    AutomationLog.MessageStage.thirty_days_inactive)) {
                boolean emailSent = emailService.sendReengagementEmail(customer.getEmail(), customer.getFullName());
                saveLog(customer, AutomationLog.AutomationType.reengagement_email,
                        AutomationLog.MessageStage.thirty_days_inactive,
                        emailSent ? AutomationLog.Status.success : AutomationLog.Status.failed, null);
            }
        }
        log.info("Re-engagement automation done ({} inactive customers)", inactiveCustomers.size());
    }

    private boolean alreadySent(Customer customer, AutomationLog.AutomationType type, AutomationLog.MessageStage stage) {
        // Check if sent in the last 24 hours to prevent duplicates
        return automationLogRepository.existsByCustomerAndTypeAndStageSince(
                customer.getId(), type, stage, LocalDateTime.now().minusHours(24));
    }

    private void saveLog(Customer customer, AutomationLog.AutomationType type,
                         AutomationLog.MessageStage stage, AutomationLog.Status status, String error) {
        AutomationLog logEntry = new AutomationLog();
        logEntry.setCustomer(customer);
        logEntry.setAutomationType(type);
        logEntry.setMessageStage(stage);
        logEntry.setStatus(status);
        logEntry.setErrorMessage(error);
        automationLogRepository.save(logEntry);
    }
}
