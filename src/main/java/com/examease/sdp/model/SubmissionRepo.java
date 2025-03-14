package com.examease.sdp.model;

import com.examease.sdp.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubmissionRepo extends JpaRepository<Submission, Long> {
    List<Submission> findByExamId(Long examId);
    @Query("SELECT COUNT(s) + 1 FROM Submission s WHERE s.exam.id = :examId AND s.totalScore > :score")
    int findRank(@Param("examId") Long examId, @Param("score") int score);
}
