import * as actionTypes from './actionsTypes';
import axios from 'axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const logout = (expirationTime) =>{
    return{
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) =>{
    return dispatch =>{
        setTimeout(() => {
            dispatch(logout());
        },
        expirationTime)
    }
};


export const authSuccess = (authData) => {
    
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email : email,
            password: password,
            returnSecureToken : true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB215UVib1C-l_s-WQ6SjUdp2wmwb6hKS4';
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB215UVib1C-l_s-WQ6SjUdp2wmwb6hKS4';
        }

        axios.post(url,authData)
        .then(response =>{
            console.log(response);
            dispatch(checkAuthTimeout(response.data.expiresIn));
            dispatch(authSuccess(response.data));
        }).catch(error =>{
            console.log(error);
            dispatch(authFail(error.response.data));
        });

    };
};
