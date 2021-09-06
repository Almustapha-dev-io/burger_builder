import React from 'react';
import PropTypes from 'prop-types';
import cssClasses from './BurgerIngredient.css';

const BurgerIngredient = props => getIngredientType(props.type);

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

const getIngredientType = ingredient => {
    const ingredientTypes = {
        'bread-bottom': <div className={cssClasses.BreadBottom}></div>,
        'bread-top': (
            <div className={cssClasses.BreadTop}>
                <div className={cssClasses.Seeds1}></div>
                <div className={cssClasses.Seeds2}></div>
            </div>
        ),
        'meat': <div className={cssClasses.Meat}></div>,
        'cheese': <div className={cssClasses.Cheese}></div>,
        'salad': <div className={cssClasses.Salad}></div>,
        'bacon': <div className={cssClasses.Bacon}></div>
    }

    return ingredientTypes[ingredient] ? 
        ingredientTypes[ingredient] : 
        null;
}

export default BurgerIngredient;