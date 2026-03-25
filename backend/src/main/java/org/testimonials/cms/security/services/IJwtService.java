package org.testimonials.cms.security.services;

import com.nimbusds.jose.JOSEException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.userdetails.UserDetails;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface IJwtService {
    String extractJwtTokenFromRequest(HttpServletRequest request);
    String extractUsernameFromJwt(String token);
    List<String> extractRolesFromJwt(String token) throws ParseException, JOSEException;
    boolean isValidJwt(String token, UserDetails userDetails);
    String generateJwt(Map<String, Object> claims, String subject) throws JOSEException;
}
