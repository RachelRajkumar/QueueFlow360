package com.queueflow.controller;

import com.queueflow.entity.Customer;
import com.queueflow.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/search")
@CrossOrigin("*")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping("/customers")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<List<Customer>> searchCustomers(@RequestParam String keyword) {
        return ResponseEntity.ok(searchService.searchCustomers(keyword));
    }
}
