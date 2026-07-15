package com.queueflow360.controller;

import com.queueflow360.dto.DashboardStatsResponse;
import com.queueflow360.entity.Department;
import com.queueflow360.entity.Service;
import com.queueflow360.service.AnalyticsService;
import com.queueflow360.service.DepartmentService;
import com.queueflow360.service.ServiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final DepartmentService departmentService;
    private final ServiceService serviceService;
    private final AnalyticsService analyticsService;

    public AdminController(DepartmentService departmentService, ServiceService serviceService, AnalyticsService analyticsService) {
        this.departmentService = departmentService;
        this.serviceService = serviceService;
        this.analyticsService = analyticsService;
    }

    // --- Department Endpoints ---

    @GetMapping("/departments")
    public ResponseEntity<List<Department>> getAllDepartments() {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }

    @PostMapping("/departments")
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        return ResponseEntity.ok(departmentService.createDepartment(department));
    }

    @PutMapping("/departments/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable Long id, @RequestBody Department department) {
        return ResponseEntity.ok(departmentService.updateDepartment(id, department));
    }

    @DeleteMapping("/departments/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.noContent().build();
    }

    // --- Service Endpoints ---

    @GetMapping("/services")
    public ResponseEntity<List<Service>> getAllServices() {
        return ResponseEntity.ok(serviceService.getAllServices());
    }

    @PostMapping("/services")
    public ResponseEntity<Service> createService(@RequestBody Service service) {
        return ResponseEntity.ok(serviceService.createService(service));
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<Service> updateService(@PathVariable Long id, @RequestBody Service service) {
        return ResponseEntity.ok(serviceService.updateService(id, service));
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }

    // --- Dashboard ---
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats() {
        return ResponseEntity.ok(analyticsService.getDashboardStats());
    }
}
