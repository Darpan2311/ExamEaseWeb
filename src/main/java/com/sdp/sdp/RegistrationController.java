package com.sdp.sdp;

import com.sdp.sdp.model.MyUser;
import com.sdp.sdp.model.MyUserRepo;
import jakarta.persistence.Access;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
public class RegistrationController {

    final
    MyUserRepo myUserRepo;
    private final PasswordEncoder passwordEncoder;

    public RegistrationController(MyUserRepo myUserRepo, PasswordEncoder passwordEncoder) {
        this.myUserRepo = myUserRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register/user")
    public String createUser(@ModelAttribute MyUser user,
                             @RequestParam("confirmPassword") String confirmPassword,
                             Model model) {

        // Password confirmation check
        if (!user.getPassword().equals(confirmPassword)) {
            model.addAttribute("error", "Passwords do not match!");
            return "registration";  // Return to the registration page if passwords don't match
        }

        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the user to the database
        myUserRepo.save(user);

        return "/login";  // Redirect to the login page after successful registration
    }


}