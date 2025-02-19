package com.examease.sdp.model;

import com.examease.sdp.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentAnswerRepo extends JpaRepository<StudentAnswer, Long> {
}