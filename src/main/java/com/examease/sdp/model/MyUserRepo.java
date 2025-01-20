package com.examease.sdp.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MyUserRepo extends JpaRepository<MyUser, Long> {

    Optional<MyUser> findByEmail(String email);  // Changed from findByUsername to findByEmail
    Optional<MyUser> findByVerificationToken(String email);
}
