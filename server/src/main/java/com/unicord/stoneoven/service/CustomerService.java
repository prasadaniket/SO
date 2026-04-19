package com.unicord.stoneoven.service;

import com.unicord.stoneoven.model.dto.CustomerDTO;
import com.unicord.stoneoven.model.entity.Customer;
import com.unicord.stoneoven.model.entity.Outlet;
import com.unicord.stoneoven.repository.CustomerRepository;
import com.unicord.stoneoven.repository.OutletRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final OutletRepository outletRepository;

    public CustomerService(CustomerRepository customerRepository, OutletRepository outletRepository) {
        this.customerRepository = customerRepository;
        this.outletRepository = outletRepository;
    }

    public Customer getCustomerByDeviceId(String deviceId) {
        return customerRepository.findByDeviceId(deviceId).orElse(null);
    }

    @Transactional
    public Customer createCustomer(CustomerDTO.CreateRequest request) {
        if (customerRepository.findByDeviceId(request.getDeviceId()).isPresent()) {
            throw new RuntimeException("Device already registered");
        }
        if (customerRepository.findByPhone(request.getPhone()).isPresent()) {
            throw new RuntimeException("Phone number already registered");
        }

        Outlet outlet = outletRepository.findById(request.getFirstVisitOutletId())
                .orElseThrow(() -> new RuntimeException("Outlet not found"));

        Customer customer = new Customer();
        customer.setDeviceId(request.getDeviceId());
        customer.setFullName(request.getFullName());
        customer.setPhone(request.getPhone());
        customer.setEmail(request.getEmail());
        customer.setBirthDate(request.getBirthDate());
        customer.setAnniversaryDate(request.getAnniversaryDate());
        customer.setGender(request.getGender());
        customer.setMaritalStatus(request.getMaritalStatus());
        customer.setFirstVisitOutlet(outlet);
        customer.setHasSubmittedFirstReview(true);
        customer.setLastVisitDate(LocalDateTime.now());
        customer.setTotalVisits(1);

        return customerRepository.save(customer);
    }

    @Transactional
    public void updateLastVisit(UUID customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        customer.setLastVisitDate(LocalDateTime.now());
        customer.setTotalVisits(customer.getTotalVisits() + 1);
        customerRepository.save(customer);
    }

    public Page<Customer> getCustomers(UUID outletId, Pageable pageable) {
        if (outletId != null) {
            return customerRepository.findByFirstVisitOutletId(outletId, pageable);
        }
        return customerRepository.findAll(pageable);
    }
}
