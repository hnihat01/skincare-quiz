import { useNavigate, useParams } from 'react-router-dom';
import quizData from '../data/quizData'; 
import CircularWithValueLabel from './CircularProgressWithLabel'; 

function QuestionPage() {
    const { questionIndex } = useParams();
    const navigate = useNavigate();
    const currentQuestion = quizData[questionIndex];

    const handleAnswer = (answer) => {
       
        console.log(`Question ${questionIndex}: ${answer}`);
        if (parseInt(questionIndex) < quizData.length - 1) {
            navigate(`/quiz/question/${parseInt(questionIndex) + 1}`);
        } else {
            navigate('/quiz/results'); 
        }
    };

    return (
        <div>
            <CircularWithValueLabel currentQuestion={parseInt(questionIndex)} totalQuestions={quizData.length} />
            <h2>{currentQuestion.question}</h2>
            {currentQuestion.options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option)}>
                    {option}
                </button>
            ))}
            {questionIndex > 0 && (
                <button onClick={() => navigate(`/quiz/question/${parseInt(questionIndex) - 1}`)}>Back</button>
            )}
        </div>
    );
}

export default QuestionPage;
