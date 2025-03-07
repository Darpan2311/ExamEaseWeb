package com.examease.sdp.DTO;

public class ExamResultResponse {
    private int totalScore;
    private int correctAnswers;
    private int incorrectAnswers;
    private Double totalTimeSpent;

    public ExamResultResponse(int totalScore, int correctAnswers, int incorrectAnswers, Double totalTimeSpent) {
        this.totalScore = totalScore;
        this.correctAnswers = correctAnswers;
        this.incorrectAnswers = incorrectAnswers;
        this.totalTimeSpent = totalTimeSpent;
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

    public Double getTotalTimeSpent() {
        return totalTimeSpent;
    }

    public void setTotalTimeSpent(Double totalTimeSpent) {
        this.totalTimeSpent = totalTimeSpent;
    }

}
