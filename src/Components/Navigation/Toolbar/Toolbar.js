import React from 'react';
import Logo from '../../Logo/Logo';
import cssClasses from './Toolbar.css';

const Toolbar = props => {
    return (
        <header className={cssClasses.Toolbar}>
            <div>MENU</div>
            <Logo />

            <nav>
                ...
            </nav>
        </header>
    );
};

export default Toolbar;