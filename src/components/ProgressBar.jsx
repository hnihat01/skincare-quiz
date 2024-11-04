import React from 'react';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
    const percentage = ((currentQuestion + 1) / totalQuestions) * 100;

    return (
        <div style={{ position: 'relative', width: '100px', height: '100px' }}>
            <svg width="100" height="100">
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#e6e6e6"
                    strokeWidth="10"
                    fill="none"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#4caf50"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${percentage} 100`}
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)' }}>
                {totalQuestions - (currentQuestion + 1)} Questions Left
            </div>
        </div>
    );
};

export default ProgressBar;
