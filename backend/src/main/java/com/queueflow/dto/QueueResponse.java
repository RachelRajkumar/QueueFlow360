package com.queueflow.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QueueResponse {
    private Long id;
    private String queueNumber;
    private String status;
    private Integer estimatedWaitTime;
    private Boolean isPriority;
    private LocalDateTime createdAt;
    private String departmentName;
}
