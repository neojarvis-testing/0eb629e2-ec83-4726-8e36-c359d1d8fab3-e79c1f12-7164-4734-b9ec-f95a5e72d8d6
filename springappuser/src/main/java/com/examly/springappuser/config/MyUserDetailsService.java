package com.examly.springappuser.config;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.examly.springappuser.model.User;
import com.examly.springappuser.repository.UserRepo;

@Service
public class MyUserDetailsService implements UserDetailsService{

    private UserRepo  userRepository;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
         User user = userRepository.findByUsername(username)
         .orElseThrow(() -> new UsernameNotFoundException("user not found"));
         return new UserPrinciple(user);
    }
    
}
