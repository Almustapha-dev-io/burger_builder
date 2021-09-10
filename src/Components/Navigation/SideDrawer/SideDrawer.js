import React from 'react';
import cssClasses from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../HOC/Auxiliary/Auxiliary';

const SideDrawer = props => {
    let classes = [cssClasses.SideDrawer, cssClasses.Close];

    if (props.open) {
        classes = [cssClasses.SideDrawer, cssClasses.Open];
    }

    return (
        <Aux>
            <div 
                className={classes.join(' ')}>
                <div className={cssClasses.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
            <Backdrop 
                show={props.open}
                clicked={props.closed} />
        </Aux>
    );
};

export default SideDrawer;