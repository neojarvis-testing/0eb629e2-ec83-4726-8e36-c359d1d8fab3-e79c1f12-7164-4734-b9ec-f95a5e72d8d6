package com.examly.springappuser.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

import org.springframework.http.HttpStatus;

import com.examly.springappuser.model.User;
import com.examly.springappuser.repository.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor  
public class UserService implements UserServiceImpl{

    private final UserRepo userRepository;

    @Override
    public ResponseEntity<String> registerUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("User already exists with this email.");
        }

        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("User register successfully.");
    }

    @Override   
    public ResponseEntity<String> login(String email, String password){
        return userRepository.findByEmailAndPassword(email,password)
               .map(user->{
                String token = user.getUserRole(); //role used as token
                return ResponseEntity.ok().body("{\"token\":\""+ token + "\"}");
               })
               .orElseGet(() -> new ResponseEntity<>("Invalid credentials",HttpStatus.UNAUTHORIZED));
    }

}
