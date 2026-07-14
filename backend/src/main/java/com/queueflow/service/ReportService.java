package com.queueflow.service;

import com.queueflow.repository.AppointmentRepository;
import com.queueflow.repository.QueueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ReportService {

    @Autowired
    private QueueRepository queueRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        // Mock data to represent complex native queries for brevity
        stats.put("totalAppointmentsToday", appointmentRepository.count()); // Mock
        stats.put("totalQueuesToday", queueRepository.count()); // Mock
        stats.put("pendingQueues", queueRepository.findByStatus("WAITING").size());
        stats.put("completedQueues", queueRepository.findByStatus("COMPLETED").size());
        return stats;
    }
}
