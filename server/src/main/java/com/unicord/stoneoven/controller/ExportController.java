package com.unicord.stoneoven.controller;

import com.unicord.stoneoven.model.entity.Customer;
import com.unicord.stoneoven.model.entity.FranchiseOwner;
import com.unicord.stoneoven.repository.CustomerRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.StringWriter;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/cms/export")
public class ExportController {

    private final CustomerRepository customerRepository;
    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("dd-MM-yyyy");

    public ExportController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @GetMapping("/customers")
    public ResponseEntity<String> exportCustomers(
            @AuthenticationPrincipal FranchiseOwner currentUser,
            @RequestParam(required = false) UUID outletId) throws Exception {

        UUID effectiveOutletId = outletId;
        if (currentUser.getRole() == FranchiseOwner.Role.franchise_owner) {
            effectiveOutletId = currentUser.getAssignedOutlet() != null
                    ? currentUser.getAssignedOutlet().getId() : null;
        }

        List<Customer> customers = effectiveOutletId != null
                ? customerRepository.findByFirstVisitOutletId(effectiveOutletId, PageRequest.of(0, 10000)).getContent()
                : customerRepository.findAll();

        StringWriter sw = new StringWriter();
        try (CSVPrinter printer = new CSVPrinter(sw, CSVFormat.DEFAULT.withHeader(
                "Name", "Phone", "Email", "Birth Date", "Anniversary Date",
                "Gender", "Marital Status", "Total Visits", "Last Visit", "Joined"))) {
            for (Customer c : customers) {
                printer.printRecord(
                        c.getFullName(),
                        c.getPhone(),
                        c.getEmail() != null ? c.getEmail() : "",
                        c.getBirthDate() != null ? c.getBirthDate().format(DATE_FMT) : "",
                        c.getAnniversaryDate() != null ? c.getAnniversaryDate().format(DATE_FMT) : "",
                        c.getGender().name(),
                        c.getMaritalStatus().name(),
                        c.getTotalVisits(),
                        c.getLastVisitDate() != null ? c.getLastVisitDate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm")) : "",
                        c.getCreatedAt().format(DATE_FMT)
                );
            }
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=customers.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(sw.toString());
    }
}
