package com.queueflow360.controller;

import com.queueflow360.dto.QueueStatusResponse;
import com.queueflow360.service.QueueEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/queue")
public class QueueController {

    private final QueueEngineService queueEngineService;

    public QueueController(QueueEngineService queueEngineService) {
        this.queueEngineService = queueEngineService;
    }

    // Accessible by Customer
    @GetMapping("/status")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<QueueStatusResponse> getMyStatus(Authentication authentication) {
        QueueStatusResponse status = queueEngineService.getCustomerQueueStatus(authentication.getName());
        return ResponseEntity.ok(status); // Can be null if no active token
    }

    // Accessible by Admin
    @GetMapping("/waiting")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<QueueStatusResponse>> getWaitingTokens() {
        return ResponseEntity.ok(queueEngineService.getWaitingTokens());
    }

    @GetMapping("/serving")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<QueueStatusResponse>> getServingTokens() {
        return ResponseEntity.ok(queueEngineService.getServingTokens());
    }

    @PostMapping("/call-next")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<QueueStatusResponse> callNextToken() {
        return ResponseEntity.ok(queueEngineService.callNextToken());
    }

    @PostMapping("/complete/{tokenNumber}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<QueueStatusResponse> completeToken(@PathVariable String tokenNumber) {
        return ResponseEntity.ok(queueEngineService.completeToken(tokenNumber));
    }

    @PostMapping("/skip/{tokenNumber}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<QueueStatusResponse> skipToken(@PathVariable String tokenNumber) {
        return ResponseEntity.ok(queueEngineService.skipToken(tokenNumber));
    }
}
