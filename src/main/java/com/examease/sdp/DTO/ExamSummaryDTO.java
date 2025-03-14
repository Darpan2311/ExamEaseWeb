package com.examease.sdp.DTO;

import java.util.List;

public class ExamSummaryDTO {
    private int obtainedMarks;
    private int totalMarks;
    private List<QuestionSummaryDTO> questions;

    public ExamSummaryDTO(int obtainedMarks, int totalMarks, int incorrectAnswers, Double totalTimeSpent, List<QuestionSummaryDTO> questions) {
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

    public List<QuestionSummaryDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionSummaryDTO> questions) {
        this.questions = questions;
    }
}
