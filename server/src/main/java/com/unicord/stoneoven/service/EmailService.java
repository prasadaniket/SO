package com.unicord.stoneoven.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    public EmailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    public boolean sendEmail(String to, String subject, String templateName, Context context) {
        if (to == null || to.isBlank()) {
            return false;
        }
        try {
            String htmlContent = templateEngine.process(templateName, context);
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            helper.setFrom("noreply@stoneoven.in");
            mailSender.send(message);
            log.info("Email sent to {} | subject: {}", to, subject);
            return true;
        } catch (Exception e) {
            log.error("Email failed to {}: {}", to, e.getMessage());
            return false;
        }
    }

    public boolean sendBirthdayEmail(String to, String customerName, String stage) {
        Context ctx = new Context();
        ctx.setVariable("customerName", customerName);
        ctx.setVariable("stage", stage);
        String template = "five_days_before".equals(stage) ? "email-birthday-5days" : "email-birthday-1day";
        String subject = "five_days_before".equals(stage)
                ? "🎂 Your Birthday is Almost Here!"
                : "🎂 Happy Birthday from StoneOven!";
        return sendEmail(to, subject, template, ctx);
    }

    public boolean sendAnniversaryEmail(String to, String customerName, String stage) {
        Context ctx = new Context();
        ctx.setVariable("customerName", customerName);
        ctx.setVariable("stage", stage);
        String template = "five_days_before".equals(stage) ? "email-anniversary-5days" : "email-anniversary-1day";
        String subject = "five_days_before".equals(stage)
                ? "💑 Your Anniversary is Around the Corner!"
                : "💑 Happy Anniversary from StoneOven!";
        return sendEmail(to, subject, template, ctx);
    }

    public boolean sendReengagementEmail(String to, String customerName) {
        Context ctx = new Context();
        ctx.setVariable("customerName", customerName);
        return sendEmail(to, "👋 We Miss You at StoneOven!", "email-reengagement", ctx);
    }
}
