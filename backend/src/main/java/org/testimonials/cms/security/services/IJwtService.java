package org.testimonials.cms.security.services;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.JWTClaimsSet;
import jakarta.servlet.http.HttpServletRequest;

import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface IJwtService {
    String extractJwtTokenFromRequest(HttpServletRequest request);
    List<String> extractRolesFromJwt(String token) throws ParseException, JOSEException;
    boolean isValidJwt(String token);
    String generateJwt(Map<String, Object> claims, String subject) throws JOSEException;

    Optional<JWTClaimsSet> getValidClaims(String jwt);
}
