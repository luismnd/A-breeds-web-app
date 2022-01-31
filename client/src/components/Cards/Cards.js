import './Cards.css';
import React from 'react';
import Card from '../Card/Card.js';

export default function Cards({breeds}) {
  if(breeds){
    return (
      <div className='cards'>
        {breeds.map(b =>
            <Card
                id={b.id}
                key={b.id}
                name={b.name}    
                image={b.image}
                weight={b.weight}
                height={b.height} 
                temperament={b.temperament.length>0?b.temperament.reduce((pv,cv) => pv+", "+cv):""}/>
                // temperament={b.temperament}/>
        )}
      </div>
    );
  } else {
    return(
      <div>No breeds loaded</div>
    )
  }
}