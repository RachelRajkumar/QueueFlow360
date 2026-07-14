package com.queueflow.mapper;

import com.queueflow.dto.QueueRequest;
import com.queueflow.dto.QueueResponse;
import com.queueflow.entity.Queue;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class QueueMapper {

    @Autowired
    private ModelMapper modelMapper;

    public Queue mapToEntity(QueueRequest request) {
        return modelMapper.map(request, Queue.class);
    }

    public QueueResponse mapToResponse(Queue queue) {
        QueueResponse response = modelMapper.map(queue, QueueResponse.class);
        if (queue.getDepartment() != null) {
            response.setDepartmentName(queue.getDepartment().getName());
        }
        return response;
    }
}
