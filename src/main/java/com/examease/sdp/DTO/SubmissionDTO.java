package com.examease.sdp.DTO;


import java.time.LocalDateTime;

public class SubmissionDTO {

    private Long id;
    private String examName;
    private Long examId;
    private LocalDateTime submittedAt;
    private int totalQuestions;

    public SubmissionDTO() {
    }

    public SubmissionDTO(Long id, String examName, Long examId, LocalDateTime submittedAt, int totalQuestions) {
        this.id = id;
        this.examName = examName;
        this.examId = examId;
        this.submittedAt = submittedAt;
        this.totalQuestions = totalQuestions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExamName() {
        return examName;
    }

    public void setExamName(String examName) {
        this.examName = examName;
    }

    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }



    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }
}
