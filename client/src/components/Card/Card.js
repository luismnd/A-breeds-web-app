import React from 'react';
import { Link } from 'react-router-dom'
import './Card.css';

export default function Card({id, name, image, weight, temperament, height}){
    return (
        <div className="card">
            <Link to={"/dogs/"+id} id={id}>
                <h2 id={id}>{name}</h2>
            </Link>
            <img src={image} alt={name} />
            {!isNaN(weight)&&<p>Min weight {weight} kg</p>}
            <h3>Temperaments</h3>
            <p>{temperament}</p>
        </div>
    );
};