package com.queueflow360.service.impl;

import com.queueflow360.dto.QueueStatusResponse;
import com.queueflow360.entity.Appointment;
import com.queueflow360.entity.Customer;
import com.queueflow360.entity.QueueToken;
import com.queueflow360.entity.User;
import com.queueflow360.exception.ResourceNotFoundException;
import com.queueflow360.repository.CustomerRepository;
import com.queueflow360.repository.QueueTokenRepository;
import com.queueflow360.repository.UserRepository;
import com.queueflow360.service.QueueEngineService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QueueEngineServiceImpl implements QueueEngineService {

    private final QueueTokenRepository queueTokenRepository;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

    public QueueEngineServiceImpl(QueueTokenRepository queueTokenRepository, UserRepository userRepository, CustomerRepository customerRepository) {
        this.queueTokenRepository = queueTokenRepository;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
    }

    @Override
    public void generateToken(Appointment appointment) {
        Long deptId = appointment.getDepartment().getId();
        long count = queueTokenRepository.countByAppointment_Department_Id(deptId);
        
        String deptName = appointment.getDepartment().getName();
        String prefix = (deptName.length() >= 3) ? deptName.substring(0, 3).toUpperCase() : deptName.toUpperCase();
        String tokenStr = String.format("%s-%03d", prefix, count + 1);

        QueueToken token = QueueToken.builder()
                .appointment(appointment)
                .tokenNumber(tokenStr)
                .status("WAITING")
                .createdAt(LocalDateTime.now())
                .build();
        queueTokenRepository.save(token);
    }

    @Override
    public QueueStatusResponse getCustomerQueueStatus(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Customer customer = customerRepository.findByUserId(user.getId()).orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        // Get the latest token for this customer
        List<QueueToken> waitingTokens = queueTokenRepository.findByStatusOrderByCreatedAtAsc("WAITING");

        // Find customer's waiting token
        for (int i = 0; i < waitingTokens.size(); i++) {
            QueueToken t = waitingTokens.get(i);
            if (t.getAppointment().getCustomer().getId().equals(customer.getId())) {
                return mapToQueueStatusResponse(t, i + 1);
            }
        }

        // Check if they have an IN_PROGRESS token
        List<QueueToken> inProgressTokens = queueTokenRepository.findByStatusOrderByCreatedAtAsc("IN_PROGRESS");
        for (QueueToken t : inProgressTokens) {
            if (t.getAppointment().getCustomer().getId().equals(customer.getId())) {
                return mapToQueueStatusResponse(t, 0);
            }
        }

        return null; // No active token
    }

    @Override
    public List<QueueStatusResponse> getWaitingTokens() {
        List<QueueToken> waitingTokens = queueTokenRepository.findByStatusOrderByCreatedAtAsc("WAITING");
        return java.util.stream.IntStream.range(0, waitingTokens.size())
                .mapToObj(i -> mapToQueueStatusResponse(waitingTokens.get(i), i + 1))
                .collect(Collectors.toList());
    }

    @Override
    public List<QueueStatusResponse> getServingTokens() {
        List<QueueToken> servingTokens = queueTokenRepository.findByStatusOrderByCreatedAtAsc("IN_PROGRESS");
        return servingTokens.stream()
                .map(t -> mapToQueueStatusResponse(t, 0))
                .collect(Collectors.toList());
    }

    @Override
    public QueueStatusResponse callNextToken() {
        List<QueueToken> waitingTokens = queueTokenRepository.findByStatusOrderByCreatedAtAsc("WAITING");
        if (waitingTokens.isEmpty()) return null;

        QueueToken nextToken = waitingTokens.get(0);
        nextToken.setStatus("IN_PROGRESS");
        queueTokenRepository.save(nextToken);

        return mapToQueueStatusResponse(nextToken, 0);
    }

    @Override
    public QueueStatusResponse completeToken(String tokenNumber) {
        return changeTokenStatus(tokenNumber, "COMPLETED");
    }

    @Override
    public QueueStatusResponse skipToken(String tokenNumber) {
        return changeTokenStatus(tokenNumber, "SKIPPED");
    }

    private QueueStatusResponse changeTokenStatus(String tokenNumber, String status) {
        List<QueueToken> allTokens = queueTokenRepository.findAll();
        QueueToken token = allTokens.stream().filter(t -> t.getTokenNumber().equals(tokenNumber))
                .findFirst().orElseThrow(() -> new ResourceNotFoundException("Token not found: " + tokenNumber));
        token.setStatus(status);
        queueTokenRepository.save(token);
        return mapToQueueStatusResponse(token, 0);
    }

    private QueueStatusResponse mapToQueueStatusResponse(QueueToken token, int position) {
        return QueueStatusResponse.builder()
                .tokenNumber(token.getTokenNumber())
                .status(token.getStatus())
                .position(position)
                .departmentName(token.getAppointment().getDepartment().getName())
                .serviceName(token.getAppointment().getService().getServiceName())
                .build();
    }
}
