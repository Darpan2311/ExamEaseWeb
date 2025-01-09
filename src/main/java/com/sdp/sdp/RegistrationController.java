package com.sdp.sdp;

import com.sdp.sdp.model.MyUser;
import com.sdp.sdp.model.MyUserRepo;
import jakarta.persistence.Access;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
    public MyUser createUser(@RequestBody MyUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return myUserRepo.save(user);
    }

}