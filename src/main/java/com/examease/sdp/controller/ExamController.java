package com.examease.sdp.controller;

import com.examease.sdp.DTO.ActivityDayDTO;
import com.examease.sdp.DTO.ExamResultResponse;
import com.examease.sdp.DTO.ExamSubmissionRequest;
import com.examease.sdp.DTO.SubmissionDTO;
import com.examease.sdp.model.*;
import com.examease.sdp.service.ExamService;
import com.examease.sdp.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/exams")
@CrossOrigin(origins = "http://localhost:5173")
public class ExamController {

    private final ExamService examService;
    @Autowired
    private SubmissionService submissionService;
    @Autowired
    private SubmissionRepo submissionRepo;
    @Autowired
    private MyUserDetailService myUserDetailService;

    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @PostMapping("/create")
    public Exam createExam(@RequestBody Exam exam, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            exam.setAuthor(userDetails.getUsername()); // ✅ Set the author from JWT
        } else {
            throw new RuntimeException("User not authenticated");
        }

        return examService.saveExam(exam);
    }

    @GetMapping("/{id}")
    public Exam getExamById(@PathVariable Long id) {
        return examService.getExamById(id);
    }

    @GetMapping("/{examId}/questions")
    public List<Question> getQuestions(@PathVariable Long examId) {
        return examService.getQuestionsByExamId(examId);
    }

    @GetMapping("/get")
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }
    @PostMapping("/{examId}/submit")
    public ResponseEntity<?> submitExam(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long examId,
            @RequestBody ExamSubmissionRequest request) {

        Submission submission = submissionService.submitExam(
                userDetails.getUsername(), examId, request.getAnswers(), request.getTotalTimeSpent());

        return ResponseEntity.ok(submission);
    }
    @GetMapping("/{submissionId}/result")
    public ResponseEntity<ExamResultResponse> getExamResult(@PathVariable Long submissionId) {
        Submission submission = submissionService.getSubmissionById(submissionId);
        int rank = submissionService.getRank(submissionId);
        ExamResultResponse response = new ExamResultResponse(
                submission.getTotalScore(),
                submission.getCorrectAnswers(),
                submission.getIncorrectAnswers(),
                submission.getTotalTimeSpent(),
                submission.getStudent().getUsername(),
                submission.getUnattemptedQuestions(),
                rank
        );
        return ResponseEntity.ok(response);
    }
    @GetMapping("/{examId}/scores")
    public ResponseEntity<List<Map<String, Object>>> getExamScores(@PathVariable Long examId) {
        List<Submission> submissions = submissionRepo.findByExamId(examId);

        List<Map<String, Object>> result = submissions.stream().map(submission -> {
            Map<String, Object> scoreData = new HashMap<>();
            scoreData.put("submissionId", submission.getId());  // Use submission ID
            scoreData.put("totalScore", submission.getTotalScore());
            return scoreData;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }
    @GetMapping("/{submissionId}/score-distribution")
    public ResponseEntity<Map<String, Integer>> getExamScoreDistribution(@PathVariable Long submissionId) {
        // Fetch submission and ensure it exists
        Submission submission = submissionRepo.findById(submissionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Submission not found"));

        Long examId = submission.getExam().getId();
        List<Submission> submissions = submissionRepo.findByExamId(examId);

        // Initialize bins for score ranges (0-10%, 10-20%, ..., 90-100%)
        Map<String, Integer> scoreDistribution = new LinkedHashMap<>();
        for (int i = 0; i < 10; i++) {
            scoreDistribution.put(i * 10 + "-" + (i + 1) * 10 + "%", 0);
        }

        for (Submission sub : submissions) {
            int totalQuestions = sub.getTotalQuestions();
            if (totalQuestions == 0) continue; // Skip invalid data

            int totalMarks = totalQuestions * 4;
            int scorePercentage = (int) Math.round((sub.getTotalScore() / (double) totalMarks) * 100);

            int index = Math.min(scorePercentage / 10, 9); // Ensure max index is 9 (90-100%)
            String key = (index * 10) + "-" + ((index + 1) * 10) + "%";

            scoreDistribution.put(key, scoreDistribution.getOrDefault(key, 0) + 1);
        }

        return ResponseEntity.ok(scoreDistribution);
    }
    @GetMapping("/submissions/my")
    public List<SubmissionDTO> getMySubmissions(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();  // Extract email from authenticated user
        Long userId = myUserDetailService.getUserId(email);  // Fetch the user ID using the service

        if (userId != null) {
            return submissionService.getSubmissionsByUser(userId);  // Fetch submissions by user ID
        } else {
            throw new RuntimeException("User not found");
        }
    }
    @GetMapping("/submissions/my/activity")
    public List<ActivityDayDTO> getMyActivity(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        Long userId = myUserDetailService.getUserId(email);

        if (userId != null) {
            return submissionService.getActivityLast90Days(userId);
        } else {
            throw new RuntimeException("User not found");
        }
    }
}
