package com.examease.sdp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private MyUser student;

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @OneToMany(mappedBy = "submission", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentAnswer> answers;
    private int unattemptedQuestions;
    private LocalDateTime submittedAt;
    private Double totalTimeSpent;
    private int totalScore;
    private int correctAnswers;
    private int incorrectAnswers;

    public int getUnattemptedQuestions() {
        return unattemptedQuestions;
    }

    public void setUnattemptedQuestions(int unattemptedQuestions) {
        this.unattemptedQuestions = unattemptedQuestions;
    }

    public int getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(int totalScore) {
        this.totalScore = totalScore;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(int correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public int getIncorrectAnswers() {
        return incorrectAnswers;
    }

    public void setIncorrectAnswers(int incorrectAnswers) {
        this.incorrectAnswers = incorrectAnswers;
    }

    public Double getTotalTimeSpent() { return totalTimeSpent; }
    public void setTotalTimeSpent(Double totalTimeSpent) { this.totalTimeSpent = totalTimeSpent; }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MyUser getStudent() {
        return student;
    }

    public void setStudent(MyUser student) {
        this.student = student;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public List<StudentAnswer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<StudentAnswer> answers) {
        this.answers = answers;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public int getTotalQuestions() {
        return this.unattemptedQuestions+this.correctAnswers+this.incorrectAnswers;
    }
}
