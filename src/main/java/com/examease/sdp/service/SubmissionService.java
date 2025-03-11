package com.examease.sdp.service;

import com.examease.sdp.DTO.StudentAnswerRequest;
import com.examease.sdp.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubmissionService {
    @Autowired
    private SubmissionRepo submissionRepo;

    @Autowired
    private StudentAnswerRepo studentAnswerRepo;

    @Autowired
    private ExamRepo examRepo;

    @Autowired
    private MyUserRepo userRepo;

    @Autowired
    private QuestionRepo questionRepo;

    @Autowired
    private OptionRepo optionRepo;

    @Transactional
    public Submission submitExam(String email, Long examId, List<StudentAnswerRequest> answers, Double totalTimeSpent) {
        MyUser student = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Exam exam = examRepo.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        Submission submission = new Submission();
        submission.setStudent(student);
        submission.setExam(exam);
        submission.setSubmittedAt(LocalDateTime.now());
        submission.setTotalTimeSpent(totalTimeSpent);
        submission.setUnattemptedQuestions(exam.getTotalquestion()-answers.size());
        Submission savedSubmission = submissionRepo.save(submission);

        int correctAnswers = 0;
        int incorrectAnswers = 0;
        int totalScore = 0;

        for (StudentAnswerRequest answerRequest : answers) {
            Question question = questionRepo.findById(answerRequest.getQuestionId())
                    .orElseThrow(() -> new RuntimeException("Question not found"));

            Option selectedOption = optionRepo.findById(answerRequest.getSelectedOptionId())
                    .orElseThrow(() -> new RuntimeException("Selected option not found"));

            StudentAnswer studentAnswer = new StudentAnswer();
            studentAnswer.setSubmission(savedSubmission);
            studentAnswer.setQuestion(question);
            studentAnswer.setSelectedOption(selectedOption);
            studentAnswer.setTimeSpent(answerRequest.getTimeSpent());

            studentAnswerRepo.save(studentAnswer);

            if (selectedOption.isCorrect()) {
                correctAnswers++;
                totalScore += 4;
            } else {
                incorrectAnswers++;
                totalScore -= 1;
            }
        }

        savedSubmission.setCorrectAnswers(correctAnswers);
        savedSubmission.setIncorrectAnswers(incorrectAnswers);
        savedSubmission.setTotalScore(totalScore);
        return submissionRepo.save(savedSubmission);
    }

    public Submission getSubmissionById(Long submissionId) {
        return submissionRepo.findById(submissionId)
                .orElseThrow(() -> new RuntimeException("Submission not found"));
    }
}