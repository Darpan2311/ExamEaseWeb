package com.examease.sdp.controller;

import com.examease.sdp.model.Exam;
import com.examease.sdp.service.ExamService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exams")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend requests
public class ExamController {
    private final ExamService examService;

    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @PostMapping
    public Exam createExam(@RequestBody Exam exam) {
        return examService.saveExam(exam);
    }
}
