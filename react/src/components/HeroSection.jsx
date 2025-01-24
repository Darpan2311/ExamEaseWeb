import React, { useState, useEffect, useRef } from 'react';
import "../css/HeroSection.css";
import HeroImage from "../assets/img/std-Photoroom.png"; // Add your image in `src/assets` folder

const HeroSection = () => {
  const [textElement, setDynamicText] = useState("");
  const [index, setIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);
  const [minHeight, setMinHeight] = useState(0); // State to track minHeight
  const text = "Learning Made Easy";
  
  // Reference for the text container div to calculate height
  const textContainerRef = useRef(null);

  useEffect(() => {
    const typeEffect = () => {
        if (!isErasing) {
            setDynamicText(text.slice(0, index));
            if (index < text.length) {
                setIndex(index + 1); // Increment index
            } else {
                setTimeout(() => {
                    setIsErasing(true); // Start erasing after typing completes
                }, 1000);
            }
        } else {
            setDynamicText(text.slice(0, index));
            if (index > 0) {
                setIndex(index - 1); // Decrement index
            } else {
                setTimeout(() => {
                    setIsErasing(false); // Start typing again after erasing completes
                }, 500);
            }
        }
    };

    const timeout = setTimeout(typeEffect, isErasing ? 100 : 150); // Adjust typing speed based on erasing

    // Update minHeight based on the full text's height
    if (index === text.length && textContainerRef.current) {
        setMinHeight(textContainerRef.current.offsetHeight); // Set minHeight once the full text is typed
    }

    return () => clearTimeout(timeout); // Clear timeout on cleanup
}, [index, isErasing, text]);

  return (
    <div className='hero'>
      <div className="hero-content">
        
        <h1 
          id="dynamic-text" 
          ref={textContainerRef} 
          style={{ minHeight: `${minHeight}px` }} // Apply dynamic minHeight to the text container
        >
          {textElement}
        </h1>
        <p>
          ExamEase is an online exam system that delivers exam management,
          question bank management, automated grading, an analytical dashboard, and more.
        </p>
        <button className="btn signup">Sign Up</button>
      </div>
      <div className="hero-image">
        <img src={HeroImage} alt="Hero Illustration" />
      </div>
</div> 
  );
};

export default HeroSection;
