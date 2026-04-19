package com.unicord.stoneoven.service;

import com.unicord.stoneoven.model.dto.DashboardStatsDTO;
import com.unicord.stoneoven.model.entity.FranchiseOwner;
import com.unicord.stoneoven.model.entity.Outlet;
import com.unicord.stoneoven.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class DashboardService {

    private final CustomerRepository customerRepository;
    private final ReviewRepository reviewRepository;
    private final CustomerVisitRepository visitRepository;
    private final OutletRepository outletRepository;

    public DashboardService(CustomerRepository customerRepository,
                            ReviewRepository reviewRepository,
                            CustomerVisitRepository visitRepository,
                            OutletRepository outletRepository) {
        this.customerRepository = customerRepository;
        this.reviewRepository = reviewRepository;
        this.visitRepository = visitRepository;
        this.outletRepository = outletRepository;
    }

    public DashboardStatsDTO getStats(FranchiseOwner currentUser) {
        DashboardStatsDTO stats = new DashboardStatsDTO();
        LocalDateTime weekAgo = LocalDateTime.now().minusWeeks(1);
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        LocalDate today = LocalDate.now();

        boolean isMainOwner = currentUser.getRole() == FranchiseOwner.Role.main_owner;
        UUID outletId = isMainOwner ? null
                : (currentUser.getAssignedOutlet() != null ? currentUser.getAssignedOutlet().getId() : null);

        if (isMainOwner) {
            stats.setTotalCustomers(customerRepository.count());
            stats.setTotalReviews(reviewRepository.count());
            stats.setTotalVisits(visitRepository.count());
            stats.setInactiveCustomers((long) customerRepository.findInactiveCustomers(thirtyDaysAgo).size());
            stats.setNewCustomersThisWeek(customerRepository.countNewCustomersSince(weekAgo));
            stats.setNewReviewsThisWeek(reviewRepository.countNewReviewsSince(weekAgo));

            // Per-outlet breakdown
            List<Outlet> outlets = outletRepository.findByIsActiveTrue();
            List<DashboardStatsDTO.OutletStat> outletStats = new ArrayList<>();
            for (Outlet outlet : outlets) {
                DashboardStatsDTO.OutletStat os = new DashboardStatsDTO.OutletStat();
                os.setOutletCode(outlet.getCode());
                os.setOutletName(outlet.getName());
                os.setCustomers(customerRepository.countByOutletId(outlet.getId()));
                os.setReviews(reviewRepository.countByOutletId(outlet.getId()));
                os.setVisits(visitRepository.countByOutletId(outlet.getId()));
                os.setAvgRating(reviewRepository.getAverageRatingByOutlet(outlet.getId()));
                outletStats.add(os);
            }
            stats.setOutletStats(outletStats);
        } else {
            stats.setTotalCustomers(customerRepository.countByOutletId(outletId));
            stats.setTotalReviews(reviewRepository.countByOutletId(outletId));
            stats.setTotalVisits(visitRepository.countByOutletId(outletId));
            stats.setInactiveCustomers((long) customerRepository.findInactiveCustomers(thirtyDaysAgo).size());
            stats.setNewCustomersThisWeek(customerRepository.countNewCustomersByOutletSince(outletId, weekAgo));
            stats.setNewReviewsThisWeek(reviewRepository.countNewReviewsByOutletSince(outletId, weekAgo));
        }

        // Birthday/anniversary counts (global approximation — can be scoped per outlet if needed)
        long bdays = customerRepository.findByBirthDate(today.getMonthValue(), today.getDayOfMonth()).size();
        stats.setBirthdaysThisMonth(bdays);

        return stats;
    }
}
