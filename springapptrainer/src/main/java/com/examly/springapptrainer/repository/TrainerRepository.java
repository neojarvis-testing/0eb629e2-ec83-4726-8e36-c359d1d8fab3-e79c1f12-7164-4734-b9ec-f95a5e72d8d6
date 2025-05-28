package com.examly.springapptrainer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapptrainer.modal.Trainer;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer,Long>{
    
}
