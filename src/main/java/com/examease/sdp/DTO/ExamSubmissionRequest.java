package com.examease.sdp.DTO;

import java.util.List;

public class ExamSubmissionRequest {
    private List<StudentAnswerRequest> answers;

    // Getters and setters
    public List<StudentAnswerRequest> getAnswers() {
        return answers;
    }

    public void setAnswers(List<StudentAnswerRequest> answers) {
        this.answers = answers;
    }
}
