import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './HOC/Layout/Layout'; 
// import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
// import Orders from './Containers/Orders/Orders';
import Spinner from './Components/UI/Spinner/Spinner';

// import AsyncComponent from './HOC/AsyncComponent/AsyncComponent';
// const Orders = AsyncComponent(() => import('./Containers/Orders/Orders'));
const Orders = lazy(() => import('./Containers/Orders/Orders'));
const BurgerBuilder = lazy(() => import('./Containers/BurgerBuilder/BurgerBuilder'));
const Checkout = lazy(() => import('./Containers/Checkout/Checkout'));

class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route
                        path="/orders"
                        render={props => (
                            <Suspense
                                fallback={<Spinner />}>
                                <Orders {...props} />
                            </Suspense>)
                        }/>
                    
                    <Route
                        path="/checkout"
                        render={props => (
                            <Suspense
                                fallback={<Spinner />}>
                                <Checkout {...props} />
                            </Suspense>)
                        }/>
                    
                    <Route
                        path="/burger-builder"
                        render={props => (
                            <Suspense
                                fallback={<Spinner />}>
                                <BurgerBuilder {...props} />
                            </Suspense>)
                        }/>
                    
                    <Redirect from="/" to="/burger-builder" />
                </Switch>
            </Layout>
        );
    }
}

export default App;
