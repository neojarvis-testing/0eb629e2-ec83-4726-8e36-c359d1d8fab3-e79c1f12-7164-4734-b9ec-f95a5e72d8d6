package com.examly.springappuser.config;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.examly.springappuser.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserPrinciple implements UserDetails {

    private static final long serialVersionUID = 1L;

    private int userId;

    private String username;

    private String email;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

  public UserPrinciple(int userId, String username, String email, String password,
      Collection<? extends GrantedAuthority> authorities) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.authorities = authorities;
  }

    public static UserPrinciple build(User user) {
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(user.getUserRole()));
               
        return new UserPrinciple(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public int getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserPrinciple user = (UserPrinciple) o;
        return Objects.equals(userId, user.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId);
    }

}
