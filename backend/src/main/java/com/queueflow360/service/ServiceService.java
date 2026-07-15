package com.queueflow360.service;

import com.queueflow360.entity.Service;
import java.util.List;

public interface ServiceService {
    List<Service> getAllServices();
    List<Service> getServicesByDepartment(Long departmentId);
    Service getServiceById(Long id);
    Service createService(Service service);
    Service updateService(Long id, Service serviceDetails);
    void deleteService(Long id);
}
