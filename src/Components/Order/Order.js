import React from 'react';
import cssClasses from './Order.css';

const Order = props => {
    const ingredients = [];

    for (let ingredient in props.ingredients) {
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        });
    }

    const ingredientsOutput = ingredients.map(ig => {
        return (
            <span 
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '2px solid #ccc',
                    padding: '5px',
                    borderRadius: '5px'
                }}
                key={ig.name}>
                {ig.name} ({ig.amount})
            </span>
        );
    });

    return (
        <div className={cssClasses.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <b>USD {props.price}</b></p>
        </div>
    )
};

export default Order;