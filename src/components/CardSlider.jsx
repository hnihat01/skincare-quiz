import React, { useEffect, useState } from 'react';
import '../styles/CardSlider.css'; 
import Card from './Card';

const CardSlider = () => {
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [favorites, setFavorites] = useState(new Set()); 
    const [cardsToShow, setCardsToShow] = useState(3); 

    useEffect(() => {
        const updateCardsToShow = () => {
            if (window.innerWidth < 768) { 
                setCardsToShow(1);
            } else {
                setCardsToShow(3);
            }
        };

        updateCardsToShow();

        window.addEventListener('resize', updateCardsToShow);
        
        fetch('https://jeval.com.au/collections/hair-care/products.json?page=1')
            .then(response => response.json())
            .then(data => {
                const fetchedSlides = data.products.map((product, index) => ({
                    image: product.images[0]?.src || "", 
                    title: index === 0 ? "Daily routine" : product.title, 
                    price: product.variants[0]?.price || "N/A", 
                    clickEvent: () => sliderClick(product.title),
                    description: index === 0 ? "Perfect for if you're looking for soft, nourished skin, our moisturizing body washes are made with skin-natural nutrients that work with your skin to replenish moisture." : "", // Set description for the first card
                    isTextOnly: index === 0, 
                }));
                setSlides(fetchedSlides);
            })
            .catch(error => console.error("Error fetching products:", error));
            return () => window.removeEventListener('resize', updateCardsToShow); 

    }, []);

 
    const sliderClick = (title) => {
        console.log(`${title} clicked!`);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(slides.length / cardsToShow));
    };


    const toggleFavorite = (index) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(index)) {
            newFavorites.delete(index);
        } else {
            newFavorites.add(index); 
        }
        setFavorites(newFavorites); 
    };

    return (
        <div className="slider-container">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {slides.slice(currentIndex * cardsToShow, currentIndex * cardsToShow + cardsToShow).map((slide, index) => (
                    <Card
                        key={index}
                        image={slide.image}
                        title={slide.title}
                        price={slide.price} 
                        description={slide.description}
                        onClick={slide.clickEvent}
                        isTextOnly={slide.isTextOnly} 
                        isFavorite={favorites.has(currentIndex * cardsToShow + index)} 
                        onFavoriteToggle={() => toggleFavorite(currentIndex * cardsToShow + index)} 
                    />
                ))}
            </div>
            {slides.length > 0 && (
                <button 
                    onClick={nextSlide} 
                    className="slider-button"
                >
                    ›
                </button>
            )}
            <div className="dots-container">
                
                {[0, 1, 2].map((_, index) => (
                    <div 
                        key={index} 
                        className={currentIndex === index ? 'active-dot' : 'dot'}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardSlider;
