package com.queueflow.service;

import com.queueflow.dto.AppointmentRequest;
import com.queueflow.dto.AppointmentResponse;
import com.queueflow.entity.Appointment;
import com.queueflow.entity.Customer;
import com.queueflow.entity.Department;
import com.queueflow.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Transactional
    public AppointmentResponse bookAppointment(AppointmentRequest request) {
        Customer customer = new Customer();
        customer.setId(request.getCustomerId());

        Department department = new Department();
        department.setId(request.getDepartmentId());

        Appointment appointment = Appointment.builder()
                .customer(customer)
                .department(department)
                .appointmentDate(request.getAppointmentDate())
                .appointmentTime(request.getAppointmentTime())
                .status("SCHEDULED")
                .remarks(request.getRemarks())
                .build();

        appointmentRepository.save(appointment);

        return mapToResponse(appointment);
    }

    public List<AppointmentResponse> getCustomerAppointments(Long customerId) {
        List<Appointment> appointments = appointmentRepository.findByCustomerId(customerId);
        return appointments.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private AppointmentResponse mapToResponse(Appointment appointment) {
        return AppointmentResponse.builder()
                .id(appointment.getId())
                .customerName("Customer " + appointment.getCustomer().getId()) // Mocked for now
                .departmentName("Department " + appointment.getDepartment().getId()) // Mocked for now
                .appointmentDate(appointment.getAppointmentDate())
                .appointmentTime(appointment.getAppointmentTime())
                .status(appointment.getStatus())
                .remarks(appointment.getRemarks())
                .build();
    }
}
