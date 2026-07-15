package com.queueflow360.service;

import com.queueflow360.dto.QueueStatusResponse;
import com.queueflow360.entity.Appointment;
import java.util.List;

public interface QueueEngineService {
    void generateToken(Appointment appointment);
    QueueStatusResponse getCustomerQueueStatus(String email);
    List<QueueStatusResponse> getWaitingTokens();
    List<QueueStatusResponse> getServingTokens();
    QueueStatusResponse callNextToken();
    QueueStatusResponse completeToken(String tokenNumber);
    QueueStatusResponse skipToken(String tokenNumber);
}
