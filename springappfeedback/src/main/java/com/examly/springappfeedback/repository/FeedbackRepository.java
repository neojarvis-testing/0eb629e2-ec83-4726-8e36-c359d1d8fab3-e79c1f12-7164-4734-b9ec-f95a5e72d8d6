package com.examly.springappfeedback.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springappfeedback.modal.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    List<Feedback> findByUserUserId(Long userId);
}
