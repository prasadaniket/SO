package com.unicord.stoneoven.model.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class DashboardStatsDTO {
    private Long totalCustomers;
    private Long totalReviews;
    private Long totalVisits;
    private Long inactiveCustomers;
    private Double averageRating;
    private Long birthdaysThisMonth;
    private Long anniversariesThisMonth;

    // Per outlet breakdown (for main owner)
    private List<OutletStat> outletStats;

    // Recent activity
    private Long newCustomersThisWeek;
    private Long newReviewsThisWeek;

    @Data
    public static class OutletStat {
        private String outletCode;
        private String outletName;
        private Long customers;
        private Long reviews;
        private Long visits;
        private Double avgRating;
        private Long inactiveCustomers;
    }
}
