package com.examease.sdp.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;


    public Option getCorrectOption() {
        return correctOption;
    }

    public void setCorrectOption(Option correctOption) {
        this.correctOption = correctOption;
    }

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Option> options;

    @OneToOne
    @JoinColumn(name = "correct_option_id")
    private Option correctOption;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }



    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public List<Option> getOptions() {
        return options;
    }

    public void setOptions(List<Option> options) {
        this.options = options;
    }
}
