package com.queueflow360.service;

import com.queueflow360.entity.Department;
import java.util.List;

public interface DepartmentService {
    List<Department> getAllDepartments();
    Department getDepartmentById(Long id);
    Department createDepartment(Department department);
    Department updateDepartment(Long id, Department departmentDetails);
    void deleteDepartment(Long id);
}
