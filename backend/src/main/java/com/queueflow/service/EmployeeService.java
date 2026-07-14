package com.queueflow.service;

import com.queueflow.entity.Employee;
import com.queueflow.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllAvailableEmployees() {
        return employeeRepository.findByIsAvailableTrue();
    }
}
