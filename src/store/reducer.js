import * as actions from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
    purchaseable: false
};

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
};

const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
        .map(igKey => ingredients[igKey])
        .reduce((sum, el) => sum+el, 0);

    return sum > 0;
};

const reducer = (state=initialState, action) => {
    let name;
    let ingredients;

    switch(action.type) {
        case actions.ADD_INGREDIENT:
            name = action.ingredientName;
            ingredients = {
                ...state.ingredients,
                [name]: state.ingredients[name] + 1
            };

            return {
                ...state,
                ingredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[name],
                purchaseable: updatePurchaseState(ingredients)
            };

        case actions.REMOVE_INGREDIENT:
            name = action.ingredientName;
            ingredients = {
                ...state.ingredients,
                [name]: state.ingredients[name] - 1
            };

            return {
                ...state,
                ingredients,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[name],
                purchaseable: updatePurchaseState(ingredients)
            };

        default:
            return state;
    }
};

export default reducer;