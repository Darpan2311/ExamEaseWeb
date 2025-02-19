    package com.examease.sdp.DTO;

    public class StudentAnswerRequest {
        private Long questionId;
        private Long selectedOptionId;
        private Double timeSpent; // In seconds

        // Getters and setters
        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long questionId) { this.questionId = questionId; }

        public Long getSelectedOptionId() { return selectedOptionId; }
        public void setSelectedOptionId(Long selectedOptionId) { this.selectedOptionId = selectedOptionId; }

        public Double getTimeSpent() { return timeSpent; }
        public void setTimeSpent(Double timeSpent) { this.timeSpent = timeSpent; }
    }
