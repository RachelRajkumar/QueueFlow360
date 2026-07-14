package com.queueflow.service;

import com.queueflow.entity.Feedback;
import com.queueflow.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback submitFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getCustomerFeedback(Long customerId) {
        return feedbackRepository.findByCustomerId(customerId);
    }
}
