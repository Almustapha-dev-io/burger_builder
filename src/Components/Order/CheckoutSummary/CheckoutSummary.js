import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import cssClasses from './CheckoutSummary.css';

const CheckoutSummary = props => {
    console.log('CKS', props.ingredients);
    return (
        <div className={cssClasses.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                clicked={props.checkoutCancelled}
                btnType="Danger">
                Cancel
            </Button>

            <Button 
                btnType="Success"
                clicked={props.checkoutContinued}>
                Continue
            </Button>
        </div>
    );
}

export default CheckoutSummary;