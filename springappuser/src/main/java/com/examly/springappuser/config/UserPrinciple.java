package com.examly.springappuser.config;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.examly.springappuser.model.User;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter

public class UserPrinciple implements UserDetails {
    
    private User user;
     
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return List.of(new SimpleGrantedAuthority(("Role_" + user.getUserRole())));
    }

    public String getPassword(){
        return user.getPassword();
    }
    public String getUsername(){
        return user.getUsername();
    }
    public boolean isAccountNonExpired(){
        return true;
    }
    public boolean isAccountNonLocked(){
        return true;
    }
    public boolean isCredentialsNonExpired(){
        return true;
    }
    public boolean isEnabled() {
        return true;
    }
}
