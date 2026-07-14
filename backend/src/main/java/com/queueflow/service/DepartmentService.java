package com.queueflow.service;

import com.queueflow.entity.Department;
import com.queueflow.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public List<Department> getDepartmentsByBranch(Long branchId) {
        return departmentRepository.findByBranchIdAndIsActiveTrue(branchId);
    }
}
