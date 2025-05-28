package com.examly.springapptrainer.modal;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Requirement {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requirementId;
    
    private String title;
    private String description;
    private String department;
    private LocalDate postedDate;
    private String status;
    private String duration;
    private String mode;
    private String location;
    private String skillLevel;
    private Double budget;
    private String priority;

    @ManyToOne
    @JoinColumn(name = "trainer_id",nullable = true)
    private Trainer trainer;
}
