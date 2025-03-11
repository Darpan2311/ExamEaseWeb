package com.examease.sdp.DTO;

public class ExamResultResponse {
    private int totalScore;
    private int correctAnswers;
    private int incorrectAnswers;
    private Double totalTimeSpent;
    private String username;
    private int unattemptedQuestion;

    public int getUnattemptedQuestion() {
        return unattemptedQuestion;
    }

    public void setUnattemptedQustion(int unattemptedQustion) {
        this.unattemptedQuestion = unattemptedQustion;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public ExamResultResponse(int totalScore, int correctAnswers, int incorrectAnswers, Double totalTimeSpent, String username, int unattemptedQuestions) {
        this.totalScore = totalScore;
        this.correctAnswers = correctAnswers;
        this.incorrectAnswers = incorrectAnswers;
        this.totalTimeSpent = totalTimeSpent;
        this.username=username;
        this.unattemptedQuestion=unattemptedQuestions;
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
