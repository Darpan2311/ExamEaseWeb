package com.examease.sdp.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
