package com.queueflow360.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentResponse {
    private Long id;
    private String departmentName;
    private String serviceName;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String status;
    private String tokenNumber;
}
