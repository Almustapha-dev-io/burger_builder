import React from 'react';
import cssClasses from './HamburgerButton.css';

const HamburgerButton = props => (
    <button 
        onClick={props.clicked}
        className={cssClasses.HamburgerButton}>
        <span></span>
        <span></span>
        <span></span>
    </button>
);

export default HamburgerButton;