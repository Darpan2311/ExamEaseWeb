package com.examease.sdp.model;

import com.examease.sdp.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionRepo extends JpaRepository<Submission, Long> {
    List<Submission> findByExamId(Long examId);
}
