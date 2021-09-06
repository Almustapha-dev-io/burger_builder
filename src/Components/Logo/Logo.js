import React from 'react';
import cssClasses from './Logo.css';
import burgerLogo from '../../Assets/Images/Logo.png';

const Logo = props => (
    <div className={cssClasses.Logo}>
        <img src={burgerLogo} alt="My BUrger" />
    </div>
);

export default Logo;