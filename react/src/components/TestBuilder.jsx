import React, { useState } from "react";
import "../css/TestBuilder.css";
import axiosInstance from "../axiosConfig";

export default function TestBuilder() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "",
      options: [
        { id: 1, text: "" },
        { id: 2, text: "" },
        { id: 3, text: "" },
        { id: 4, text: "" },
      ],
      correctAnswer: null,
    },
  ]);

  const isQuestionValid = (question) => {
    return (
      question.text.trim() !== "" &&
      question.options.every((option) => option.text.trim() !== "") &&
      question.correctAnswer !== null
    );
  };

  const canAddQuestion = questions.every(isQuestionValid);

  const addQuestion = () => {
    if (canAddQuestion) {
      setQuestions([
        ...questions,
        {
          id: questions.length + 1,
          text: "",
          options: [
            { id: 1, text: "" },
            { id: 2, text: "" },
            { id: 3, text: "" },
            { id: 4, text: "" },
          ],
          correctAnswer: null,
        },
      ]);
    }
  };

  const removeQuestion = (questionId) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const updateQuestionText = (questionId, text) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, text } : q
      )
    );
  };

  const updateOptionText = (questionId, optionId, text) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) =>
                o.id === optionId ? { ...o, text } : o
              ),
            }
          : q
      )
    );
  };

  const selectCorrectAnswer = (questionId, optionId) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, correctAnswer: optionId } : q
      )
    );
  };

  
  const publishExam = async () => {
    const formattedQuestions = questions.map((q) => ({
      text: q.text,
      options: q.options.map((o) => ({
        text: o.text,
        correct: o.id === q.correctAnswer, // Ensure correct option is set
      }))
    }));
  
    const examData = { questions: formattedQuestions };
  
    // Debugging - log the exam data before sending it
    console.log("🚀 Exam data being sent to backend:", JSON.stringify(examData, null, 2));
  
    try {
      const response = await axiosInstance.post("/api/exams", examData);
      if (response.status === 200) {
        alert("Exam published successfully!");
      } else {
        alert("Failed to publish exam.");
      }
    } catch (error) {
      console.error("❌ Error publishing exam:", error);
      alert("Error publishing exam.");
    }
  };
  
  
  
  
  return (
    <div className="test-builder">
      <aside className="sidebar1">
        <div className="sidebar-header">
          <h1 className="sidebar-title">ExamEase</h1>
        </div>
        <nav className="sidebar-nav">
          {["Dashboard", "Test Builder", "Exams", "Reports"].map((item) => (
            <button key={item} className={`sidebar-nav-item ${item === "Test Builder" ? "active" : ""}`}>
              <span className="sidebar-nav-icon">
                {item === "Dashboard" && "⌂"}
                {item === "Test Builder" && "📝"}
                {item === "Exams" && "📚"}
                {item === "Reports" && "📊"}
              </span>
              <span>{item}</span>
            </button>
          ))}
        </nav>
      </aside>
      <main className="main-content">
        <div className="container">
          <header className="main-header">
            <h1>Welcome back user</h1>
            <p>Build and publish your tests in no time.</p>
          </header>
          <div className="question-meta">
            {["Topics Covered", "Grade", "Textbook", "Difficulty"].map((label) => (
              <div key={label} className="question-meta-item">
                <select>
                  <option>
                    {label === "Question Type"
                      ? "Multiple choice"
                      : label === "Topics Covered"
                      ? "Algebra - Geometry"
                      : label === "Grade"
                      ? "9th Grade"
                      : label === "Textbook"
                      ? "Mathematics"
                      : "Medium"}
                  </option>
                </select>
              </div>
            ))}
          </div>
          <div className="questions-list">
            {questions.map((question, index) => (
              <div key={question.id} className="question-item">
                <div className="question-header">
                  <h3>Question {index + 1}</h3>
                  <button onClick={() => removeQuestion(question.id)} className="remove-question">
                    Remove Question
                  </button>
                </div>
                <div className="question-content">
                  <textarea
                    value={question.text}
                    onChange={(e) => updateQuestionText(question.id, e.target.value)}
                    placeholder="Enter your question here..."
                    className="question-text"
                  />
                  {question.options.map((option, optionIndex) => (
                    <div key={option.id} className="option-item">
                      <div className="option-header">
                        <input
                          type="radio"
                          name={`correct-answer-${question.id}`}
                          onChange={() => selectCorrectAnswer(question.id, option.id)}
                          checked={question.correctAnswer === option.id}
                        />
                        <h4>Choice {optionIndex + 1}</h4>
                      </div>
                      <textarea
                        value={option.text}
                        onChange={(e) => updateOptionText(question.id, option.id, e.target.value)}
                        placeholder="Enter option text..."
                        className="option-text"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={addQuestion} className="add-question" disabled={!canAddQuestion}>
              Add New Question
            </button>
            <button onClick={publishExam} className="publish-exam">
              Publish Exam
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
