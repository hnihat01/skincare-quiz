import '../styles/MainPage.css';
import { Fragment } from 'react';
import MainPageImage from '../images/mainpage.png';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    const navigate = useNavigate();
    const styledImage = {
        position: 'absolute',
        width: '100%',
        height: '536px',
        left: '0px',
        top: '0px',
        background: `url(${MainPageImage}) no-repeat center center`,
        backgroundSize: 'cover',
    };

    const overlay = {
        position: 'absolute',
        width: '100%',
        height: '536px',
        left: '0px',
        top: '0px',
        background: 'rgba(0, 0, 0, 0.35)',
        zIndex: 1, 
    };

    const textContainer = {
        position: 'absolute',
        width: '50%',
        height: 'auto',
        left: '30%',
        top: '17%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 2, 
    };

    const firstText = {
        fontFamily: 'Grange-Light',
        fontWeight: 600,
        fontSize: '40px',
        textAlign: 'center',
        color: '#FFFFFF',
        margin: '5% 2% 0% -25%', 
    };

    const secondText = {
        fontFamily: 'Proxima Nova',
        fontSize: '14px',
        fontWeight: 100,
        textAlign: 'center',
        color: '#FFFFFF',
        margin: '1% 2% 0% -25%', 
    };

    const buttonStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '14px 40px',
        width: '174px',
        height: '47px',
        background: '#C4EDFF',
        borderRadius: '8px',
        color: '#1C2635',
        fontFamily: 'Proxima Nova',
        fontSize: '14px',
        fontWeight: 500,
        textAlign: 'center',
        cursor: 'pointer', 
        margin: '2% 2% 3% -25%',

    };
    const clickedButton=()=>{
        console.log('clicked');
        navigate('/quiz/1'); 
    }

    return (
        <Fragment>
            <div style={styledImage} />
            <div style={overlay} />
            <div style={textContainer}>
                <p style={firstText}>Build a self  care routine <br/> suitable for you</p>
                <p style={secondText}>Take our test to get a personalized self-care<br/> routine based on your needs.</p>
                <button style={buttonStyle} onClick={clickedButton}>Start the quiz</button>
            </div>
        </Fragment>
    );
}

export default MainPage;
