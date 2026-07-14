package com.queueflow.service;

import com.queueflow.entity.Counter;
import com.queueflow.repository.CounterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CounterService {

    @Autowired
    private CounterRepository counterRepository;

    public Counter createCounter(Counter counter) {
        return counterRepository.save(counter);
    }

    public List<Counter> getCountersByDepartment(Long departmentId) {
        return counterRepository.findByDepartmentId(departmentId);
    }

    public Counter updateCounterStatus(Long id, String status) {
        Counter counter = counterRepository.findById(id).orElseThrow(() -> new RuntimeException("Counter not found"));
        counter.setStatus(status);
        return counterRepository.save(counter);
    }
}
