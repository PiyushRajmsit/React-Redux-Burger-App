import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';
export const addIngredients = (ingName) =>{
    return{
        type : actionTypes.ADD_INGREDIENTS,
        ingredientsName : ingName

    }
}

export const removeIngredients = (ingName) =>{
    return{
        type : actionTypes.REMOVE_INGREDIENTS,
        ingredientsName : ingName
    }
}

export const setIngredients = (ingredients) =>{
    return {
        type : actionTypes.SET_INGREDIENTS,
        value : ingredients
    }   
}

export const fetchIngredientsFailed = () =>{
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}


export const initIngredients = () =>{
    return dispatch => {
        axios.get( '/ingredients.json' )
            .then( response => {
                console.log(response);
                dispatch(setIngredients(response.data));
            } )
            .catch( error => {
                console.log(error);
                fetchIngredientsFailed();
            } );
    }
}