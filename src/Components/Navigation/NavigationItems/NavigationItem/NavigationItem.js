import React from 'react';
import cssClasses from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = props => (
    <li className={cssClasses.NavigationItem}>
        <NavLink
            to={props.link}
            activeClassName={cssClasses.active}>
            {props.children}
        </NavLink>
    </li>
);

export default NavigationItem;