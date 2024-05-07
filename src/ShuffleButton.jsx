import React, {useState, useEffect} from 'react';
import axios from 'axios';

/** ShuffleButton Component
 * 
 * A button that when clicked, will shuffle the deck, so that users can start drawing from a full deck without refreshing the page. The button should not be clickable while shuffle is in progress.
 * 
 * State:
 * - isShuffling: boolean
 * 
 * Props:
 * - shuffleDeck: function
 * 
 * Renders:
 * - button to shuffle deck
 */
const ShuffleButton = ({ deckId, shuffleDeck }) => {
    // State
    const [isShuffling, setIsShuffling] = useState(false);
    // Event Handlers
    // Update isShuffling state to true
    const handleClick = async () => {
        setIsShuffling(true);
        shuffleDeck();
    };
    // Effects
    // Effect for shuffling deck
    useEffect(() => {
        const shuffle = async () => {
            try {
                // Shuffle deck with API endpoint
                const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
                console.log("Shuffled Deck: ", res.data);
            } catch (err) {
                console.error("Shuffle Error: ", err);
            }
            setIsShuffling(false);
        };
        if (isShuffling) shuffle();
    }, [isShuffling]);

    // Render
    return (
        <>
            <button className='ShuffleButton button' onClick={handleClick} disabled={isShuffling}>
                {isShuffling ? 'Shuffling...' : 'Shuffle Deck'}
            </button>
        </>
    );
};

export default ShuffleButton;