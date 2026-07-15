package com.queueflow360.service;

import com.queueflow360.dto.AppointmentRequest;
import com.queueflow360.dto.AppointmentResponse;
import java.util.List;

public interface AppointmentService {
    AppointmentResponse bookAppointment(AppointmentRequest request, String email);
    List<AppointmentResponse> getCustomerAppointments(String email);
    List<AppointmentResponse> getAllAppointments();
    void cancelAppointment(Long appointmentId, String email);
}
