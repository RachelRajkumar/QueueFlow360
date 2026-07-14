package com.queueflow.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QueueRequest {
    private Long customerId;
    private Long departmentId;
    private Boolean isPriority;
}
