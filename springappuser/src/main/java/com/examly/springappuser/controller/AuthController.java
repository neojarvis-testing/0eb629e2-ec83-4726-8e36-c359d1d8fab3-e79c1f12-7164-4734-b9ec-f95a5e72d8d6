package com.examly.springappuser.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springappuser.model.LoginDTO;
import com.examly.springappuser.model.User;
import com.examly.springappuser.service.UserService;


@RestController
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {

        String userResponse = userService.createUser(user);

        return ResponseEntity.created(URI.create("/api/user"))
                .body(userResponse);
    }

    @PostMapping("/api/login")
    public ResponseEntity<LoginDTO> loginUser(@RequestBody User user) {

        return ResponseEntity.ok(userService.loginUser(user));
    }

}