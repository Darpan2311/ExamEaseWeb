package com.examease.sdp.model;

import com.examease.sdp.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepo extends JpaRepository<Question, Long> {
    List<Question> findByExamId(Long examId);
}
