package com.examease.sdp.security;

import com.examease.sdp.model.MyUser;
import com.examease.sdp.model.MyUserDetailService;
import com.examease.sdp.model.MyUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth/google")
public class GoogleAuthController {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("${app.redirect-uri}")
    private String redirectUri;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private MyUserDetailService myUserDetailService;

    @Autowired
    private MyUserRepo userRepo;

    @PostMapping("/callback")
    public ResponseEntity<?> handleGoogleCallback(@RequestBody Map<String, Object> body) {
        String code = (String) body.get("code");
        String username = (String) body.get("username");
        String password = (String) body.get("password");

        Object rolesObject = body.get("roles");
        List<String> roles;

        // Ensure roles is always treated as a list
        if (rolesObject instanceof String) {
            roles = Arrays.asList(((String) rolesObject).split(","));
        } else if (rolesObject instanceof List) {
            roles = ((List<?>) rolesObject).stream().map(Object::toString).collect(Collectors.toList());
        } else {
            roles = null;
        }

        if (code == null || code.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing or invalid authorization code."));
        }

        RestTemplate restTemplate = new RestTemplate();

        try {
            // Step 1: Exchange authorization code for access token
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
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    tokenEndpoint, HttpMethod.POST, request, new ParameterizedTypeReference<>() {}
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                String accessToken = (String) response.getBody().get("access_token");

                // Step 2: Fetch user info from Google
                String userInfoEndpoint = "https://www.googleapis.com/oauth2/v2/userinfo";
                HttpHeaders userHeaders = new HttpHeaders();
                userHeaders.setBearerAuth(accessToken);
                HttpEntity<?> userRequest = new HttpEntity<>(userHeaders);

                ResponseEntity<Map<String, Object>> userResponse = restTemplate.exchange(
                        userInfoEndpoint, HttpMethod.GET, userRequest, new ParameterizedTypeReference<>() {}
                );

                if (userResponse.getStatusCode() == HttpStatus.OK && userResponse.getBody() != null) {
                    String email = (String) userResponse.getBody().get("email");

                    Optional<MyUser> existingUser = userRepo.findByEmail(email);

                    MyUser user;
                    if (existingUser.isPresent()) {
                        user = existingUser.get();
                    } else {
                        // Validate that required fields are present
                        if (username == null || password == null || roles == null || roles.isEmpty()) {
                            return ResponseEntity.badRequest()
                                    .body(Map.of("error", "Please provide username, password, and at least one role."));
                        }

                        // Step 3: Create new user
                        user = new MyUser();
                        user.setEmail(email);
                        user.setUsername(username);
                        user.setPassword(passwordEncoder.encode(password));

                        // Store roles as a comma-separated string
                        String roleString = String.join(",", roles);
                        user.setRole(roleString);

                        userRepo.save(user);
                    }

                    // Generate JWT Token
                    UserDetails userDetails = myUserDetailService.loadUserByUsername(email);
                    String token = jwtService.generateToken(userDetails);
                    return ResponseEntity.ok(Map.of("token", token));
                }
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Failed to fetch user info."));
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Failed to authenticate with Google."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Authentication error", "message", e.getMessage()));
        }
    }
}
