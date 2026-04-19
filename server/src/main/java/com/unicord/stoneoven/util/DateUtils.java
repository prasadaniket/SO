package com.unicord.stoneoven.util;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Period;

@Component
public class DateUtils {

    public int daysUntilNextOccurrence(LocalDate targetDate) {
        LocalDate today = LocalDate.now();
        LocalDate nextOccurrence = targetDate.withYear(today.getYear());
        if (nextOccurrence.isBefore(today)) {
            nextOccurrence = nextOccurrence.plusYears(1);
        }
        return Period.between(today, nextOccurrence).getDays();
    }

    public boolean isToday(LocalDate date) {
        LocalDate today = LocalDate.now();
        return date.getMonthValue() == today.getMonthValue()
                && date.getDayOfMonth() == today.getDayOfMonth();
    }
}
