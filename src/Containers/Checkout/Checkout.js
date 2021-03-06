import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    };

    componentDidMount = () => {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = +param[1]
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({ ingredients, price });
    };

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    
    checkoutContinuedHandler = () => {
       this.props.history.replace('/checkout/contact-data') ;
    };

    render() {
        let checkout = <h3>Please build a burger!</h3>;

        if (this.state.ingredients) {
            checkout = (
                <div>
                    <CheckoutSummary 
                        ingredients={this.state.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />

                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        render={props => <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />} />
                </div>
            );
        }
        return checkout;
    }
}

export default Checkout;