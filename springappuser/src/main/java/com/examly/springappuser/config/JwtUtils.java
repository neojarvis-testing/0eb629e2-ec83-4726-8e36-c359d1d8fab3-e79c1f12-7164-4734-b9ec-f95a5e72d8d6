package com.examly.springappuser.config;

import java.util.Date;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtils {
    private final String SECRET_KEY = "secret";

    public String  extraUsername(String token){
        return getClaims(token).getSubject();

    }

    public boolean validateToken(String token, UserDetails userDetails){
        String username = extraUsername(token);
        return username.equals(userDetails.getUsername());

    }

    private Claims getClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public String generateToken(UserDetails userDetails) {
         return Jwts.builder().setSubject(userDetails.getUsername())
         .setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis()+ 86400000))
         .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }
}
