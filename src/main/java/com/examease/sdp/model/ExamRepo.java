package com.examease.sdp.model;

import com.examease.sdp.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepo extends JpaRepository<Exam, Long> {
}
