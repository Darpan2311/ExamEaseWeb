package com.examease.sdp.DTO;

import java.util.List;

public class ExamSummaryResponse {
    private int obtainedMarks;
    private int totalMarks;
    private List<QuestionSummaryResponse> questions;

    public ExamSummaryResponse(int obtainedMarks, int totalMarks, int incorrectAnswers, Double totalTimeSpent, List<QuestionSummaryResponse> questions) {
        this.obtainedMarks = obtainedMarks;
        this.totalMarks = totalMarks;
        this.questions = questions;
    }

    // Getters and Setters


    public int getObtainedMarks() {
        return obtainedMarks;
    }

    public void setObtainedMarks(int obtainedMarks) {
        this.obtainedMarks = obtainedMarks;
    }

    public int getTotalMarks() {
        return totalMarks;
    }

    public void setTotalMarks(int totalMarks) {
        this.totalMarks = totalMarks;
    }

    public List<QuestionSummaryResponse> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionSummaryResponse> questions) {
        this.questions = questions;
    }
}
