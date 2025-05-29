package com.examly.springappfeedback.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize; // Import PreAuthorize
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springappfeedback.modal.Feedback;
import com.examly.springappfeedback.service.FeedbackService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    // POST /api/feedback: Only Manager
    @PostMapping
    @PreAuthorize("hasRole('Manager')")
    public ResponseEntity<Feedback> createFeeback(@RequestBody Feedback feedback) {
        Feedback saveFeedback = feedbackService.createFeedback(feedback);
        return ResponseEntity.status(201).body(saveFeedback);
    }

    // GET /api/feedback/{feedbackId}: Manager and Coordinator
    @GetMapping("/{feedbackId}")
    @PreAuthorize("hasAnyRole('Manager', 'Coordinator')")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long feedbackId) {
        Feedback feedback = feedbackService.getFeedbackById(feedbackId);
        return ResponseEntity.ok(feedback);
    }

    // GET /api/feedback: Manager and Coordinator
    @GetMapping
    @PreAuthorize("hasAnyRole('Manager', 'Coordinator')")
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        return ResponseEntity.ok(feedbackService.getAllFeedbacks());
    }

    // DELETE /api/feedback/{feedbackId}: Only Manager (assumption based on POST rule)
    @DeleteMapping("/{feedbackId}")
    @PreAuthorize("hasRole('Manager')")
    public ResponseEntity<String> deleteFeedback(@PathVariable Long feedbackId) {
        feedbackService.deleteFeedback(feedbackId);
        return ResponseEntity.noContent().build();
    }

    // GET /api/feedback/user/{userId}: Only Manager
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('Manager')")
    public ResponseEntity<List<Feedback>> getFeedbacksByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(feedbackService.getFeedbacksByUserId(userId));
    }
}