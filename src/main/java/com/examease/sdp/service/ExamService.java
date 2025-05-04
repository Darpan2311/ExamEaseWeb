
package com.examease.sdp.service;

import com.examease.sdp.DTO.ActivityDayDTO;
import com.examease.sdp.model.*;
import com.examease.sdp.repo.ExamRepo;
import com.examease.sdp.repo.QuestionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ExamService {
    @Autowired
    private ExamRepo examRepository;

    @Autowired
    private QuestionRepo questionRepository;
    @Autowired
    private ExamRepo examRepo;

    @Transactional
    public Exam saveExam(Exam exam) {
        if (exam.getQuestions() != null) {
            exam.setTotalquestion(exam.getQuestions().size());
            for (Question question : exam.getQuestions()) {
                question.setExam(exam);

                if (question.getOptions() == null || question.getOptions().size() != 4) {
                    throw new IllegalArgumentException("Each question must have exactly 4 options.");
                }

                // Ensure correct option is set
                Option correctOption = question.getOptions().stream()
                        .filter(Option::isCorrect) // Find the correct option
                        .findFirst()
                        .orElse(null);

                if (correctOption == null) {
                    throw new IllegalArgumentException("Each question must have one correct option.");
                }

                question.setCorrectOption(correctOption); // Link the correct option

                for (Option option : question.getOptions()) {
                    option.setQuestion(question);
                }

            }
        }

        return examRepository.save(exam);
    }
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }
    public Exam getExamById(Long examId) {
        return examRepository.findById(examId).orElseThrow(() -> new RuntimeException("Exam not found"));
    }

    public List<Question> getQuestionsByExamId(Long examId) {
        List<Question> questions = questionRepository.findByExamId(examId);
        questions.forEach(question -> {
            // Optionally, clean up any unnecessary fields or modify the structure as needed.
            question.setExam(null); // Remove the exam object from each question to avoid repetition
        });
        return questions;
    }

    public List<Exam> getExamsCreatedBy(String username) {
        return examRepository.findAllByAuthor(username);

    }


}