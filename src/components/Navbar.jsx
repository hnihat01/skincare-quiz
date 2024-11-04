import { fontFamily } from '@mui/system';
import React, { useEffect, useState } from 'react';
import '../styles/MainPage.css';

// Custom Card component
const Card = ({ image, title, price, onClick }) => {
    const cardStyle = {
        height: '500px', // Fixed height for card
        width: '350px',  // Fixed width for card
        margin: '10px',  // Margin around the card
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        border: '10px solid white', // Optional: border for visibility
        borderRadius: '8px', // Optional: rounded corners
        overflow: 'hidden', // Clip content if it overflows
        cursor: 'pointer', // Change cursor on hover
    };

    const imgStyle = {
        width: '290px',     // Fill the width of the card
        height: '300px',     // Fixed height for consistent sizing
        objectFit: 'cover', // Maintain aspect ratio
        borderBottom: '3px solid rgba(128, 128, 128, 0.2)', // Light gray with 50% opacity
        borderRadius: '8px'
    };

    const titleStyle = {
        fontFamily: 'Grange',
        color: 'rgba(28, 38, 53, 1)',
        margin: 0,
        fontSize: '24px', // Set the title font size
        padding: '5px 0', // Padding around the title
        textAlign: 'center', // Center align title
    };

    const priceStyle = {
        fontFamily: 'Grange',
        color: 'rgba(28, 38, 53, 1)',
        fontSize: '18px', // Set the price font size
        color: '#000', // Color for the price
        padding: '5px 0', // Padding around the price
        textAlign: 'center', // Center align price
    };

    return (
        <div style={cardStyle} onClick={onClick}>
            <img src={image} alt={title} style={imgStyle} />
            <h4 style={titleStyle}>{title}</h4>
            <p style={priceStyle}>${price}</p>
        </div>
    );
};

// Card Slider component
const CardSlider = () => {
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsToShow = 3; // Number of cards to show at a time

    useEffect(() => {
        // Fetch product data from the API
        fetch('https://jeval.com.au/collections/hair-care/products.json?page=1')
            .then(response => response.json())
            .then(data => {
                const fetchedSlides = data.products.map(product => ({
                    image: product.images[0]?.src || "", // Use first image if available
                    title: product.title,
                    price: product.variants[0]?.price || "N/A", // Use first variant price
                    clickEvent: () => sliderClick(product.title),
                }));
                setSlides(fetchedSlides);
            })
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    // Click handler for the cards
    const sliderClick = (title) => {
        console.log(`${title} clicked!`);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(slides.length / cardsToShow));
    };

    // Dot styles
    const dotsContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    };

    const dotStyle = {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: 'rgba(28, 38, 53, 0.5)', // Inactive dot color
        margin: '0 5px',
        cursor: 'pointer',
    };

    const activeDotStyle = {
        ...dotStyle,
        backgroundColor: 'rgba(28, 38, 53, 1)', // Active dot color
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {slides.slice(currentIndex * cardsToShow, currentIndex * cardsToShow + cardsToShow).map((slide, index) => (
                    <Card
                        key={index}
                        image={slide.image}
                        title={slide.title}
                        price={slide.price} // Pass the price to the Card component
                        onClick={slide.clickEvent}
                    />
                ))}
            </div>
            {slides.length > 0 && (
                <button 
                    onClick={nextSlide} 
                    style={{ 
                        width: '60px',
                        height: '60px',
                        position: 'absolute', 
                        top: '30%', 
                        left: '90%', 
                        borderRadius: '30px',
                        color: 'rgba(28, 38, 53, 1)',
                        backgroundColor: 'rgba(238, 247, 251, 1)',
                        border: '0.16px solid rgba(238, 247, 251, 1)',
                        outline: 'none', // Removes the default focus outline
                        cursor: 'pointer',
                        fontSize: '32px',
                    }}
                >
                    ›
                </button>
            )}
            <div style={dotsContainerStyle}>
                {[...Array(3)].map((_, index) => (
                    <div 
                        key={index} 
                        style={currentIndex === index ? activeDotStyle : dotStyle}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardSlider;
