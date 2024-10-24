import React from 'react';

const StarRating = ({ rating, setRating }) => {
    const handleClick = (index) => {
        setRating(index + 1);
    };

    return (
        <div>
            {[...Array(5)].map((star, index) => (
                <span
                    key={index}
                    onClick={() => handleClick(index)}
                    style={{ cursor: 'pointer', color: index < rating ? 'gold' : 'gray' }}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
