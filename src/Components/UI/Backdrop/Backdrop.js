import React from 'react';
import cssClasses from './Backdrop.css';

const Backdrop = props => (
    props.show ? 
        <div 
            className={cssClasses.Backdrop}
            onClick={props.clicked}>
        </div> : 
        null
);

export default Backdrop;