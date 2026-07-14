package com.queueflow.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentRequest {
    private Long customerId;
    private Long departmentId;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String remarks;
}
