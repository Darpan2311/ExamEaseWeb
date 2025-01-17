package com.sdp.sdp;

import com.sdp.sdp.model.MyUser;
import com.sdp.sdp.model.MyUserDetailService;
import com.sdp.sdp.webtoken.JwtService;
import com.sdp.sdp.webtoken.LoginForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class ContentController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtService jwtService;
    @Autowired
    MyUserDetailService myUserDetailService;
    @PostMapping("/home")
    public String handleWelcome() {
        return "home";
    }

    @PostMapping("/admin/home")
    public String handleAdminHome() {
        return "home_admin";
    }

    @PostMapping("/user/home")
    public String handleUserHome() {
        return "home_user";
    }

    @RequestMapping("/login")
    public String handleLogin() {
        return "customlogin";
    }
    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        // You can pass a new MyUser object to the model to bind the form fields
        model.addAttribute("user", new MyUser());
        return "registration";  // Return the view name of the registration page (registration.html)
    }
    @PostMapping("/authenticate")
    public ResponseEntity<String> AuthenticateAndGetToken(@RequestBody LoginForm form) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(form.username(), form.password())
        );
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(myUserDetailService.loadUserByUsername(form.username()));
            return ResponseEntity.ok(token); // Return the token as a response body
        } else {
            throw new UsernameNotFoundException("Invalid username or password");
        }
    }
}
