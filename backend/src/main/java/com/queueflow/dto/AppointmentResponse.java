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
public class AppointmentResponse {
    private Long id;
    private String customerName;
    private String departmentName;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String status;
    private String remarks;
}
