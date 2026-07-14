package com.queueflow.controller;

import com.queueflow.dto.QueueRequest;
import com.queueflow.dto.QueueResponse;
import com.queueflow.service.QueueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/queues")
@CrossOrigin("*")
public class QueueController {

    @Autowired
    private QueueService queueService;

    @PostMapping("/generate")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<QueueResponse> generateQueueToken(@RequestBody QueueRequest request) {
        return ResponseEntity.ok(queueService.generateQueueToken(request));
    }

    @GetMapping("/pending/{departmentId}")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<List<QueueResponse>> getPendingQueuesByDepartment(@PathVariable Long departmentId) {
        return ResponseEntity.ok(queueService.getPendingQueuesByDepartment(departmentId));
    }
}
