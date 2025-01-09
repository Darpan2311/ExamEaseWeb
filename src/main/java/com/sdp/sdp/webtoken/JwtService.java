package com.sdp.sdp.webtoken;


import com.nimbusds.oauth2.sdk.token.BearerAccessToken;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@Service
public class JwtService {
    private static final Long VALIDITY = 60 * 60 * 1000L;
    private static final String JWT_SECRET ="800DB67DE42EFC68179140B7540BF80AB042C0253862ECD44938B7F10CC15209CD7654BEB17F5C4A968F46DE14513AE3DB8BB595E203CAD4D8E712EB9094BCFF" ;
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();

        claims.put("iss","https://secure.sdp.com");
        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now()
                        .plusMillis(VALIDITY)))
                .signWith(generateSecretKey())
                .compact();

    }
    private SecretKey generateSecretKey() {

        byte[] DecodedKey =Base64.getEncoder().encode(JWT_SECRET.getBytes());
        return Keys.hmacShaKeyFor(DecodedKey);
    }

    public String extractUsername(String jwt) {

        Claims claims = getClaims(jwt);
        return claims.getSubject();

    }

    private Claims getClaims(String jwt) {
        return Jwts.parser().verifyWith(generateSecretKey()).build().parseSignedClaims(jwt)
                .getPayload();
    }

    public boolean isTokenValid(String jwt) {
        Claims claims = getClaims(jwt);
        return claims.getExpiration().after(Date.from(Instant.now()));
    }
}
