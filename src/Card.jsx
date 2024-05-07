import React, {useRef} from 'react';
import './Card.css';
/** Card Component 
 * 
 * props:
 * - card: object
 * 
 * state: none
 * 
 * renders:
 * - img element displaying card image
*/
const Card = ({ card }) => {
    const randDeg = Math.floor(Math.random() * 90) - 45;
    //save each cards rotation in a ref
    const rotationRef = useRef(randDeg); 


    return (
        <> 
            <img 
                className='Card' 
                src={card.image} 
                alt={`${card.value} of ${card.suit}`}
                style={{transform: `rotate(${rotationRef.current}deg)`}} /> 
        </>
    )
};

export default Card;