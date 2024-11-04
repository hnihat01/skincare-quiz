import React, { useEffect, useState } from 'react';
import '../styles/CardSlider.css'; // Adjust the path as needed
import Card from './Card';

const CardSlider = () => {
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [favorites, setFavorites] = useState(new Set()); // Set to keep track of favorite card indices
    const [cardsToShow, setCardsToShow] = useState(3); // Default to 3 cards

    useEffect(() => {
        const updateCardsToShow = () => {
            if (window.innerWidth < 768) { // Example breakpoint for small screens
                setCardsToShow(1);
            } else {
                setCardsToShow(3);
            }
        };

        // Initial update
        updateCardsToShow();

        // Update on resize
        window.addEventListener('resize', updateCardsToShow);
        
        // Fetch product data from the API
        fetch('https://jeval.com.au/collections/hair-care/products.json?page=1')
            .then(response => response.json())
            .then(data => {
                const fetchedSlides = data.products.map((product, index) => ({
                    image: product.images[0]?.src || "", // Use first image if available
                    title: index === 0 ? "Daily routine" : product.title, // Set title for the first card
                    price: product.variants[0]?.price || "N/A", // Use first variant price
                    clickEvent: () => sliderClick(product.title),
                    description: index === 0 ? "Perfect for if you're looking for soft, nourished skin, our moisturizing body washes are made with skin-natural nutrients that work with your skin to replenish moisture." : "", // Set description for the first card
                    isTextOnly: index === 0, // Flag to determine if this card is text-only
                }));
                setSlides(fetchedSlides);
            })
            .catch(error => console.error("Error fetching products:", error));
            return () => window.removeEventListener('resize', updateCardsToShow); // Cleanup listener

    }, []);

    // Click handler for the cards
    const sliderClick = (title) => {
        console.log(`${title} clicked!`);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(slides.length / cardsToShow));
    };

    // Toggle favorite state
    const toggleFavorite = (index) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(index)) {
            newFavorites.delete(index); // Remove from favorites
        } else {
            newFavorites.add(index); // Add to favorites
        }
        setFavorites(newFavorites); // Update the state
    };

    return (
        <div className="slider-container">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {slides.slice(currentIndex * cardsToShow, currentIndex * cardsToShow + cardsToShow).map((slide, index) => (
                    <Card
                        key={index}
                        image={slide.image}
                        title={slide.title}
                        price={slide.price} // Pass the price to the Card component
                        description={slide.description} // Pass the description to the Card component
                        onClick={slide.clickEvent}
                        isTextOnly={slide.isTextOnly} // Pass the isTextOnly flag
                        isFavorite={favorites.has(currentIndex * cardsToShow + index)} // Check if this card is a favorite
                        onFavoriteToggle={() => toggleFavorite(currentIndex * cardsToShow + index)} // Pass the toggle function with correct index
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
                {/* Render only 3 dots */}
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
