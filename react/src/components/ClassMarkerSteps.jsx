import React from "react";
import "../css/home.css";
import { FaFileAlt, FaCogs, FaDesktop, FaChartBar, FaAward } from "react-icons/fa";

const steps = [
    {
        icon: <FaFileAlt size={40} />,
        title: "Create",
        points: ["Add questions.", "Re-use questions.", "Randomize order."],
    },
    {
        icon: <FaCogs size={40} />,
        title: "Setup",
        points: ["Private / public access.", "Allow changing answers.", "Set timers.", "Set no. of attempts."],
    },
    {
        icon: <FaDesktop size={40} />,
        title: "Give exam",
        points: ["Seamless on mobile, tablet, or desktop.", "Instant feedback for test takers.", "Cheat-proof options."],
    },
    {
        icon: <FaChartBar size={40} />,
        title: "Analyze results",
        points: ["Instant grading and real-time results.", "Export results for offline analysis."],
    },
    {
        icon: <FaAward size={40} />,
        title: "Certification",
        points: ["Automatic certification when test takers finish.", "Create custom certificates."],
    },
];

const ClassMarkerSteps = () => {
    return (
        <div className="steps-container">
            <h2 className="steps-title">How ExamEase works</h2>
            <div className="steps-grid">
                {steps.map((step, index) => (
                    <div className="step-card" key={index}>
                        <div className="step-icon">{step.icon}</div>
                        <h3 className="step-title">{step.title}</h3>
                        <ul className="step-points">
                            {step.points.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassMarkerSteps;