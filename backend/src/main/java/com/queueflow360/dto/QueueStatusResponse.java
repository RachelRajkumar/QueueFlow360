package com.queueflow360.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QueueStatusResponse {
    private String tokenNumber;
    private String status;
    private int position; // position in waiting queue
    private String departmentName;
    private String serviceName;
}
