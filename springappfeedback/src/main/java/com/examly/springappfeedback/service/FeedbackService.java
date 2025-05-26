package com.examly.springappfeedback.service;

import java.util.List;

import com.examly.springappfeedback.modal.Feedback;

public interface FeedbackService {
    Feedback createFeedback(Feedback feedback);
    Feedback getFeedbackById(Long feedbackId);
    List<Feedback>getAllFeedbacks();
    void deleteFeedback(Long feedbackId);
    List<Feedback> getFeedbacksByUserId(Long userId);
}
