import React, { Component } from 'react';
import cssClasses from './ContactData.css';
import axios from '../../../axios-orders';
import Button from '../../../Components/UI/Button/Button';
import Spinner from '../../../Components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            customer: {
                name: 'Max Schlumm',
                address: {
                    street: 'Adjokil 1',
                    zipCode: '121213',
                    country: 'Nigeria'
                },
                email: 'alexhun@gmail.com'
            },
            deliveryMethod: 'Hermes'
        };

        axios
            .post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    render() {
        let form = (
            <React.Fragment>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your name" />

                    <input
                        type="email"
                        name="email"
                        placeholder="Your email" />

                    <input
                        type="text"
                        name="street"
                        placeholder="Street" />

                    <input
                        type="text"
                        name="postal"
                        placeholder="Postal Code" />

                    <Button
                        btnType="Success"
                        clicked={this.orderHandler}>
                        Order
                    </Button>
                </form>
            </React.Fragment>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={cssClasses.ContactData}>
                {form}
            </div>
        )
    }
}

export default ContactData;