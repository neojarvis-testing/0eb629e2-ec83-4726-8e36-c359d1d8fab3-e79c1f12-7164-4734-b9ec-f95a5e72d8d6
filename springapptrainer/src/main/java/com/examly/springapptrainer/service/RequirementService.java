package com.examly.springapptrainer.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapptrainer.modal.Requirement;

public interface RequirementService {

    Requirement addRequirement(Requirement requirement);
    Optional<Requirement>getRequirementById(Long requirementId);
    List<Requirement> getAllRequirements();
    Requirement updateRequirement(Long requirementId , Requirement requirement );
    void deleteRequirement(Long requirementId );
    List<Requirement> getRequirementsByTrainerId(Long trainerId);
}
