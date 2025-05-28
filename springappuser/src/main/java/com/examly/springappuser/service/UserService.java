package com.examly.springappuser.service;

import org.springframework.stereotype.Service;

import com.examly.springappuser.model.LoginDTO;
import com.examly.springappuser.model.User;

@Service
public interface UserService {

    String createUser(User user);

    LoginDTO loginUser(User user);
    
}