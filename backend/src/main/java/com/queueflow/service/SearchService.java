package com.queueflow.service;

import com.queueflow.entity.Customer;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchService {

    // Mock search logic since complex joins would require extensive specifications
    public List<Customer> searchCustomers(String keyword) {
        return new ArrayList<>(); // Return empty list for now
    }
}
