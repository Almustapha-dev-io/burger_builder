import React from 'react';
import cssClasses from './Button.css';

const Button = props => (
    <button
        className={
            [
                cssClasses.Button, 
                cssClasses[props.btnType]
            ].join(' ')
        }
        onClick={props.clicked}>
        {props.children}
    </button>
);

export default Button;