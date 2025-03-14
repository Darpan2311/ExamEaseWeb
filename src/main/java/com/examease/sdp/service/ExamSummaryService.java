package com.examease.sdp.service;

import com.examease.sdp.DTO.ExamSummaryDTO;
import com.examease.sdp.DTO.QuestionSummaryDTO;
import com.examease.sdp.model.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExamSummaryService {

    @Autowired
    private SubmissionRepo submissionRepo;

    public ExamSummaryDTO getExamSummary(Long submissionId) {
        Submission submission = submissionRepo.findById(submissionId)
                .orElseThrow(() -> new RuntimeException("Submission not found"));

        List<QuestionSummaryDTO> questionSummaries = submission.getAnswers().stream().map(answer -> {
            Question question = answer.getQuestion();
            Option selectedOption = answer.getSelectedOption();
            Option correctOption = question.getCorrectOption();
            boolean isCorrect = correctOption.getId().equals(selectedOption.getId());
            int marksAwarded = isCorrect ? 4 : -1; // Assuming +4 for correct, -1 for incorrect.

            return new QuestionSummaryDTO(
                    question.getText(),
                    selectedOption.getText(),
                    correctOption.getText(),
                    isCorrect,
                    marksAwarded
            );
        }).collect(Collectors.toList());

        return new ExamSummaryDTO(
                submission.getTotalScore(),
                submission.getCorrectAnswers(),
                submission.getIncorrectAnswers(),
                submission.getTotalTimeSpent(),
                questionSummaries
        );
    }
}
