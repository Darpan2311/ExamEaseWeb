import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ Get examId from URL
import axiosInstance from "../axiosConfig"; // ✅ Import axios instance
import "../css/ExamInterface.css";

const ExamInterface = () => {
  const { examId } = useParams(); // ✅ Get examId from URL
  const [timeLeft, setTimeLeft] = useState(10784); // 2:59:44 in seconds
  const [questions, setQuestions] = useState([]); // ✅ Store fetched questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // ✅ Track current question index
  const [answers, setAnswers] = useState([]);
  const [markedQuestions, setMarkedQuestions] = useState([]); // Questions marked by the user
  const [visitedQuestions, setVisitedQuestions] = useState([]); // Questions the user has visited

  // ✅ Fetch Questions Dynamically
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/api/exams/${examId}/questions`);
        console.log("Fetched Questions:", response.data);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error.response?.data || error.message);
      }
    };

    fetchQuestions();
  }, [examId]);

  // ✅ Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // ✅ Navigation Handlers
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setVisitedQuestions((prev) => [...new Set([...prev, currentQuestionIndex + 1])]);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // ✅ Answer Selection
  const handleAnswerSelect = (selectedOption) => {
    setAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex((a) => a.questionId === currentQuestionIndex);
      if (existingAnswerIndex !== -1) {
        const newAnswers = [...prev];
        newAnswers[existingAnswerIndex] = { questionId: currentQuestionIndex, selectedOption: selectedOption.id };  // Use option.id
        return newAnswers;
      }
      return [...prev, { questionId: currentQuestionIndex, selectedOption: selectedOption.id }];  // Store id
    });
  };

  // ✅ Marking Questions
  const toggleMarkQuestion = () => {
    setMarkedQuestions((prev) => {
      if (prev.includes(currentQuestionIndex)) {
        return prev.filter((q) => q !== currentQuestionIndex);
      }
      return [...prev, currentQuestionIndex];
    });
  };

  // ✅ Get Question Status
  const getQuestionStatus = (index) => {
    if (currentQuestionIndex === index) return "current";
    if (answers.some((a) => a.questionId === index)) return "answered";
    if (markedQuestions.includes(index)) return "marked";
    if (visitedQuestions.includes(index) && !answers.some((a) => a.questionId === index)) return "visited";
    return "";
  };

  // ✅ Get Current Answer
  const getCurrentAnswer = () => {
    return answers.find((a) => a.questionId === currentQuestionIndex)?.selectedOption || "";
  };

  // ✅ Get Current Question
  const currentQuestion = questions[currentQuestionIndex] || {};

  return (
    <div className="exam-interface">
      {/* Header */}
      <header className="header">
        <div className="header-right">
          <div className="timer">{formatTime(timeLeft)}</div>
          <button className="end-test-btn">End test</button>
        </div>
      </header>

      <div className="container">
        <div className="main-content">
          {/* Main content */}
          <div className="question-section">
            {questions.length > 0 ? (
              <div className="question-card">
                <div className="question-header">
                  <h2 className="question-title">Question {currentQuestionIndex + 1}</h2>
                  <p className="question-marks">+4 marks, -1 mark</p>
                </div>

                <div className="question-content">
                  <p>{currentQuestion.text}</p> {/* ✅ Dynamic Question Text */}
                  <div className="answer-options">
                    {currentQuestion.options?.map((option, index) => (
                      <label
                        key={index}
                        className={`answer-option ${getCurrentAnswer() === option.id ? 'selected' : ''} ${option.id === currentQuestion.correctOption?.id ? 'correct' : ''}`}
                      >
                        <input
                          type="radio"
                          name="answer"
                          checked={getCurrentAnswer() === option.id}
                          onChange={() => handleAnswerSelect(option)}
                        />
                        <span>{option.text}</span> {/* Display the text of the option */}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p>Loading questions...</p>
            )}

            <div className="navigation-buttons">
              <button className="nav-btn" onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
                Previous
              </button>
              <button className={`mark-btn ${markedQuestions.includes(currentQuestionIndex) ? "marked" : ""}`} onClick={toggleMarkQuestion}>
                Mark
              </button>
              <button className="save-next-btn" onClick={goToNextQuestion} disabled={currentQuestionIndex >= questions.length - 1}>
                Save & Next
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-title">Exam Questions</h3>
              <div className="question-grid">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    className={`question-btn ${getQuestionStatus(index)}`}
                    onClick={() => {
                      setCurrentQuestionIndex(index);
                      setVisitedQuestions((prev) => [...new Set([...prev, index])]);
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExamInterface;
