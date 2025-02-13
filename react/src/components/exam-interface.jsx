import { useState, useEffect } from "react"
import "../css/ExamInterface.css"

const ExamInterface = () => {
  const [timeLeft, setTimeLeft] = useState(10784) // 2:59:44 in seconds
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState([])
  const [markedQuestions, setMarkedQuestions] = useState([])
  const [visitedQuestions, setVisitedQuestions] = useState([])
  const totalQuestions = 35

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  // Navigation handlers
  const goToNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1)
      setVisitedQuestions((prev) => [...new Set([...prev, currentQuestion + 1])])
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  // Answer handlers
  const handleAnswerSelect = (selectedOption) => {
    setAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex((a) => a.questionId === currentQuestion)
      if (existingAnswerIndex !== -1) {
        const newAnswers = [...prev]
        newAnswers[existingAnswerIndex] = { questionId: currentQuestion, selectedOption }
        return newAnswers
      }
      return [...prev, { questionId: currentQuestion, selectedOption }]
    })
  }

  // Mark question handler
  const toggleMarkQuestion = () => {
    setMarkedQuestions((prev) => {
      if (prev.includes(currentQuestion)) {
        return prev.filter((q) => q !== currentQuestion)
      }
      return [...prev, currentQuestion]
    })
  }

  // Save and next handler
  const handleSaveAndNext = () => {
    goToNextQuestion()
  }

  // Get question status
  const getQuestionStatus = (questionNumber) => {
    if (currentQuestion === questionNumber) return "current"
    if (answers.some((a) => a.questionId === questionNumber)) return "answered"
    if (markedQuestions.includes(questionNumber)) return "marked"
    if (visitedQuestions.includes(questionNumber) && !answers.some((a) => a.questionId === questionNumber))
      return "visited"
    return ""
  }

  // Get current answer
  const getCurrentAnswer = () => {
    return answers.find((a) => a.questionId === currentQuestion)?.selectedOption || ""
  }

  // Statistics
  const answeredCount = answers.length
  const markedCount = markedQuestions.length
  const unansweredCount = totalQuestions - answeredCount
  const visitedUnansweredCount = visitedQuestions.length - answeredCount

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
            <div className="question-card">
              <div className="question-header">
                <div>
                  <h2 className="question-title">Question {currentQuestion}</h2>
                  <p className="question-marks">+4 marks, -1 mark</p>
                </div>
                
              </div>

              <div className="question-content">
                <p>
                In a B+ tree, the requirement of at least half-full (50%) node occupancy is relaxed for which one of the following cases?

                </p>
                
                <div className="answer-options">
                  {["Only the root node", "All leaf nodes", "All internal nodes", "Only the leftmost leaf node"].map((option) => (
                    <label key={option} className="answer-option">
                      <input
                        type="radio"
                        name="answer"
                        checked={getCurrentAnswer() === option}
                        onChange={() => handleAnswerSelect(option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="navigation-buttons">
              <button className="nav-btn" onClick={goToPreviousQuestion} disabled={currentQuestion === 1}>
                Previous
              </button>
              <div className="right-buttons">
                <button
                  className={`mark-btn ${markedQuestions.includes(currentQuestion) ? "marked" : ""}`}
                  onClick={toggleMarkQuestion}
                >
                Mark
                </button>
                <button className="save-next-btn" onClick={handleSaveAndNext}>
                  Save & Next
                </button>
              </div>
            </div>
          </div>

          
          <div className="sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-title">Gate 2023 DSA Section</h3>
              <div className="question-stats">
                <div className="stat-item">
                  <div className="stat-dot answered" />
                  <span>{answeredCount} answered</span>
                </div>
                <div className="stat-item">
                  <div className="stat-dot marked" />
                  <span>{markedCount} marked</span>
                </div>
                <div className="stat-item">
                  <div className="stat-dot visited" />
                  <span>{visitedUnansweredCount} visited</span>
                </div>
                <div className="stat-item">
                  <div className="stat-dot unanswered" />
                  <span>{unansweredCount} unanswered</span>
                </div>
              </div>
              <div className="question-grid">
                {Array.from({ length: totalQuestions }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`question-btn ${getQuestionStatus(i + 1)}`}
                    onClick={() => {
                      setCurrentQuestion(i + 1)
                      setVisitedQuestions((prev) => [...new Set([...prev, i + 1])])
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamInterface
