import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Card = ({ image, title, price, onClick, isTextOnly, isFavorite, onFavoriteToggle }) => {
    return (
        <div className="card" onClick={onClick}>
            {isTextOnly ? (
                <div className="text-only-container">
                    <h4 className="card-text-only-title">{title}</h4>
                    <p className="card-text-only">
                        Perfect for if you're looking for<br /> soft, nourished skin, our<br /> moisturizing body
                        washes are<br /> made with skin-natural nutrients that work with your skin to <br />
                        replenish moisture. With a light<br /> formula, the bubbly lather leaves your skin
                        feeling cleansed and<br /> cared for. And by choosing<br /> relaxing fragrances you can 
                        add<br /> a moment of calm to the end of <br />your day.
                    </p>
                </div>
            ) : (
                <>
                   
                    <div
                        className="favorite-icon"
                        onClick={(e) => {
                            e.stopPropagation(); 
                            onFavoriteToggle(); 
                        }}
                    >
                        {isFavorite ? <FavoriteIcon className="favorite" /> : <FavoriteBorderIcon className="favorite" />}
                    </div>
                    <img src={image} alt={title} />
                    <h4 className="card-title">{title}</h4>
                    <p className="card-price">${price}</p>
                </>
            )}
        </div>
    );
};

export default Card;
