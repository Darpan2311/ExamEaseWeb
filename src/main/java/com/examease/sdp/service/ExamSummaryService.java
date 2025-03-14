package com.examease.sdp.service;

import com.examease.sdp.DTO.ExamSummaryResponse;
import com.examease.sdp.DTO.QuestionSummaryResponse;
import com.examease.sdp.model.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ExamSummaryService {

    @Autowired
    private SubmissionRepo submissionRepo;

    public ExamSummaryResponse getExamSummary(Long submissionId) {
        Submission submission = submissionRepo.findById(submissionId)
                .orElseThrow(() -> new RuntimeException("Submission not found"));

        Long examId = submission.getExam().getId();

        // Fetch all answers from the topper's submission
        List<StudentAnswer> topperAnswersList = submissionRepo.findTopperAnswers(examId);

        // Map topper answers for quick lookup
        Map<Long, StudentAnswer> topperAnswersMap = topperAnswersList.stream()
                .collect(Collectors.toMap(
                        a -> a.getQuestion().getId(),
                        a -> a,
                        (existing, replacement) -> existing  // Ignore duplicate answers, keep the first one
                ));

        List<QuestionSummaryResponse> questionSummaries = submission.getAnswers().stream().map(answer -> {
            Question question = answer.getQuestion();
            Option selectedOption = answer.getSelectedOption();
            Option correctOption = question.getCorrectOption();
            boolean isCorrect = selectedOption.getId().equals(correctOption.getId());
            int marksAwarded = isCorrect ? 4 : -1;

            // Retrieve the correct topper answer
            StudentAnswer topperAnswer = topperAnswersMap.get(question.getId());
            String topperResponse = (topperAnswer != null) ? topperAnswer.getSelectedOption().getText() : "N/A";
            double topperTimeTaken = (topperAnswer != null) ? topperAnswer.getTimeSpent() : 0.0;

            // ✅ Include user's time spent on the question
            double userTimeTaken = answer.getTimeSpent();

            return new QuestionSummaryResponse(
                    question.getText(),
                    selectedOption.getText(),
                    correctOption.getText(),
                    isCorrect,
                    marksAwarded,
                    topperResponse,
                    topperTimeTaken,
                    userTimeTaken // ✅ Add user time taken
            );
        }).collect(Collectors.toList());

        return new ExamSummaryResponse(
                submission.getTotalScore(),
                submission.getCorrectAnswers(),
                submission.getIncorrectAnswers(),
                submission.getTotalTimeSpent(),
                questionSummaries
        );
    }

}