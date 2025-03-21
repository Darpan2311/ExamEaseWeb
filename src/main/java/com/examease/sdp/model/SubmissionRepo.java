package com.examease.sdp.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SubmissionRepo extends JpaRepository<Submission, Long> {

    List<Submission> findByExamId(Long examId);

    @Query("SELECT COUNT(s) + 1 FROM Submission s WHERE s.exam.id = :examId AND s.totalScore > :score")
    int findRank(@Param("examId") Long examId, @Param("score") int score);
    @Query("SELECT sa FROM StudentAnswer sa " +
            "JOIN sa.submission s " +
            "WHERE s.exam.id = :examId " +
            "AND s.totalScore = (SELECT MAX(s2.totalScore) FROM Submission s2 WHERE s2.exam.id = :examId)")
    List<StudentAnswer> findTopperAnswers(@Param("examId") Long examId);

}
