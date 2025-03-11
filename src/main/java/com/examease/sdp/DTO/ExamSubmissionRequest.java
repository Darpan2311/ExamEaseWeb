package com.examease.sdp.DTO;

import java.util.List;

public class ExamSubmissionRequest {
    private List<StudentAnswerRequest> answers;
    private Double totalTimeSpent;
    public List<StudentAnswerRequest> getAnswers() { return answers; }
    public void setAnswers(List<StudentAnswerRequest> answers) { this.answers = answers; }

    public Double getTotalTimeSpent() { return totalTimeSpent; }
    public void setTotalTimeSpent(Double totalTimeSpent) { this.totalTimeSpent = totalTimeSpent; }
}

