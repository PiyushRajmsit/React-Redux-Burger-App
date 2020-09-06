import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess = (id,order) => {
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderData: order,
        orderId : id
    }
}

export const purchaseBurgerFail = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}
export const purchaseBurgerStart = () =>{
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseInit = () =>{
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurger = (orderData,token) =>{
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/order.json?auth='+ token, orderData )
        .then( response => {
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
        } )
        .catch( error => {
            dispatch(purchaseBurgerFail(error));
        } );
    }
}

export const fetchOrdersStart = () =>{
    return{
        type: actionTypes.FETCH_ORDER_START
    }
}
export const fetchOrdersSuccess = (fetchedOrders) =>{
    return{
        type: actionTypes.FETCH_ORDER_SUCCESS,
        order: fetchedOrders
    }
}
export const fetchOrdersFail = () =>{
    return{
        type: actionTypes.FETCH_ORDER_FAIL
    }
}
export const fetchOrder = (token) =>{
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('/order.json?auth='+ token)
            .then(res => {
                console.log(res);
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFail());
            });
    }

}