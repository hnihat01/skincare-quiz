import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import quizData from '../data/quizData';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import '../styles/QuizPage.css'; // Import the CSS file

function QuizPage() {
    const navigate = useNavigate();
    const { questionNumber } = useParams();
    const questionIndex = parseInt(questionNumber, 10) - 1;
    const totalQuestions = quizData.length;

    const [responses, setResponses] = useState(Array(totalQuestions).fill(null));
    const currentQuestion = quizData[questionIndex];

    const handleOptionSelect = (option) => {
        const updatedResponses = [...responses];
        updatedResponses[questionIndex] = option;
        setResponses(updatedResponses);
    };

    const goToQuestion = (index) => {
        if (index >= 0 && index < totalQuestions) {
            navigate(`/quiz/${index + 1}`);
        }
    };

    const showResults = () => {
        navigate('/results');
    };

    return (
        <div className="container">
            <div className="text-container">
                <p className="question">{currentQuestion.question}</p>

                <ul className="answer-container">
                    {currentQuestion.options.map((option, idx) => (
                        <li
                            key={idx}
                            onClick={() => handleOptionSelect(option)}
                            className="answer-style"
                            style={{
                                backgroundColor: responses[questionIndex] === option ? '#cceeff' : 'white',
                            }}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
                <div className="button-container">
                    <button
                        onClick={() => goToQuestion(questionIndex - 1)}
                        disabled={questionIndex === 0}
                        className="back-button"
                    >
                        Back
                    </button>
                    <button
                        onClick={() => {
                            if (questionIndex === totalQuestions - 1) {
                                showResults();
                            } else {
                                goToQuestion(questionIndex + 1);
                            }
                        }}
                        className="next-button"
                    >
                        {questionIndex === totalQuestions - 1 ? "Discover your results" : "Next question→"}
                    </button>
                </div>
                {/* Move the progress bar here, below the question and answers */}
                <div className="progress-container">
                    <CircularProgressWithLabel  
                        currentQuestion={questionIndex} // The index of the current question
                        questionNumber={questionIndex + 1} // The index of the question being rendered
                        totalQuestions={totalQuestions} // Total number of questions
                        label={`${questionIndex + 1}/${totalQuestions}`} // Label for the progress circle
                    />
                </div>
            </div>
        </div>
    );
}

export default QuizPage;
