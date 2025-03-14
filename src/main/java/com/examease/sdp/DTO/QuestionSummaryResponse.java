package com.examease.sdp.DTO;




public class QuestionSummaryResponse {
    private String questionText;
    private String userResponse;
    private String correctResponse;
    private boolean isCorrect;
    private int marksAwarded;
    private String topperResponse;
    private double topperTimeTaken;
    private double userTimeTaken; // ✅ New field for user's time spent

    public QuestionSummaryResponse(String questionText, String userResponse, String correctResponse,
                                   boolean isCorrect, int marksAwarded, String topperResponse,
                                   double topperTimeTaken, double userTimeTaken) { // ✅ Add userTimeTaken
        this.questionText = questionText;
        this.userResponse = userResponse;
        this.correctResponse = correctResponse;
        this.isCorrect = isCorrect;
        this.marksAwarded = marksAwarded;
        this.topperResponse = topperResponse;
        this.topperTimeTaken = topperTimeTaken;
        this.userTimeTaken = userTimeTaken; // ✅ Initialize the field
    }

    // ✅ Ensure there are getters for userTimeTaken

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

    public String getTopperResponse() {
        return topperResponse;
    }

    public void setTopperResponse(String topperResponse) {
        this.topperResponse = topperResponse;
    }

    public double getTopperTimeTaken() {
        return topperTimeTaken;
    }

    public void setTopperTimeTaken(double topperTimeTaken) {
        this.topperTimeTaken = topperTimeTaken;
    }

    public double getUserTimeTaken() {
        return userTimeTaken;
    }

    public void setUserTimeTaken(double userTimeTaken) {
        this.userTimeTaken = userTimeTaken;
    }
}
