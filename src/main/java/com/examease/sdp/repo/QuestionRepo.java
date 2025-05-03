package com.examease.sdp.repo;

import com.examease.sdp.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepo extends JpaRepository<Question, Long> {
    List<Question> findByExamId(Long examId);
}
