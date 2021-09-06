import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import cssClasses from './BuildControls.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const BuildControls = props => {
    return (
        <div className={cssClasses.BuildControls}>
            <p>Current Price: <b>{props.price.toFixed(2)}</b></p>
            {
                controls.map(ctrl => (
                    <BuildControl 
                        key={ctrl.label} 
                        label={ctrl.label}
                        disabled={props.disabled}
                        added={() => props.ingredientAdded(ctrl.type)}
                        removed={() => props.ingredientRemoved(ctrl.type)} />
                ))
            }

            <button 
                className={cssClasses.OrderButton}
                disabled={!props.purchaseable}
                onClick={props.ordered}>
                Order Now
            </button>
        </div> 
    );
};

export default BuildControls;