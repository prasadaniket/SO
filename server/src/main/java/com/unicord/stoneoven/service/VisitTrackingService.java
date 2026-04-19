package com.unicord.stoneoven.service;

import com.unicord.stoneoven.model.dto.VisitDTO;
import com.unicord.stoneoven.model.entity.Customer;
import com.unicord.stoneoven.model.entity.CustomerVisit;
import com.unicord.stoneoven.model.entity.Outlet;
import com.unicord.stoneoven.repository.CustomerRepository;
import com.unicord.stoneoven.repository.CustomerVisitRepository;
import com.unicord.stoneoven.repository.OutletRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VisitTrackingService {

    private final CustomerVisitRepository visitRepository;
    private final CustomerRepository customerRepository;
    private final OutletRepository outletRepository;

    public VisitTrackingService(CustomerVisitRepository visitRepository,
                                CustomerRepository customerRepository,
                                OutletRepository outletRepository) {
        this.visitRepository = visitRepository;
        this.customerRepository = customerRepository;
        this.outletRepository = outletRepository;
    }

    @Transactional
    public CustomerVisit recordVisit(VisitDTO.CreateRequest request) {
        Outlet outlet = outletRepository.findById(request.getOutletId())
                .orElseThrow(() -> new RuntimeException("Outlet not found"));

        CustomerVisit visit = new CustomerVisit();
        visit.setDeviceId(request.getDeviceId());
        visit.setOutlet(outlet);
        visit.setVisitType(request.getVisitType());

        // Link to customer if device ID is known
        Customer customer = customerRepository.findByDeviceId(request.getDeviceId()).orElse(null);

        // If payment QR with phone, try phone lookup
        if (customer == null && request.getPhone() != null) {
            customer = customerRepository.findByPhone(request.getPhone()).orElse(null);
        }

        if (customer != null) {
            visit.setCustomer(customer);
            customer.setLastVisitDate(java.time.LocalDateTime.now());
            customer.setTotalVisits(customer.getTotalVisits() + 1);
            customerRepository.save(customer);
        }

        return visitRepository.save(visit);
    }
}
