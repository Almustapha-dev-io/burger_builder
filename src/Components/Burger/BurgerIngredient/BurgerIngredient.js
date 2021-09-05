import React from 'react';
import cssClasses from './BurgerIngredient.css';

const BurgerIngredient = props => getIngredientType(props.type);

const getIngredientType = (ingredient) => {
    const ingredientTypes = {
        'bread-bottom': <div className={cssClasses.BreadBottom}></div>,
        'bread-top': (
            <div className={cssClasses.BreadTop}>
                <div className={cssClasses.Seeds1}></div>
                <div className={cssClasses.Seeds2}></div>
            </div>
        ),
        'meat': <div className={cssClasses.Meat}></div>,
        'cheese': <div className={cssClasses.Meat}></div>,
        'salad': <div className={cssClasses.Chees}></div>,
        'bacon': <div className={cssClasses.Bacon}></div>
    }

    return ingredientTypes[ingredient] ? 
        ingredientTypes[ingredient] : 
        null;
}

export default BurgerIngredient;