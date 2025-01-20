package com.examease.sdp.security;

import com.examease.sdp.DTO.RegisterRequest;
import com.examease.sdp.model.MyUser;
import com.examease.sdp.model.MyUserRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")  // Adjust as needed
public class RegisterController {

    private final MyUserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public RegisterController(MyUserRepo userRepo, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody RegisterRequest request) {
        if (userRepo.findByEmail(request.getEmail()).isPresent()) {
            return "User already exists!";
        }

        MyUser user = new MyUser();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));  // Encrypt password
        user.setRole(request.getRole());

        // Generate a verification token and set it to the user
        String verificationToken = UUID.randomUUID().toString();
        user.setVerificationToken(verificationToken);

        // Save user (without verifying)
        userRepo.save(user);

        // Send email with the verification link
        emailService.sendVerificationEmail(user.getEmail(), verificationToken);

        return "User registered successfully! Please check your email to verify your account.";
    }
}
