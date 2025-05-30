package com.examly.springapptrainer.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapptrainer.modal.Trainer;
import com.examly.springapptrainer.service.TrainerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/trainer")
@RequiredArgsConstructor
public class TrainerController {

    private final TrainerService trainerService;

    @PostMapping
    @PreAuthorize("hasRole('Coordinator')")
    public ResponseEntity<Trainer> addtrainer(@RequestBody Trainer trainer) {
        Trainer saveTrainer = trainerService.addTrainer(trainer);
        return ResponseEntity.status(201).body(saveTrainer);
    }

    @GetMapping("/{trainerId}")
    @PreAuthorize("hasAnyRole('Manager', 'Coordinator')")
    public ResponseEntity<Trainer> getTrainerById(@PathVariable Long trainerId) {
        Trainer trainer = trainerService.getTrainerById(trainerId)
                .orElseThrow(() -> new IllegalArgumentException("Trainer not found"));
        return ResponseEntity.ok(trainer);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('Manager', 'Coordinator')")
    public ResponseEntity<List<Trainer>> getAllTrainers() {
        return ResponseEntity.ok(trainerService.getAllTrainers());
    }

    @PutMapping("/{trainerId}")
    @PreAuthorize("hasRole('Coordinator')")
    public ResponseEntity<Trainer> updateTrainer(@PathVariable Long trainerId, @RequestBody Trainer trainer) {
        Trainer updated = trainerService.updateTrainer(trainerId, trainer);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{trainerId}")
    @PreAuthorize("hasRole('Coordinator')")
    public ResponseEntity<Void> deleteTrainer(@PathVariable Long trainerId) {
        trainerService.deleteTrainer(trainerId);
        return ResponseEntity.noContent().build();
    }
}
