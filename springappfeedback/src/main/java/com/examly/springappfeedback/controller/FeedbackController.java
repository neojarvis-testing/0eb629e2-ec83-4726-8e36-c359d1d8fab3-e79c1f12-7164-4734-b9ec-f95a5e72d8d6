package com.examly.springappfeedback.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
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

    @PostMapping
    public ResponseEntity<Feedback> createFeeback(@RequestBody Feedback feedback) {
        Feedback saveFeedback = feedbackService.createFeedback(feedback);
        return ResponseEntity.status(201).body(saveFeedback);
    }

    @GetMapping("/{feedbackId}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long feedbackId ) {
        Feedback feedback = feedbackService.getFeedbackById(feedbackId);
        return ResponseEntity.ok(feedback);      
    }

    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedbacks(){
         return ResponseEntity.ok(feedbackService.getAllFeedbacks());
    }

    
    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<String> deleteFeedback(@PathVariable Long feedbackId) {
        feedbackService.deleteFeedback(feedbackId);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Feedback>> getFeedbacksByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(feedbackService.getFeedbacksByUserId(userId));
    }
}
