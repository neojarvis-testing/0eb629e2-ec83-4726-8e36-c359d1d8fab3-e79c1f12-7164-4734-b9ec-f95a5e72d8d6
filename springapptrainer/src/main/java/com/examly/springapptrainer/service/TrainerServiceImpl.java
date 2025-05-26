package com.examly.springapptrainer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.examly.springapptrainer.modal.Trainer;
import com.examly.springapptrainer.repository.TrainerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TrainerServiceImpl implements TrainerService{
    
    private final  TrainerRepository trainerRepository;

    public Trainer addTrainer(Trainer trainer){
        return trainerRepository.save(trainer);
    }

    public Optional<Trainer>getTrainerById(Long id){
        return trainerRepository.findById(id);
    }
     public List<Trainer>getAllTrainers(){
        return trainerRepository.findAll();
    }

    
    public Trainer updateTrainer(Long id, Trainer updated) {
        updated.setTrainerId(id);
        return trainerRepository.save(updated);
    }

    public Trainer deleteTrainer(Long id) {
        Trainer trainer =  trainerRepository.findById(id).orElseThrow();
        trainerRepository.deleteById(id);
        return trainer;
    }

}
