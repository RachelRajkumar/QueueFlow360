package com.queueflow360.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardStatsResponse {
    private long totalCustomers;
    private long todaysAppointments;
    private long waitingTokens;
    private long completedTokens;
}
