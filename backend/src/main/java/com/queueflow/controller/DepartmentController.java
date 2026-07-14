package com.queueflow.controller;

import com.queueflow.entity.Department;
import com.queueflow.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/departments")
@CrossOrigin("*")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        return ResponseEntity.ok(departmentService.createDepartment(department));
    }

    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<Department>> getDepartmentsByBranch(@PathVariable Long branchId) {
        return ResponseEntity.ok(departmentService.getDepartmentsByBranch(branchId));
    }
}
