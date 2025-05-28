package com.examly.springapptrainer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.examly.springapptrainer.modal.Requirement;
import com.examly.springapptrainer.repository.RequirementRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RequirementServiceImpl implements RequirementService{

    private final RequirementRepository requirementRepository;

    public Requirement addRequirement(Requirement requirement) {
        return requirementRepository.save(requirement);
    }

    public Optional<Requirement>getRequirementById(Long id){
        return requirementRepository.findById(id);
    }

    public List<Requirement>getAllRequirements(){
        return requirementRepository.findAll();
    }

    
    public Requirement updateRequirement(Long id, Requirement updated) {
          return requirementRepository.findById(id).map(r -> {
            updated.setRequirementId(id);
            return requirementRepository.save(updated);
          }).orElseThrow();
    }

    public void deleteRequirement(Long id) {
        requirementRepository.deleteById(id);
    }

    @Override
    public List<Requirement> getRequirementsByTrainerId(Long trainerId) {
         return requirementRepository.findByTrainer_TrainerId(trainerId);
    }

    
    
}
