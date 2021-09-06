import React from 'react';
import cssClasses from './Layout.css';
import Aux from '../../HOC/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = props => (
    <Aux>
        <Toolbar />
        <main className={cssClasses.Content}>
            {props.children}
        </main>
    </Aux>
);

export default Layout;