import React from 'react';
import cssClasses from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => (
    <ul className={cssClasses.NavigationItems}>
        <NavigationItem
            link="/burger-builder">
            Burger Builder
        </NavigationItem>
        <NavigationItem
            link="/orders">
            Orders
        </NavigationItem>
    </ul>
);

export default NavigationItems;