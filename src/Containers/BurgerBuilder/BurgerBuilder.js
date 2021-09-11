import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import axios from '../../axios-orders';
import Aux from '../../HOC/Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import WithErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount = () => {
        console.log(this.props, this.state);
        // axios
        //     .get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch(error => this.setState({ error }));
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
            ...this.props.ingredients
        };

        Object
            .keys(disabledInfo)
            .forEach(key => disabledInfo[key] = disabledInfo[key] <= 0);

        let orderSummary = null;        
              
        let burger = this.state.error ? 
            <p>Ingredients can't be loaded</p> 
            : <Spinner />;

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        ordered={this.purchaseHandler}
                        price={this.props.totalPrice}
                        disabled={disabledInfo}
                        ingredientAdded={this.props.onAddIngredient}
                        purchaseable={this.props.purchaseable}
                        ingredientRemoved={this.props.onRemoveIngredient} />
                </Aux>
            );

            orderSummary = (
                <OrderSummary 
                    price={this.props.totalPrice}
                    ingredients={this.props.ingredients}
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchaseable: state.purchaseable,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: ingredientName => dispatch({
            type: actions.ADD_INGREDIENT,
            ingredientName
        }),
        onRemoveIngredient: ingredientName => dispatch({
            type: actions.REMOVE_INGREDIENT,
            ingredientName
        })
    };
};

const storeConnector = connect(mapStateToProps, mapDispatchToProps);
export default storeConnector(WithErrorHandler(BurgerBuilder, axios));