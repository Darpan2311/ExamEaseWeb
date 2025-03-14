package com.examease.sdp.DTO;

public class QuestionSummaryDTO {
    private String questionText;
    private String userResponse;
    private String correctResponse;
    private boolean isCorrect;
    private int marksAwarded;

    public QuestionSummaryDTO(String questionText, String userResponse, String correctResponse, boolean isCorrect, int marksAwarded) {
        this.questionText = questionText;
        this.userResponse = userResponse;
        this.correctResponse = correctResponse;
        this.isCorrect = isCorrect;
        this.marksAwarded = marksAwarded;
    }

    // Getters and Setters

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getUserResponse() {
        return userResponse;
    }

    public void setUserResponse(String userResponse) {
        this.userResponse = userResponse;
    }

    public String getCorrectResponse() {
        return correctResponse;
    }

    public void setCorrectResponse(String correctResponse) {
        this.correctResponse = correctResponse;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }

    public int getMarksAwarded() {
        return marksAwarded;
    }

    public void setMarksAwarded(int marksAwarded) {
        this.marksAwarded = marksAwarded;
    }
}
