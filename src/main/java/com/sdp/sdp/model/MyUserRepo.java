package com.sdp.sdp.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface MyUserRepo extends JpaRepository<MyUser, Long> {

    public Optional<MyUser> findByUsername(String username);


}
