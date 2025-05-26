package com.examly.springappfeedback.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examly.springappfeedback.modal.Feedback;
import com.examly.springappfeedback.repository.FeedbackRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {
    
    private final  FeedbackRepository feedbackRepository;

    @Override
    public Feedback createFeedback(Feedback feedback){
        return feedbackRepository.save(feedback);
    }
    @Override
    public Feedback getFeedbackById(Long feedbackId){
        return feedbackRepository.findById(feedbackId)
                .orElseThrow(()-> new RuntimeException("Feedback not found with ID: "+ feedbackId));
    }
    @Override
    public List<Feedback>getAllFeedbacks(){
        return feedbackRepository.findAll();
    }
    @Override
    public void deleteFeedback(Long feedbackId) {
      if(!feedbackRepository.existsById(feedbackId)){
        throw new RuntimeException("Feedback not found with ID: "+ feedbackId);
      }
      feedbackRepository.deleteById(feedbackId);
    }
    @Override
    public List<Feedback> getFeedbacksByUserId(Long userId) {
       return feedbackRepository.findByUserUserId(userId);
    }
}
