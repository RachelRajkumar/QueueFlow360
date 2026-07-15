package com.queueflow360.service.impl;

import com.queueflow360.dto.AppointmentRequest;
import com.queueflow360.dto.AppointmentResponse;
import com.queueflow360.entity.*;
import com.queueflow360.exception.ResourceNotFoundException;
import com.queueflow360.repository.*;
import com.queueflow360.service.AppointmentService;
import com.queueflow360.service.QueueEngineService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DepartmentRepository departmentRepository;
    private final ServiceRepository serviceRepository;
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final QueueEngineService queueEngineService;
    private final QueueTokenRepository queueTokenRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository, DepartmentRepository departmentRepository,
                                  ServiceRepository serviceRepository, CustomerRepository customerRepository,
                                  UserRepository userRepository, QueueEngineService queueEngineService, QueueTokenRepository queueTokenRepository) {
        this.appointmentRepository = appointmentRepository;
        this.departmentRepository = departmentRepository;
        this.serviceRepository = serviceRepository;
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
        this.queueEngineService = queueEngineService;
        this.queueTokenRepository = queueTokenRepository;
    }

    @Override
    public AppointmentResponse bookAppointment(AppointmentRequest request, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Customer customer = customerRepository.findByUserId(user.getId()).orElseThrow(() -> new ResourceNotFoundException("Customer profile not found"));
        Department department = departmentRepository.findById(request.getDepartmentId()).orElseThrow(() -> new ResourceNotFoundException("Department not found"));
        com.queueflow360.entity.Service service = serviceRepository.findById(request.getServiceId()).orElseThrow(() -> new ResourceNotFoundException("Service not found"));

        Appointment appointment = Appointment.builder()
                .customer(customer)
                .department(department)
                .service(service)
                .appointmentDate(request.getAppointmentDate())
                .appointmentTime(request.getAppointmentTime())
                .status("SCHEDULED")
                .build();

        appointment = appointmentRepository.save(appointment);

        // Generate Token
        queueEngineService.generateToken(appointment);

        return mapToResponse(appointment);
    }

    @Override
    public List<AppointmentResponse> getCustomerAppointments(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Customer customer = customerRepository.findByUserId(user.getId()).orElseThrow(() -> new ResourceNotFoundException("Customer profile not found"));
        return appointmentRepository.findByCustomerId(customer.getId())
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<AppointmentResponse> getAllAppointments() {
        return appointmentRepository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public void cancelAppointment(Long appointmentId, String email) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
        // Additional check for customer email could be added here
        appointment.setStatus("CANCELLED");
        appointmentRepository.save(appointment);

        queueTokenRepository.findByAppointmentId(appointment.getId()).ifPresent(token -> {
            if ("WAITING".equals(token.getStatus())) {
                token.setStatus("CANCELLED");
                queueTokenRepository.save(token);
            }
        });
    }

    private AppointmentResponse mapToResponse(Appointment appointment) {
        AppointmentResponse response = new AppointmentResponse();
        response.setId(appointment.getId());
        response.setDepartmentName(appointment.getDepartment().getName());
        response.setServiceName(appointment.getService().getServiceName());
        response.setAppointmentDate(appointment.getAppointmentDate());
        response.setAppointmentTime(appointment.getAppointmentTime());
        response.setStatus(appointment.getStatus());

        queueTokenRepository.findByAppointmentId(appointment.getId()).ifPresent(token -> {
            response.setTokenNumber(token.getTokenNumber());
        });

        return response;
    }
}
