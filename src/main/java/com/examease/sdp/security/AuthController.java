package com.examease.sdp.security;

import com.examease.sdp.DTO.LoginRequest;
import com.examease.sdp.model.MyUser;
import com.examease.sdp.model.MyUserDetailService;
import com.examease.sdp.model.MyUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private final MyUserRepo myUserRepo;
    @Autowired
    private final JwtService jwtService;
    @Autowired
    private final AuthenticationManager authenticationManager;
    @Autowired
    private final MyUserDetailService myUserDetailService; // Use the custom UserDetailsService
    @Autowired
    private PasswordEncoder passwordEncoder;
    public AuthController(MyUserRepo myUserRepo, JwtService jwtService, AuthenticationManager authenticationManager,
                          PasswordEncoder passwordEncoder, MyUserDetailService myUserDetailService) {
        this.myUserRepo = myUserRepo;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.myUserDetailService = myUserDetailService;
    }

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

        return ResponseEntity.ok(token);
    }

}
