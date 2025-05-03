package com.examease.sdp.repo;

import com.examease.sdp.model.StudentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentAnswerRepo extends JpaRepository<StudentAnswer, Long> {
}