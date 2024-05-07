import React from 'react';
import Card from './Card';
import './CardPile.css';

/** CardPile Component
 * 
 * Props:
 * - cards: array of objects
 * 
 * State: none
 * 
 * Renders:
 * - div containing a pile of cards
 */
const CardPile = ({ cards }) => {
    // console.log("Cards from CardPile Component: ", cards);
    if (!cards) return null;
    return (
        <div className='CardPile'>
            {cards.map(card => (
                console.log("Current Card: ", card),
                <Card key={card.code} card={card} />
            ))}
        </div>
    );
};

export default CardPile;