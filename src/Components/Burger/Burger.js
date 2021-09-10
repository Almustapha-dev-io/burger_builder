import React from 'react';
import cssClasses from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';

const Burger = props => {
    console.log(props, 'From Burger!');
    let addedIngredients = transformIngredients(props.ingredients);

    if (addedIngredients.length < 1) {
       addedIngredients = <p>Please start adding ingredients!</p>;
    }

    return (
        <div className={cssClasses.Burger}>
            <BurgerIngredient type="bread-top"/>
                {addedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

const transformIngredients = ingredients => { 
    const ingredientKeys = Object.keys(ingredients);

    return ingredientKeys
        .map(igKey => {
            return [...Array(ingredients[igKey])]
                .map((_, i) => {
                    return <BurgerIngredient 
                        key={igKey + i}
                        type={igKey} />
                });
        })
        .reduce((arr, el) => arr.concat(el), []);
}

export default withRouter(Burger);