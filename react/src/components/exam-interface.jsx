import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import "../css/ExamInterface.css";

const ExamInterface = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(10784);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [markedQuestions, setMarkedQuestions] = useState([]);
  const [visitedQuestions, setVisitedQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/api/exams/${examId}/questions`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error.response?.data || error.message);
      }
    };
    fetchQuestions();
  }, [examId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (selectedOption) => {
    const questionId = questions[currentQuestionIndex]?.id;
    setAnswers((prev) => {
      const updatedAnswers = prev.filter((a) => a.questionId !== questionId);
      return [...updatedAnswers, { questionId, selectedOptionId: selectedOption.id }];
    });
  };
  const submitExam = async () => {
    try {
      const payload = {
        answers: answers.map(a => ({
          questionId: a.questionId, 
          selectedOptionId: a.selectedOptionId
        }))
      };
  
      console.log("Submitting Answers:", payload);
  
      await axiosInstance.post(`/api/exams/${examId}/submit`, payload);
      navigate(`/exam/${examId}/result`);
    } catch (error) {
      console.error("Error submitting exam:", error.response?.data || error.message);
    }
  };
  
  
  return (
    <div className="exam-interface">
      <header className="header">
        <div className="header-right">
          <div className="timer">{new Date(timeLeft * 1000).toISOString().substr(11, 8)}</div>
          <button className="end-test-btn" onClick={submitExam}>End test</button>
        </div>
      </header>

      <div className="container">
        <div className="main-content">
          <div className="question-section">
            {questions.length > 0 ? (
              <div className="question-card">
                <div className="question-header">
                  <h2 className="question-title">Question {currentQuestionIndex + 1}</h2>
                  <p className="question-marks">+4 marks, -1 mark</p>
                </div>
                <div className="question-content">
                  <p>{questions[currentQuestionIndex].text}</p>
                  <div className="answer-options">
                    {questions[currentQuestionIndex].options?.map((option, index) => (
                      <label
                        key={index}
                        className={`answer-option ${answers.some(a => a.questionId === questions[currentQuestionIndex].id && a.selectedOptionId === option.id) ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="answer"
                          checked={answers.some(a => a.questionId === questions[currentQuestionIndex].id && a.selectedOptionId === option.id)}
                          onChange={() => handleAnswerSelect(option)}
                        />
                        <span>{option.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p>Loading questions...</p>
            )}
            <div className="navigation-buttons">
              <button className="nav-btn" onClick={() => setCurrentQuestionIndex(Math.max(currentQuestionIndex - 1, 0))} disabled={currentQuestionIndex === 0}>
                Previous
              </button>
              <button className="mark-btn" onClick={() => setMarkedQuestions((prev) => prev.includes(currentQuestionIndex) ? prev.filter(q => q !== currentQuestionIndex) : [...prev, currentQuestionIndex])}>
                {markedQuestions.includes(currentQuestionIndex) ? "Unmark" : "Mark"}
              </button>
              <button className="save-next-btn" onClick={() => setCurrentQuestionIndex(Math.min(currentQuestionIndex + 1, questions.length - 1))} disabled={currentQuestionIndex >= questions.length - 1}>
                Save & Next
              </button>
            </div>
          </div>
          <div className="sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-title">Exam Questions</h3>
              <div className="question-grid">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    className={`question-btn ${currentQuestionIndex === index ? "current" : ""} ${answers.some(a => a.questionId === questions[index].id) ? "answered" : ""} ${markedQuestions.includes(index) ? "marked" : ""}`}
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
