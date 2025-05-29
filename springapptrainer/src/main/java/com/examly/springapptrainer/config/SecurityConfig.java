import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.crypto.spec.SecretKeySpec; // Standard for Spring Boot 2.x; for Spring Boot 3.x, jakarta.crypto is common.

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity; // Important: Enables @PreAuthorize
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity // This annotation is crucial for @PreAuthorize to work
public class SecurityConfig {

    @Value("${jwt.secret.key}")
    private String secretKey;

    @Bean
    public JwtDecoder jwtDecoder() {
        byte[] secretBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        SecretKeySpec secretKeySpec = new SecretKeySpec(secretBytes, "HmacSHA256");
        return NimbusJwtDecoder.withSecretKey(secretKeySpec).build();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless REST APIs using JWT
                .authorizeHttpRequests(auth -> auth
                        // This rule ensures all requests must be authenticated.
                        // The fine-grained role-based access control is handled by @PreAuthorize
                        // annotations directly on your controller methods.
                        .anyRequest().authenticated())
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt
                                .jwtAuthenticationConverter(jwtAuthenticationConverter())));

        return http.build();
    }

    // This method configures how JWT claims are converted into Spring Security GrantedAuthorities.
    // It's essential for @PreAuthorize's 'hasRole' or 'hasAuthority' checks.
    private JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(jwt -> {
            // Assume the JWT has a 'roles' claim, which is a list of maps
            // e.g., [{"authority": "Manager"}, {"authority": "Coordinator"}]
            List<Map<String, String>> rolesList = jwt.getClaim("roles");

            if (rolesList == null) {
                return List.of(); // Return an empty list if no roles claim is present
            }

            // Map the roles from the JWT claim to Spring Security's SimpleGrantedAuthority objects.
            // Spring Security typically expects roles to be prefixed with "ROLE_", and often uppercase.
            return rolesList.stream()
                    .map(roleMap -> "ROLE_" + roleMap.get("authority").toUpperCase())
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
        });
        return converter;
    }
}