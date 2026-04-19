package com.unicord.stoneoven.util;

import org.springframework.stereotype.Component;

@Component
public class DeviceFingerprintValidator {

    private static final int MIN_LENGTH = 10;
    private static final int MAX_LENGTH = 64;

    public boolean isValid(String deviceId) {
        if (deviceId == null || deviceId.isBlank()) return false;
        if (deviceId.length() < MIN_LENGTH || deviceId.length() > MAX_LENGTH) return false;
        // Allow alphanumeric, hyphens, underscores (covers FingerprintJS format + fallback IDs)
        return deviceId.matches("^[a-zA-Z0-9\\-_]+$");
    }
}
