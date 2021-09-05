import React from 'react';
import Aux from '../../HOC/Auxiliary';
import cssClasses from './Layout.css';

const Layout = props => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={cssClasses.Content}>
            {props.children}
        </main>
    </Aux>
);

export default Layout;