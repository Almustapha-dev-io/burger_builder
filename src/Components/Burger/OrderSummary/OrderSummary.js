import React from 'react';
import Aux from '../../../HOC/Auxiliary';
import Button from '../../UI/Button/Button'; 

const OrderSummary = props => {
    return (
        <Aux>
            <h3><b>Your Order</b></h3>
            <p>A tasty burger custom built with:</p>
            <ul>
                {getIngredientList(props.ingredients)}
            </ul>
            <p><b>Total: ${props.price.toFixed(2)}</b></p>
            <p>Continue to Checkout?</p>
            <Button 
                btnType="Danger"
                clicked={props.cancelled}>
                Cancel
            </Button>

            <Button 
                btnType="Success"
                clicked={props.proceed}>
                Proceed
            </Button>
        </Aux>
    );
}

const getIngredientList = ingredients => {
    const ingredientKeys = Object.keys(ingredients);
    return ingredientKeys.map(key => {
        return (
            <li key={key}>
                <span style={{textTransform: 'capitalize'}}>{key}: </span>
                {ingredients[key]}
            </li>
        );
    });
}

export default OrderSummary;