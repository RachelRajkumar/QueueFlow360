package com.queueflow.service.impl;

import com.queueflow.dto.QueueRequest;
import com.queueflow.dto.QueueResponse;
import com.queueflow.entity.Customer;
import com.queueflow.entity.Department;
import com.queueflow.entity.Queue;
import com.queueflow.mapper.QueueMapper;
import com.queueflow.repository.QueueRepository;
import com.queueflow.service.QueueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QueueServiceImpl implements QueueService {

    @Autowired
    private QueueRepository queueRepository;

    @Autowired
    private QueueMapper queueMapper;

    @Override
    @Transactional
    public QueueResponse generateQueueToken(QueueRequest request) {
        Customer customer = new Customer();
        customer.setId(request.getCustomerId());

        Department department = new Department();
        department.setId(request.getDepartmentId());
        department.setName("General Services");

        String generatedQueueNumber = "A-" + (int)(Math.random() * 1000);

        Queue queue = Queue.builder()
                .customer(customer)
                .department(department)
                .queueNumber(generatedQueueNumber)
                .status("WAITING")
                .isPriority(request.getIsPriority() != null ? request.getIsPriority() : false)
                .estimatedWaitTime(15) 
                .createdAt(LocalDateTime.now())
                .build();

        queue = queueRepository.save(queue);

        return queueMapper.mapToResponse(queue);
    }

    @Override
    public List<QueueResponse> getPendingQueuesByDepartment(Long departmentId) {
        List<Queue> queues = queueRepository.findByDepartmentIdAndStatus(departmentId, "WAITING");
        return queues.stream()
                .map(queueMapper::mapToResponse)
                .collect(Collectors.toList());
    }
}
