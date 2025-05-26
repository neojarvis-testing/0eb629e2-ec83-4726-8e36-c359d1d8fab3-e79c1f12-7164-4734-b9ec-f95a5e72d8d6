package com.examly.springapptrainer.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapptrainer.modal.Trainer;

public interface TrainerService {
    Trainer addTrainer(Trainer trainer);
    Optional<Trainer> getTrainerById(Long trainerId);
    List<Trainer> getAllTrainers();
    Trainer updateTrainer(Long trainerId,Trainer trainer);
    Trainer deleteTrainer(Long trainerId);
}

