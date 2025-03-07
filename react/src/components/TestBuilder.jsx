import React, { useState } from "react";
import "../css/TestBuilder.css";
import axiosInstance from "../axiosConfig";
import UserName from "./UserDetails";

export default function TestBuilder() {
  const [examName, setExamName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [difficulty, setDifficulty] = useState("Beginner");
  const [competitiveExams, setCompetitiveExams] = useState([]);
  
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
        correct: o.id === q.correctAnswer,
      })),
    }));

    const examData = {
      name: examName, // Change examName -> name
      difficultyLevel: difficulty, // Change difficulty -> difficultyLevel
      subjects,
      questions: formattedQuestions,
    };
    

    console.log("🚀 Exam data being sent to backend:", JSON.stringify(examData, null, 2));

    try {
      const response = await axiosInstance.post("/api/exams/create", examData);
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
            <h1>Welcome back <UserName/></h1>
            <p>Build and publish your tests in time.</p>
          </header>
          <div className="question-meta">
            <label>
              <div id="exam-name-label">
              Exam Name:
              </div>
              <input
                type="text"
             
                id="exam-name"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="Enter exam name"
              />
            </label>
            <label>
            <div id="exam-sub-label">
              Subjects:
              </div>
              <input
                type="text"
                   
                id="exam-sub"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim() !== "") {
                    setSubjects([...subjects, e.target.value.trim()]);
                    e.target.value = "";
                  }
                }}
                placeholder="Enter a subject and press Enter"
              />
            </label>
            <ul>
              {subjects.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))}
            </ul>
            <div>
      <label htmlFor="difficultySelect" >
        <div id="diff-lev">
        Difficulty Level:
        </div>
        <select
          
          id="difficultySelect"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="Beginner" >Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Master">Master</option>
        </select>
      </label>
    </div>
          </div>
          <div className="questions-list" >
            {questions.map((question, index) => (
              <div key={question.id} className="question-item" id="ques">
                <div className="question-header">
                  <h3 id="que-head">Question {index + 1}</h3>
                  <button onClick={() => removeQuestion(question.id)} className="remove-question">Remove Question</button>
                </div>
                <textarea
                id="que-text"
                  value={question.text}
                  onChange={(e) => updateQuestionText(question.id, e.target.value)}
                  placeholder="Enter your question here..."
                  className="question-text"
                
                />
                {question.options.map((option, optionIndex) => (
                  <div key={option.id} className="option-item">
                    <input
                      type="radio"
                      name={`correct-answer-${question.id}`}
                      onChange={() => selectCorrectAnswer(question.id, option.id)}
                      checked={question.correctAnswer === option.id}
                      id="option-radio"
                    />
                    <textarea
                       className="modified-textarea"
                      value={option.text}
                      onChange={(e) => updateOptionText(question.id, option.id, e.target.value)}
                      placeholder="Enter option text..."
                     id="que-option"
                    />
                  </div>
                ))}
              </div>
            ))}
            <button onClick={addQuestion} className="add-question" disabled={!canAddQuestion}>Add New Question</button>
            <button onClick={publishExam} className="publish-btn">Publish Exam</button>
          </div>
        </div>
      </main>
    </div>
  );
}
