import React, { Fragment } from 'react';
import '../styles/ResultsPage.css'; // Adjust the path as needed
import CardSlider from './CardSlider';
import { useNavigate } from 'react-router-dom';

const ResultsPage = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleRetakeQuiz = () => {
        navigate('/quiz/1'); // Navigate to the first quiz question
    };

    return (
        <Fragment>
            <div className="results-background" />
            <div className="results-overlay" />
            <div className="text-container">
                <p className="first-text">Build your everyday self<br /> care routine.</p>
                <p className="second-text">
                    Perfect for if you're looking for soft, nourished skin, our moisturizing body<br />
                    washes are made with skin-natural nutrients that work with your skin to <br />
                    replenish moisture. With a light formula, the bubbly lather leaves your skin<br />
                    feeling cleansed and cared for. And by choosing relaxing fragrances you can <br />
                    add a moment of calm to the end of your day.
                </p>
                <button className="button-style" onClick={handleRetakeQuiz}>Retake the quiz</button>
            </div>
            <div className="card-container">
                <CardSlider />
            </div>
        </Fragment>
    );
};

export default ResultsPage;
