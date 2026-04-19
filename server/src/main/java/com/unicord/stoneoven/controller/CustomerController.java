package com.unicord.stoneoven.controller;

import com.unicord.stoneoven.model.dto.CustomerDTO;
import com.unicord.stoneoven.model.entity.Customer;
import com.unicord.stoneoven.model.entity.FranchiseOwner;
import com.unicord.stoneoven.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/customers/by-device/{deviceId}")
    public ResponseEntity<Customer> getByDevice(@PathVariable String deviceId) {
        Customer customer = customerService.getCustomerByDeviceId(deviceId);
        if (customer == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(customer);
    }

    @PostMapping("/customers")
    public ResponseEntity<Customer> createCustomer(@Valid @RequestBody CustomerDTO.CreateRequest request) {
        return ResponseEntity.ok(customerService.createCustomer(request));
    }

    @GetMapping("/cms/customers")
    public ResponseEntity<Page<Customer>> getCustomers(
            @AuthenticationPrincipal FranchiseOwner currentUser,
            @RequestParam(required = false) UUID outletId,
            Pageable pageable) {

        UUID effectiveOutletId = outletId;
        if (currentUser.getRole() == FranchiseOwner.Role.franchise_owner) {
            effectiveOutletId = currentUser.getAssignedOutlet() != null
                    ? currentUser.getAssignedOutlet().getId() : null;
        }
        return ResponseEntity.ok(customerService.getCustomers(effectiveOutletId, pageable));
    }
}
