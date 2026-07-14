package com.queueflow.controller;

import com.queueflow.entity.Counter;
import com.queueflow.service.CounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/counters")
@CrossOrigin("*")
public class CounterController {

    @Autowired
    private CounterService counterService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Counter> createCounter(@RequestBody Counter counter) {
        return ResponseEntity.ok(counterService.createCounter(counter));
    }

    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<Counter>> getCountersByDepartment(@PathVariable Long departmentId) {
        return ResponseEntity.ok(counterService.getCountersByDepartment(departmentId));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<Counter> updateCounterStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(counterService.updateCounterStatus(id, status));
    }
}
