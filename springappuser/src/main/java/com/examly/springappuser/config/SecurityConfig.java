
package com.examly.springappuser.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private JwtAuthenticationFilter jwtFilter;
    private MyUserDetailsService myUserDetailsService;
    @Autowired
    public SecurityConfig(JwtAuthenticationFilter jwtFilter, MyUserDetailsService myUserDetailsService) {
        this.jwtFilter = jwtFilter;
        this.myUserDetailsService = myUserDetailsService;
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)throws Exception{
        System.out.println("------------------------------------------------");
        System.out.println("------------------------------------------------");
        System.out.println("------------------------------------------------");
        System.out.println(" EUSer------- User");
        System.out.println("------------------------------------------------");
        System.out.println("------------------------------------------------");
        System.out.println("------------------------------------------------");
        http.csrf(csrf->csrf.disable()).authorizeHttpRequests(auth -> auth.requestMatchers("/api/login","/api/register").permitAll()
        .anyRequest().authenticated()).sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authenticationProvider(authenticationProvider());
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
     @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationManager authManager(AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }

     @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(myUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
   }
