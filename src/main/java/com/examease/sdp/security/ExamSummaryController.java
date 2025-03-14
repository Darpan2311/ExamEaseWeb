package com.examease.sdp.security;

import com.examease.sdp.DTO.ExamSummaryDTO;
import com.examease.sdp.service.ExamSummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/exam-summary")
public class ExamSummaryController {

    @Autowired
    private ExamSummaryService examSummaryService;

    @GetMapping("/{submissionId}")
    public ResponseEntity<ExamSummaryDTO> getExamSummary(@PathVariable Long submissionId) {
        ExamSummaryDTO summary = examSummaryService.getExamSummary(submissionId);
        return ResponseEntity.ok(summary);
    }
}
