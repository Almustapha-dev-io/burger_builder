import React from 'react';
import cssClasses from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import HamburgerButton from '../../UI/HamburgerButton/HamburgerButton';

const Toolbar = props => {
    return (
        <header className={cssClasses.Toolbar}>
            <div className={cssClasses.MobileOnly}>
                <HamburgerButton clicked={props.toggleSideDrawer}/>
            </div>
            
            <div className={cssClasses.Logo}>
                <Logo />
            </div>

            <nav className={cssClasses.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default Toolbar;