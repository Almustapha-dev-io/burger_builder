import React, { Component } from 'react';

import Aux from '../../HOC/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    };

    updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => sum+el, 0);

        this.setState({ purchaseable: sum > 0 });
    };

    addIngredientHandler = type => {
        const ingredients = {...this.state.ingredients};
        ingredients[type]++;

        const priceAddition = INGREDIENT_PRICES[type];
        const totalPrice = this.state.totalPrice + priceAddition;

        this.setState({ ingredients, totalPrice });
        this.updatePurchaseState(ingredients);
    }

    removeIngredientHandler = type => {
        const ingredients = {...this.state.ingredients};
        if (ingredients[type] > 0) {
            ingredients[type]--;
            const priceReduction = INGREDIENT_PRICES[type];
            const totalPrice = this.state.totalPrice - priceReduction;
            this.setState({ ingredients, totalPrice });
            this.updatePurchaseState(ingredients);
        }
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        alert('Continue');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        proceed={this.purchaseContinueHandler}
                        cancelled={this.purchaseCancelHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                    disabled={disabledInfo}
                    ingredientAdded={this.addIngredientHandler}
                    purchaseable={this.state.purchaseable}
                    ingredientRemoved={this.removeIngredientHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;