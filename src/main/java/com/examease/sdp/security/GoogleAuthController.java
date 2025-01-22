package com.examease.sdp.security;

import com.examease.sdp.model.MyUser;
import com.examease.sdp.model.MyUserDetailService;
import com.examease.sdp.model.MyUserRepo;
import com.nimbusds.oauth2.sdk.util.MultivaluedMapUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

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



    @GetMapping("/callback")
    public ResponseEntity<?> handleGoogleCallback(@RequestParam String code) {
        RestTemplate restTemplate = new RestTemplate(); // Direct instantiation

        try {
            // Step 1: Exchange authorization code for an access token
            String tokenEndpoint = "https://oauth2.googleapis.com/token";

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("code", code);
            params.add("client_id", clientId);
            params.add("client_secret", clientSecret);
            params.add("redirect_uri", redirectUri); // Use the externalized redirect URI
            params.add("grant_type", "authorization_code");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
            ResponseEntity<Map> response = restTemplate.exchange(tokenEndpoint, HttpMethod.POST, request, Map.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> tokenResponse = response.getBody();
                String accessToken = (String) tokenResponse.get("access_token");

                // Step 2: Use the access token to get user details from Google
                String userInfoEndpoint = "https://www.googleapis.com/oauth2/v2/userinfo";

                HttpHeaders userHeaders = new HttpHeaders();
                userHeaders.setBearerAuth(accessToken);

                HttpEntity<Void> userRequest = new HttpEntity<>(userHeaders);
                ResponseEntity<Map> userResponse = restTemplate.exchange(userInfoEndpoint, HttpMethod.GET, userRequest, Map.class);

                if (userResponse.getStatusCode() == HttpStatus.OK) {
                    Map<String, Object> userInfo = userResponse.getBody();
                    String email = (String) userInfo.get("email");


                       UserDetails userDetails= myUserDetailService.loadUserByUsername(email);
                    if(userDetails==null){
                        MyUser user = new MyUser();
                        user.setEmail(email);
                        user.setUsername(email);
                        user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
                        user.setRole("USER");
                        userRepo.save(user);
                        userDetails = myUserDetailService.loadUserByUsername(email);
                    }

                    String token = jwtService.generateToken(userDetails);

                    return ResponseEntity.ok(token);


                }
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed to fetch user information.");
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed to authenticate with Google.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during Google authentication.");
        }
    }
}
