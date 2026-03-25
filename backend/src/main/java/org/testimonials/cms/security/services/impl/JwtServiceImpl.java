package org.testimonials.cms.security.services.impl;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JOSEObjectType;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.ECDSASigner;
import com.nimbusds.jose.crypto.ECDSAVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.testimonials.cms.security.exception.SecurityInvalidJwtException;
import org.testimonials.cms.security.services.IJwtService;

import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.interfaces.ECPrivateKey;
import java.security.interfaces.ECPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class JwtServiceImpl implements IJwtService {

    @Value("${spring.application.name}")
    private String jwtIssuer;
    @Value("${jwt.key.signer.private}")
    private String privateSignerKeyBase64;
    @Value("${jwt.key.signer.public}")
    private String publicSignerKeyBase64;
    @Value("${jwt.token.expiration-in-minutes}")
    private Long expirationInMinutes;

    private ECPublicKey ecSignerPublicKey;
    private ECPrivateKey ecSignerPrivateKey;

    @PostConstruct
    public void init() throws NoSuchAlgorithmException, InvalidKeySpecException {
        validateBase64(privateSignerKeyBase64, "Private Signer Key Base64");
        validateBase64(publicSignerKeyBase64, "Public Signer Key Base64");
        this.ecSignerPublicKey = getEcPublicKey(publicSignerKeyBase64);
        this.ecSignerPrivateKey = getEcPrivateKey(privateSignerKeyBase64);
    }

    @Override
    public String extractJwtTokenFromRequest(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }

    @Override
    public List<String> extractRolesFromJwt(String token) throws ParseException, JOSEException {
        SignedJWT signedJWT = parseAndValidate(token);

        JWTClaimsSet claims = signedJWT.getJWTClaimsSet();
        Object rolesClaim = claims.getClaim("roles");
        if (rolesClaim == null) {
            return List.of();
        }
        if (rolesClaim instanceof List<?>) {
            return ((List<?>) rolesClaim)
                    .stream()
                    .map(Object::toString)
                    .toList();
        }
        return List.of();
    }

    @Override
    public boolean isValidJwt(String token) {
        try {
            SignedJWT signedJWT = parseAndValidate(token);

            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();

            String username = claims.getSubject();
            if (username == null || username.isEmpty()) {
                return false;
            }

            Date expirationTime = claims.getExpirationTime();
            if (expirationTime == null || expirationTime.before(new Date())) {
                return false;
            }

            if (!jwtIssuer.equals(claims.getIssuer())) {
                return false;
            }

            Date now = new Date();
            Date iat = claims.getIssueTime();
            return iat != null && !iat.after(now);

        } catch (ParseException | JOSEException _) {
            return false;
        }
    }

    @Override
    public String generateJwt(Map<String, Object> claims, String subject) throws JOSEException {
        Instant now = Instant.now();
        Instant expiration = now.plus(expirationInMinutes, ChronoUnit.MINUTES);

        JWTClaimsSet.Builder claimsBuilder = new JWTClaimsSet.Builder()
                .subject(subject)
                .issuer(jwtIssuer)
                .issueTime(Date.from(now))
                .expirationTime(Date.from(expiration));
        if (claims != null) {
            claims.forEach(claimsBuilder::claim);
        }

        JWTClaimsSet claimsSet = claimsBuilder.build();

        SignedJWT signedJWT = new SignedJWT(
                new JWSHeader.Builder(JWSAlgorithm.ES256)
                        .type(JOSEObjectType.JWT)
                        .build(),
                claimsSet
        );

        signedJWT.sign(new ECDSASigner(ecSignerPrivateKey));

        return signedJWT.serialize();
    }

    private void validateBase64(String base64, String keyName) {
        if (base64 == null || base64.isEmpty()) {
            throw new IllegalArgumentException(keyName + " cannot be null or empty");
        }
        try {
            Base64.getDecoder().decode(base64);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid Base64 encoding for " + keyName, e);
        }
    }

    private ECPrivateKey getEcPrivateKey(String base64PrivateKey) throws NoSuchAlgorithmException, InvalidKeySpecException {
        byte[] keyBytes = getKeyBytes(base64PrivateKey);
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("EC");
        PrivateKey privateKey = keyFactory.generatePrivate(keySpec);
        return (ECPrivateKey) privateKey;
    }

    private ECPublicKey getEcPublicKey(String base64PublicKey) throws NoSuchAlgorithmException, InvalidKeySpecException {
        byte[] keyBytes = getKeyBytes(base64PublicKey);
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("EC");
        PublicKey publicKey = keyFactory.generatePublic(keySpec);
        return (ECPublicKey) publicKey;
    }

    private byte[] getKeyBytes(String base64EncodedPem) {
        String pem = new String(Base64.getDecoder().decode(base64EncodedPem));
        pem = pem.replaceAll("-----BEGIN [A-Z ]+-----", "")
                .replaceAll("-----END [A-Z ]+-----", "")
                .replaceAll("\\s+", "");
        return Base64.getDecoder().decode(pem);
    }

    private SignedJWT parseAndValidate(String token) throws ParseException, JOSEException {
        SignedJWT signedJWT = SignedJWT.parse(token);

        if (!signedJWT.verify(new ECDSAVerifier(ecSignerPublicKey))) {
            throw new SecurityInvalidJwtException("Invalid JWT signature");
        }
        return signedJWT;
    }

    public Optional<JWTClaimsSet> getValidClaims(String token) {
        try {
            SignedJWT signedJWT = parseAndValidate(token);
            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();

            String username = claims.getSubject();
            if (username == null || username.isEmpty()) {
                return Optional.empty();
            }

            Date now = new Date();

            if (claims.getExpirationTime() == null ||
                    claims.getExpirationTime().before(now)) {
                return Optional.empty();
            }

            if (!jwtIssuer.equals(claims.getIssuer())) {
                return Optional.empty();
            }

            Date iat = claims.getIssueTime();
            if (iat == null || iat.after(now)) {
                return Optional.empty();
            }
            Date notBefore = claims.getNotBeforeTime();
            if (notBefore != null && notBefore.after(now)) {
                return Optional.empty();
            }

            return Optional.of(claims);

        } catch (Exception _) {
            return Optional.empty();
        }
    }

}
