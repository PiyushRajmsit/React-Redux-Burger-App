import * as actionTypes from '../actions/actionsTypes';

const initialState = {

    ingredients: null,
    totalPrice: 4,
    error: false
};
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const burgerBuilderReducer = (state = initialState,actions) =>{
    console.log('Reducer In Action',actions);
    switch(actions.type){
        case(actionTypes.ADD_INGREDIENTS): return{
            ...state,
            ingredients:{
                ...state.ingredients,
                [actions.ingredientsName] : state.ingredients[actions.ingredientsName] + 1
            },
            totalPrice : state.totalPrice + INGREDIENT_PRICES[actions.ingredientsName]

        }
        case(actionTypes.REMOVE_INGREDIENTS): return{
            ...state,
            ingredients :{
                ...state.ingredients,
                [actions.ingredientsName] : state.ingredients[actions.ingredientsName] - 1
            },
            totalPrice : state.totalPrice - INGREDIENT_PRICES[actions.ingredientsName]
        }
    case(actionTypes.SET_INGREDIENTS) : return{
            ...state,
            ingredients : actions.value,
            error: false,
            totalPrice: 4
        }
        case(actionTypes.FETCH_INGREDIENTS_FAILED): return{
            ...state,
            error: true
        }

        default: return state
    }
};

export default burgerBuilderReducer;