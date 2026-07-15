package com.queueflow360.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentRequest {
    private Long departmentId;
    private Long serviceId;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
}
