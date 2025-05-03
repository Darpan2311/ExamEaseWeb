    package com.examease.sdp.controller;

    import com.examease.sdp.DTO.LoginRequest;
    import com.examease.sdp.model.MyUser;
    import com.examease.sdp.model.MyUserDetailService;
    import com.examease.sdp.repo.MyUserRepo;
    import com.examease.sdp.service.JwtService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.http.*;
    import org.springframework.security.authentication.AuthenticationManager;
    import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
    import org.springframework.security.core.GrantedAuthority;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.util.LinkedMultiValueMap;
    import org.springframework.util.MultiValueMap;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.web.client.RestTemplate;

    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;
    import java.util.Optional;
    import java.util.stream.Collectors;

    @CrossOrigin(origins = "http://localhost:5173")
    @RestController
    @RequestMapping("/api/auth")
    public class AuthController {

        @Autowired
        private MyUserRepo myUserRepo;
        @Autowired
        private JwtService jwtService;
        @Autowired
        private AuthenticationManager authenticationManager;
        @Autowired
        private MyUserDetailService myUserDetailService; // Use the custom UserDetailsService
        @Autowired
        private PasswordEncoder passwordEncoder;

        @Value("${spring.security.oauth2.client.registration.google.client-id}")
        private String clientId;

        @Value("${spring.security.oauth2.client.registration.google.client-secret}")
        private String clientSecret;

        @Value("${app.redirect-uri2}")
        private String redirectUri;

        @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody LoginRequest request) {
            Optional<MyUser> optionalUser = myUserRepo.findByEmail(request.getEmail());

            if (optionalUser.isEmpty() || !passwordEncoder.matches(request.getPassword(), optionalUser.get().getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
            // Authenticate using the provided credentials
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            // Get UserDetails using the custom service
            UserDetails userDetails = myUserDetailService.loadUserByUsername(request.getEmail());

            // Generate the JWT token
            String token = jwtService.generateToken(userDetails);
            List<String> roles = userDetails.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
            Map<String, Object> res = new HashMap<>();
            res.put("token", token);
            res.put("roles", roles);
            return ResponseEntity.ok(res);
        }

        @PostMapping("/google/login")
        public ResponseEntity<?> loginWithGoogle(@RequestBody Map<String, String> body) {
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

                    // Step 2: Fetch user info from Google
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

                        MyUser user = myUserRepo.findByEmail(email).orElse(null);
                        if (user == null) {
                            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No account found. Please register first.");
                        }

                        // Generate a JWT for the logged-in user
                        UserDetails userDetails = myUserDetailService.loadUserByUsername(email);
                        String token = jwtService.generateToken(userDetails);
                        List<String> roles = userDetails.getAuthorities()
                                .stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList());
                        Map<String, Object> res = new HashMap<>();
                        res.put("token", token);
                        res.put("roles", roles);

                        return ResponseEntity.ok(res);
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
