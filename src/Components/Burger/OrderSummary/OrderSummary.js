import React, { Component } from 'react';
import Aux from '../../../HOC/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentDidUpdate = () => {
        console.log('[OrderSummary] will Update')
    }

    render() {
        return (
            <Aux>
                <h3><b>Your Order</b></h3>
                <p>A tasty burger custom built with:</p>
                <ul>
                    {getIngredientList(this.props.ingredients)}
                </ul>
                <p><b>Total: ${this.props.price.toFixed(2)}</b></p>
                <p>Continue to Checkout?</p>
                <Button
                    btnType="Danger"
                    clicked={this.props.cancelled}>
                    Cancel
                </Button>

                <Button
                    btnType="Success"
                    clicked={this.props.proceed}>
                    Proceed
                </Button>
            </Aux>
        );
    }
}

const getIngredientList = ingredients => {
    const ingredientKeys = Object.keys(ingredients);
    return ingredientKeys.map(key => {
        return (
            <li key={key}>
                <span style={{ textTransform: 'capitalize' }}>{key}: </span>
                {ingredients[key]}
            </li>
        );
    });
}

export default OrderSummary;