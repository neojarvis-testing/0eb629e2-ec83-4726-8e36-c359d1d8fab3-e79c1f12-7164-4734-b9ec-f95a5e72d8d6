package com.examly.springapptrainer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapptrainer.modal.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{

}
