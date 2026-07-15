package com.queueflow360.service.impl;

import com.queueflow360.entity.Department;
import com.queueflow360.entity.Service;
import com.queueflow360.exception.ResourceNotFoundException;
import com.queueflow360.repository.DepartmentRepository;
import com.queueflow360.repository.ServiceRepository;
import com.queueflow360.service.ServiceService;

import java.util.List;

@org.springframework.stereotype.Service
public class ServiceServiceImpl implements ServiceService {

    private final ServiceRepository serviceRepository;
    private final DepartmentRepository departmentRepository;

    public ServiceServiceImpl(ServiceRepository serviceRepository, DepartmentRepository departmentRepository) {
        this.serviceRepository = serviceRepository;
        this.departmentRepository = departmentRepository;
    }

    @Override
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    @Override
    public List<Service> getServicesByDepartment(Long departmentId) {
        return serviceRepository.findByDepartmentId(departmentId);
    }

    @Override
    public Service getServiceById(Long id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));
    }

    @Override
    public Service createService(Service service) {
        Department department = departmentRepository.findById(service.getDepartment().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
        service.setDepartment(department);
        return serviceRepository.save(service);
    }

    @Override
    public Service updateService(Long id, Service serviceDetails) {
        Service service = getServiceById(id);
        service.setServiceName(serviceDetails.getServiceName());
        if (serviceDetails.getDepartment() != null && serviceDetails.getDepartment().getId() != null) {
            Department department = departmentRepository.findById(serviceDetails.getDepartment().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
            service.setDepartment(department);
        }
        return serviceRepository.save(service);
    }

    @Override
    public void deleteService(Long id) {
        Service service = getServiceById(id);
        serviceRepository.delete(service);
    }
}
