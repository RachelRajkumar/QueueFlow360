package com.queueflow360.controller;

import com.queueflow360.dto.AppointmentRequest;
import com.queueflow360.dto.AppointmentResponse;
import com.queueflow360.entity.Department;
import com.queueflow360.entity.Service;
import com.queueflow360.service.AppointmentService;
import com.queueflow360.service.DepartmentService;
import com.queueflow360.service.ServiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    private final AppointmentService appointmentService;
    private final DepartmentService departmentService;
    private final ServiceService serviceService;

    public CustomerController(AppointmentService appointmentService, DepartmentService departmentService, ServiceService serviceService) {
        this.appointmentService = appointmentService;
        this.departmentService = departmentService;
        this.serviceService = serviceService;
    }

    // Customers need to fetch departments and services to book
    @GetMapping("/departments")
    public ResponseEntity<List<Department>> getDepartments() {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }

    @GetMapping("/services/department/{departmentId}")
    public ResponseEntity<List<Service>> getServicesByDepartment(@PathVariable Long departmentId) {
        return ResponseEntity.ok(serviceService.getServicesByDepartment(departmentId));
    }

    @PostMapping("/appointments")
    public ResponseEntity<AppointmentResponse> bookAppointment(@RequestBody AppointmentRequest request, Authentication authentication) {
        return ResponseEntity.ok(appointmentService.bookAppointment(request, authentication.getName()));
    }

    @GetMapping("/appointments")
    public ResponseEntity<List<AppointmentResponse>> getMyAppointments(Authentication authentication) {
        return ResponseEntity.ok(appointmentService.getCustomerAppointments(authentication.getName()));
    }

    @DeleteMapping("/appointments/{id}")
    public ResponseEntity<Void> cancelAppointment(@PathVariable Long id, Authentication authentication) {
        appointmentService.cancelAppointment(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
