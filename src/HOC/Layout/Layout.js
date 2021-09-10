import React, { Component }from 'react';
import cssClasses from './Layout.css';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    sideDrawerClosedHandler = () => this.setState({ showSideDrawer: false });
    sideDrawerOpenHandler = () => this.setState({ showSideDrawer: true })
    sideDrawerToggleHandler = () => {
        this.setState(prevState => { 
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar 
                    toggleSideDrawer={this.sideDrawerToggleHandler} />

                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>

                <main className={cssClasses.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}
export default Layout;