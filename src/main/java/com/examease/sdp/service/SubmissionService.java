package com.examease.sdp.service;

import com.examease.sdp.DTO.ActivityDayDTO;
import com.examease.sdp.DTO.ExamSubmissionCountDTO;
import com.examease.sdp.DTO.StudentAnswerRequest;
import com.examease.sdp.DTO.SubmissionDTO;
import com.examease.sdp.model.*;
import com.examease.sdp.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    public int getRank(Long submissionId) {
        Submission submission = getSubmissionById(submissionId);
        return submissionRepo.findRank(submission.getExam().getId(), submission.getTotalScore());
    }

    public List<SubmissionDTO> getSubmissionsByUser(Long userId) {
        List<Submission> submissions = submissionRepo.findBystudent_id(userId);

        return submissions.stream().map(sub -> new SubmissionDTO(
                sub.getId(),
                sub.getExam().getName(),
                sub.getExam().getId(),
                sub.getSubmittedAt(),
                sub.getTotalQuestions()
        )).collect(Collectors.toList());
    }

    public List<ActivityDayDTO> getActivityLast90Days(Long userId) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(89);

        List<Submission> submissions = submissionRepo.findBystudent_idAndSubmittedAtBetween(
                userId,
                startDate.atStartOfDay(),
                endDate.atTime(LocalTime.MAX)
        );

        Map<LocalDate, Long> counts = submissions.stream()
                .collect(Collectors.groupingBy(
                        s -> s.getSubmittedAt().toLocalDate(),
                        Collectors.counting()
                ));

        List<ActivityDayDTO> result = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            long count = counts.getOrDefault(date, 0L);
            result.add(new ActivityDayDTO(date.toString(), (int) count));
        }

        return result;
    }

    public List<ExamSubmissionCountDTO> getTeacherExamActivity(String author) {
        return submissionRepo.countSubmissionsByExamAuthor(author);
    }


}