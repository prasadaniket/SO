package com.unicord.stoneoven.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class WhatsAppService {

    private static final Logger log = LoggerFactory.getLogger(WhatsAppService.class);

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.whatsapp.from}")
    private String fromNumber;

    @PostConstruct
    public void init() {
        Twilio.init(accountSid, authToken);
    }

    public boolean sendMessage(String toPhone, String messageBody) {
        try {
            Message message = Message.creator(
                    new PhoneNumber("whatsapp:+91" + toPhone),
                    new PhoneNumber(fromNumber),
                    messageBody
            ).create();

            log.info("WhatsApp sent to {} | SID: {}", toPhone, message.getSid());
            return true;
        } catch (Exception e) {
            log.error("WhatsApp failed to {}: {}", toPhone, e.getMessage());
            return false;
        }
    }

    public String buildBirthdayMessage(String customerName, String stage) {
        if ("five_days_before".equals(stage)) {
            return String.format(
                "🎂 Hey %s! Your birthday is just 5 days away! 🎉 " +
                "Come celebrate with us at StoneOven and enjoy a special treat. " +
                "We'd love to be part of your special day! 🍕❤️",
                customerName
            );
        }
        return String.format(
            "🎂 Happy Birthday %s! 🎉🎊 " +
            "Wishing you a wonderful day filled with joy! " +
            "Visit us at StoneOven today for a special birthday surprise! 🍕🎁",
            customerName
        );
    }

    public String buildAnniversaryMessage(String customerName, String stage) {
        if ("five_days_before".equals(stage)) {
            return String.format(
                "💑 Hey %s! Your anniversary is in 5 days! 🌹 " +
                "Plan a romantic dinner at StoneOven and make it unforgettable! " +
                "Special table booking available. 🍕❤️",
                customerName
            );
        }
        return String.format(
            "💑 Happy Anniversary %s! 🌹🎊 " +
            "Wishing you both a lifetime of love and happiness! " +
            "Celebrate with us at StoneOven today! 🍕❤️",
            customerName
        );
    }

    public String buildReengagementMessage(String customerName) {
        return String.format(
            "👋 Hey %s! We miss you at StoneOven! 😊 " +
            "It's been a while since your last visit. " +
            "Come back and enjoy your favourite dishes! " +
            "We have exciting new items on the menu just for you! 🍕✨",
            customerName
        );
    }
}
