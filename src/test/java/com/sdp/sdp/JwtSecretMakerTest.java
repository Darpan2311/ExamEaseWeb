package com.sdp.sdp;

import io.jsonwebtoken.Jwts;
import jakarta.xml.bind.DatatypeConverter;
import org.junit.jupiter.api.Test;

import javax.crypto.SecretKey;

public class JwtSecretMakerTest {
    
    @Test
    public void generateJwtSecret() {
        SecretKey key=Jwts.SIG.HS512.key().build();
        String EncodedKey=DatatypeConverter.printHexBinary(key.getEncoded());
        System.out.println(EncodedKey);
        
    }
}
