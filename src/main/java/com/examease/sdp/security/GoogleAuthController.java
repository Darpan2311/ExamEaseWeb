package com.examease.sdp.security;

import com.examease.sdp.model.MyUser;
import com.examease.sdp.model.MyUserDetailService;
import com.examease.sdp.model.MyUserRepo;
import com.nimbusds.oauth2.sdk.util.MultivaluedMapUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.Map;
import java.util.UUID;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth/google")
public class GoogleAuthController {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("${app.redirect-uri}")
    private String redirectUri; // It's better to externalize the redirect URI into properties
    @Autowired
    private JwtService jwtService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private MyUserDetailService myUserDetailService;
    @Autowired
    private MyUserRepo userRepo;

    @PostMapping("/callback")
    public ResponseEntity<?> handleGoogleCallback(@RequestBody Map<String, String> body) {
        String code = body.get("code");

        if (code == null || code.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing or invalid authorization code.");
        }

        RestTemplate restTemplate = new RestTemplate();

        try {
            // Step 1: Exchange authorization code for an access token
            String tokenEndpoint = "https://oauth2.googleapis.com/token";

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("code", code);
            params.add("client_id", clientId);
            params.add("client_secret", clientSecret);
            params.add("redirect_uri", redirectUri);
            params.add("grant_type", "authorization_code");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
            ResponseEntity<Map> response = restTemplate.exchange(tokenEndpoint, HttpMethod.POST, request, Map.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> tokenResponse = response.getBody();
                if (tokenResponse == null || !tokenResponse.containsKey("access_token")) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed to retrieve access token.");
                }

                String accessToken = (String) tokenResponse.get("access_token");

                String userInfoEndpoint = "https://www.googleapis.com/oauth2/v2/userinfo";

                HttpHeaders userHeaders = new HttpHeaders();
                userHeaders.setBearerAuth(accessToken);

                HttpEntity<Void> userRequest = new HttpEntity<>(userHeaders);
                ResponseEntity<Map> userResponse = restTemplate.exchange(userInfoEndpoint, HttpMethod.GET, userRequest, Map.class);

                if (userResponse.getStatusCode() == HttpStatus.OK) {
                    Map<String, Object> userInfo = userResponse.getBody();
                    if (userInfo == null || !userInfo.containsKey("email")) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed to fetch email from Google user info.");
                    }

                    String email = (String) userInfo.get("email");

                    MyUser user = userRepo.findByEmail(email).orElse(null);
                    if (user == null) {
                        // Register new user
                        user = new MyUser();
                        user.setEmail(email);
                        user.setUsername(email);
                        user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString())); // Random password
                        user.setRole("USER");

                            userRepo.save(user);
                    }
                    else {
                        return ResponseEntity.status(HttpStatus.CONFLICT)
                                .body(Map.of("message", "User with this email already exists. Please log in."));
                    }

                    UserDetails userDetails = myUserDetailService.loadUserByUsername(email);
                    String token = jwtService.generateToken(userDetails);
                    return ResponseEntity.ok(Map.of("token", token));

                } else {
                    return ResponseEntity.status(userResponse.getStatusCode()).body("Failed to fetch user information from Google.");
                }
            } else {
                return ResponseEntity.status(response.getStatusCode()).body("Failed to authenticate with Google: " + response.getBody());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during Google authentication: " + e.getMessage());
        }
    }
}