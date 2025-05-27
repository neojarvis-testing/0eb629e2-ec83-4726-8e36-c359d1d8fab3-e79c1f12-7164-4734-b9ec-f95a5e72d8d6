package com.examly.springappuser.config;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private JwtUtils jwtUtils;
    private MyUserDetailsService userDetailsService;
    @Autowired
    public JwtAuthenticationFilter(JwtUtils jwtUtils, MyUserDetailsService userDetailsService){
        this.jwtUtils=jwtUtils;
        this.userDetailsService=userDetailsService;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String path = request.getRequestURI();
        if(path.equals("/api/login")||path.equals("/api/register")){
            filterChain.doFilter(request,response);
            return;
        }
        final String header = request.getHeader("Authorization");
        String username = null;
        String jwtToken = null;
        if (header != null && header.startsWith("Bearer ")) {
            jwtToken = header.substring(7);
        }
        // final String token = header.substring(7);
        // final String username = jwtUtils.extractUsername(token);
        try{
            username = jwtUtils.extractUsername(jwtToken);
        }
        catch(Exception e){
            logger.error("JWT token extraction failed: "+ e.getMessage());
        }
        if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null){
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if(jwtUtils.validateToken(jwtToken)){
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request,response);
    }

}
