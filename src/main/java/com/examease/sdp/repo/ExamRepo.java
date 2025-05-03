package com.examease.sdp.repo;

import com.examease.sdp.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamRepo extends JpaRepository<Exam, Long> {
    List<Exam> findAllByAuthor(String Author);
}
