package com.examease.sdp.controller;

import com.examease.sdp.model.Exam;
import com.examease.sdp.service.ExamService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@CrossOrigin(origins = "http://localhost:5173")
public class ExamController {

    private final ExamService examService;

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

    @GetMapping("/get")
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }
}
