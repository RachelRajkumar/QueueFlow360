package com.queueflow.service;

import com.queueflow.dto.QueueRequest;
import com.queueflow.dto.QueueResponse;
import java.util.List;

public interface QueueService {
    QueueResponse generateQueueToken(QueueRequest request);
    List<QueueResponse> getPendingQueuesByDepartment(Long departmentId);
}
