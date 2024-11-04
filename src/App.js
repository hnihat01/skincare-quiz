import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './components/QuizPage';
import MainPage from './components/MainPage';
import ResultsPage from './components/ResultsPage';
import Navbar from './components/Navbar';
function App() {
    return (
        <Router>
            <Routes>
               <Route path="/" element={<MainPage />} />
                <Route path="/quiz/:questionNumber" element={<QuizPage />} />
                <Route path="/results" element={<ResultsPage />} />

                

            </Routes>
        </Router>
    );
}

export default App;
