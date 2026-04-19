package com.unicord.stoneoven.service;

import com.unicord.stoneoven.model.entity.Outlet;
import com.unicord.stoneoven.repository.OutletRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class OutletService {

    private final OutletRepository outletRepository;

    public OutletService(OutletRepository outletRepository) {
        this.outletRepository = outletRepository;
    }

    public List<Outlet> getAllActiveOutlets() {
        return outletRepository.findByIsActiveTrue();
    }

    public Outlet getOutletByCode(String code) {
        return outletRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Outlet not found: " + code));
    }

    public Outlet getOutletById(UUID id) {
        return outletRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Outlet not found: " + id));
    }
}
