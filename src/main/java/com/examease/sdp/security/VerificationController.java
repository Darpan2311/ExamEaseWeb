package com.examease.sdp.security;

import com.examease.sdp.model.MyUser;
import com.examease.sdp.model.MyUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("api/auth/verify-email")
public class VerificationController {

    @Autowired
    private MyUserRepo myUserRepo;

    @GetMapping
    public String verifyEmail(@RequestParam("token") String token) {
        Optional<MyUser> userOptional = myUserRepo.findByVerificationToken(token);

        if (userOptional.isPresent()) {
            MyUser user = userOptional.get();
            user.setVerified(true);  // Set the user as verified
            user.setVerificationToken(null);  // Remove the token after verification
            myUserRepo.save(user);
            return "Email successfully verified!";
        } else {
            return "Invalid or expired verification link!";
        }
    }
}
