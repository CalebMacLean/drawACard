import React from 'react';

/** DeckButton Component
 * 
 * This component should have its text and event handler determined by whether the deck is empty or not.
 * 
 * Props:
 * - drawCard: function
 * - newDeck: function
 * - isEmpty: boolean
 * 
 * State: none
 * 
 * Renders:
 * - button to draw a card or start a new deck
 */
const DeckButton = ({ drawCard, newDeck, isEmpty }) => {
    // Render
    return (
        <button className='DrawButton button' onClick={isEmpty ? newDeck : drawCard}>
            GIMME A CARD!
        </button>
    );
};

export default DeckButton;