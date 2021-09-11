import React, { Component } from 'react';
import cssClasses from './ContactData.css';
import axios from '../../../axios-orders';
import Button from '../../../Components/UI/Button/Button';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                touched: false,
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Name"
                },
                value: '',
                label: 'Name',
                validation: {
                    required: true,
                },
                valid: false
            },
            street:  {
                touched: false,
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Street"
                },
                value: '',
                label: 'Street',
                validation: {
                    required: true,
                },
                valid: false
            },
            zipCode:  {
                touched: false,
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Zip Code"
                },
                value: '',
                label: 'ZIP Code',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false
            },
            country:  {
                touched: false,
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Country"
                },
                value: '',
                label: 'Country',
                validation: {
                    required: true,
                },
                valid: false
            },
            email:  {
                touched: false,
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: "Your Email"
                },
                value: '',
                label: 'Email',
                validation: {
                    required: true,
                },
                valid: false
            },
            deliveryMethod:  {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '', displayValue: 'Select One'},
                        {value: 'hermers', displayValue: 'Hermes'},
                        {value: 'cheap', displayValue: 'Cheap'}
                    ]
                },
                value: '',
                label: 'Delivery Method',
                validation: {},
                valid: true
            }
        },
        formValid: false,
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const orderData = {};
        for (let key in this.state.orderForm) {
            orderData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            orderData
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

    inputChangedHandler = (event, inputId) => {
        const orderForm = {...this.state.orderForm};
        const formEl = {
            ...orderForm[inputId]
        };

        formEl.touched = true;
        formEl.value = event.target.value;
        formEl.valid = this.checkValidity(formEl.value, formEl.validation);
        orderForm[inputId] = formEl;

        let formValid = Object.keys(orderForm).every(key => orderForm[key].valid);

        this.setState({ orderForm, formValid });
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = isValid && value.trim() !== '';
        }

        if (rules.minLength) {
            isValid = isValid && value.length >= rules.minLength;
        }

        if (rules.maxLength) {
            isValid = isValid && value.length <= rules.maxLength;
        }

        return isValid;
    }

    render() {
        const formEls = [];
        for (let key in this.state.orderForm) {
            formEls.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <React.Fragment>
                <h4>Enter your Contact Data</h4>
                <form onSubmit={this.orderHandler}>
                    {
                        formEls.map(formEl => (
                            <Input 
                                label={formEl.config.label}
                                key={formEl.id}
                                elementType={formEl.config.elementType}
                                elementConfig={formEl.config.elementConfig}
                                value={formEl.config.value}
                                isValid={formEl.config.valid}
                                shouldValidate={formEl.config.validation}
                                touched={formEl.config.touched}
                                changed={event => this.inputChangedHandler(event, formEl.id)} />
                        ))
                    }

                    <Button
                        btnType="Success"
                        disabled={!this.state.formValid}>
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