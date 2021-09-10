import React, { Component } from 'react';
import axios from '../../axios-orders';

import Aux from '../../HOC/Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import WithErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount = () => {
        console.log(this.props);
        axios
            .get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => this.setState({ error }));
    }

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
        const ingredients = this.state.ingredients;
        const ingredientKeys = Object.keys(ingredients);

        let queryParams = ingredientKeys.map(key => `${key}=${ingredients[key]}`).join('&');
        queryParams += `&price=${this.state.totalPrice}`;
        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryParams}`
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        
              
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Aux>
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

            orderSummary = (
                <OrderSummary 
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    proceed={this.purchaseContinueHandler}
                    cancelled={this.purchaseCancelHandler} />
            );
        }
        
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default WithErrorHandler(BurgerBuilder, axios);