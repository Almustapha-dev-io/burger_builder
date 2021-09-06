import React from 'react';
import cssClasses from './BuildControl.css';

const BuildControl = props => (
    <div className={cssClasses.BuildControl}>
        <div className={cssClasses.Label}>{props.label}</div>
        
        <button 
            className={cssClasses.Less}
            onClick={props.removed}>
            Less
        </button>

        <button 
            className={cssClasses.More}
            onClick={props.added}>
            More
        </button>
    </div>
);

export default BuildControl;