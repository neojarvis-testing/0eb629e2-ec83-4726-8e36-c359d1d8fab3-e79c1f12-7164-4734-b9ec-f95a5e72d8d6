package com.examly.springappfeedback.modal;

import java.time.LocalDate;

import org.springframework.jmx.export.annotation.ManagedResource;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

    private String feedbackText;
    private LocalDate date;

    private String category;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    private Long trainerId; //in another service springapptrainer


}
