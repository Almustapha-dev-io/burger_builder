import React, { Component } from 'react';
import Order from '../../Components/Order/Order';
import cssClasses from './Orders.css';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import WithErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
        error: null
    }

    componentDidMount = () => {
        axios
            .get('/orders.json')
            .then(response => {
                const orders = [];
                const orderKeys = Object.keys(response.data);
                orderKeys.forEach(key => {
                    orders.push({
                        ...response.data[key],
                        id: key
                    });
                });

                console.log(orders);
                this.setState({ orders, loading: false });
            })
            .catch(error => this.setState({ loading: false, error }));
    }

    render() {
        let orders = <h3>No orders placed! Build a burger and place one.</h3>;

        if (this.state.error) {
            orders = <h3>Could not retrieve orders!</h3>
        }

        if (this.state.loading) {
            orders = <Spinner />
        }

        if (this.state.orders.length > 0) {
            orders = (
                <React.Fragment>
                   {this.state.orders.map(order => {
                       return (
                           <Order 
                                key={order.id} 
                                ingredients={order.ingredients}
                                price={+order.price} />
                       )
                   })}
                </React.Fragment>
            );
        }

        return (
            <div className={cssClasses.Orders}>
                {orders}
            </div>
        );
    }
}

export default WithErrorHandler(Orders, axios);