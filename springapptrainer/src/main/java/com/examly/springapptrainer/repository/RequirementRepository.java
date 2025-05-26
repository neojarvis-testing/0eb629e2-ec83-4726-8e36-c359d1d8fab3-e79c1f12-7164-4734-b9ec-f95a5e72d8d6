package com.examly.springapptrainer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapptrainer.modal.Requirement;

@Repository
public interface RequirementRepository extends JpaRepository<Requirement,Long> {

    List<Requirement> findByTrainer_TrainerId(Long trainerId);
}
