package com.queueflow.service;

import com.queueflow.dto.QueueRequest;
import com.queueflow.dto.QueueResponse;
import com.queueflow.entity.Customer;
import com.queueflow.entity.Department;
import com.queueflow.entity.Queue;
import com.queueflow.mapper.QueueMapper;
import com.queueflow.repository.QueueRepository;
import com.queueflow.service.impl.QueueServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class QueueServiceTest {

    @Mock
    private QueueRepository queueRepository;

    @Mock
    private QueueMapper queueMapper;

    @InjectMocks
    private QueueServiceImpl queueService;

    private QueueRequest request;
    private Queue queue;
    private QueueResponse expectedResponse;

    @BeforeEach
    void setUp() {
        request = new QueueRequest();
        request.setCustomerId(1L);
        request.setDepartmentId(1L);
        request.setIsPriority(false);

        Customer c = new Customer();
        c.setId(1L);
        
        Department d = new Department();
        d.setId(1L);
        d.setName("General Services");

        queue = Queue.builder()
                .id(1L)
                .customer(c)
                .department(d)
                .queueNumber("A-123")
                .status("WAITING")
                .estimatedWaitTime(15)
                .createdAt(LocalDateTime.now())
                .build();

        expectedResponse = QueueResponse.builder()
                .id(1L)
                .queueNumber("A-123")
                .status("WAITING")
                .departmentName("General Services")
                .build();
    }

    @Test
    void testGenerateQueueToken() {
        // Arrange
        when(queueRepository.save(any(Queue.class))).thenReturn(queue);
        when(queueMapper.mapToResponse(any(Queue.class))).thenReturn(expectedResponse);

        // Act
        QueueResponse actualResponse = queueService.generateQueueToken(request);

        // Assert
        assertNotNull(actualResponse);
        assertEquals("A-123", actualResponse.getQueueNumber());
        assertEquals("General Services", actualResponse.getDepartmentName());
        assertEquals("WAITING", actualResponse.getStatus());
        
        verify(queueRepository, times(1)).save(any(Queue.class));
    }
}
