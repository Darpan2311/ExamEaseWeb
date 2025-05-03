package com.examease.sdp.repo;

import com.examease.sdp.model.Exam;
import com.examease.sdp.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ExamRepo extends JpaRepository<Exam, Long> {
    List<Exam> findAllByAuthor(String Author);

}