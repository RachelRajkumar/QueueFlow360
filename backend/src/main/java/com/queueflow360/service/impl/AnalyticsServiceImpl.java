package com.queueflow360.service.impl;

import com.queueflow360.dto.DashboardStatsResponse;
import com.queueflow360.repository.AppointmentRepository;
import com.queueflow360.repository.CustomerRepository;
import com.queueflow360.repository.QueueTokenRepository;
import com.queueflow360.service.AnalyticsService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    private final CustomerRepository customerRepository;
    private final AppointmentRepository appointmentRepository;
    private final QueueTokenRepository queueTokenRepository;

    public AnalyticsServiceImpl(CustomerRepository customerRepository, AppointmentRepository appointmentRepository, QueueTokenRepository queueTokenRepository) {
        this.customerRepository = customerRepository;
        this.appointmentRepository = appointmentRepository;
        this.queueTokenRepository = queueTokenRepository;
    }

    @Override
    public DashboardStatsResponse getDashboardStats() {
        long totalCustomers = customerRepository.count();
        long todaysAppointments = appointmentRepository.countByAppointmentDate(LocalDate.now());
        long waitingTokens = queueTokenRepository.countByStatus("WAITING");
        long completedTokens = queueTokenRepository.countByStatus("COMPLETED");

        return DashboardStatsResponse.builder()
                .totalCustomers(totalCustomers)
                .todaysAppointments(todaysAppointments)
                .waitingTokens(waitingTokens)
                .completedTokens(completedTokens)
                .build();
    }
}
