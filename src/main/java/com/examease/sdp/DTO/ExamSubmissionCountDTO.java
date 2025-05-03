package com.examease.sdp.DTO;

public class ExamSubmissionCountDTO {
    private String examName;
    private Long submissionCount;

    public ExamSubmissionCountDTO(String examName, Long submissionCount) {
        this.examName = examName;
        this.submissionCount = submissionCount;
    }

    public String getExamName() {
        return examName;
    }

    public void setExamName(String examName) {
        this.examName = examName;
    }

    public Long getSubmissionCount() {
        return submissionCount;
    }

    public void setSubmissionCount(Long submissionCount) {
        this.submissionCount = submissionCount;
    }
// Getters and setters
}
