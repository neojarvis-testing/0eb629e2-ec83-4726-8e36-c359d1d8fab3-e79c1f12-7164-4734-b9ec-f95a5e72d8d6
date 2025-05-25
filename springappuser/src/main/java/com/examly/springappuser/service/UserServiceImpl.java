package com.examly.springappuser.service;

import org.springframework.http.ResponseEntity;

import com.examly.springappuser.model.User;

public interface UserServiceImpl {
    
    ResponseEntity<String> registerUser(User user);
    ResponseEntity<String> login(String email, String password);
    
}
