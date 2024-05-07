import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShuffleButton from './ShuffleButton';
import DrawButton from './DrawButton';
import CardPile from './CardPile';
import './CardTable.css';

/** CardTable Component
 * 
 * Props: none
 * 
 * State:
 * - deckId: string
 * - cards: array of objects
 * - isEmpty: boolean
 * 
 * Renders:
 * - div containing a button to draw a card or start a new deck. A pile of cards is displayed in center of table for each card drawn.
 */
const CardTable = () => {
    // State
    const [deckId, setDeckId] = useState('');
    const [cards, setCards] = useState([]); // [{image: 'url', value: 'KING', suit: 'HEARTS', code: 'KH'}]
    const [isEmpty, setIsEmpty] = useState(true);
    const [draw, setDraw] = useState(false);
    const [newDeckFlag, setNewDeckFlag] = useState(false);

     // Event Handlers
    // Update draw state to true
    const drawCard = async () => {
        setDraw(true);
    };

    // Update newDeckFlag state to true
    const newDeck = async () => {
        setNewDeckFlag(true);
    };

    // Shuffle deck
    const shuffleDeck = () => {
        // clear the card pile
        setCards([]);
        // Set isEmpty to true
        setIsEmpty(true);
        // Set draw to true
        setDraw(true);
    }

    // Effects
    // Effect for drawing a card
    useEffect(() => {
        const getCard = async () => {
            try{
                // Error handling for no deckId
                if(!deckId) throw new Error('No deck to draw from');

                // Draw a card with API endpoint & modify response for child components
                const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
                const newCardRes = res.data.cards[0];
                const newCard = {
                    image: newCardRes.image,
                    value: newCardRes.value,
                    suit: newCardRes.suit,
                    code: newCardRes.code
                };

                // Change isEmpty state if deck is empty
                if(res.data.remaining === 0) setIsEmpty(true);

                // Create new state arr for cards variable
                setCards(cards => [...cards, newCard]);
            }
            catch(err){
                console.error(err);
            }
        };

        // Check if draw flag is true
        if(draw){
            getCard();
            setDraw(false);
        }
    }, [draw, deckId]);

    // Effect for starting a new deck
    useEffect(() => {
        const getNewDeck = async () => {
            try{
                // Start a new deck with API endpoint
                const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/');
                // Update deckId, isEmpty state
                setDeckId(res.data.deck_id);
                setIsEmpty(false);
                setDraw(true);
            }
            catch(err){
                console.error(err);
            }
        };

        // Check if newDeckFlag is true
        if(newDeckFlag){
            getNewDeck();
            setNewDeckFlag(false);
        }
    }, [newDeckFlag]);

    // Render
    return (
        <div className='CardTable'>
            <DrawButton drawCard={drawCard} newDeck={newDeck} isEmpty={isEmpty} />
            {deckId ? <ShuffleButton deckId={deckId} shuffleDeck={shuffleDeck}/> : null}
            <CardPile cards={cards} />
        </div>
    )
};

export default CardTable;