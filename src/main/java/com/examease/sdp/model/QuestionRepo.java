package com.examease.sdp.model;

import com.examease.sdp.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepo extends JpaRepository<Question, Long> {
}
