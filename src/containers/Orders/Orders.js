import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import actions from '../../store/actions/index'; 

class Orders extends Component {

    componentDidMount() {
        this.props.fetchAllOrders(this.props.token);
    }

    render () { 
        let orders = <Spinner/>;
        if(!this.props.loading){
           orders = this.props.orders.map(order => (
            <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
            )); 
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        orders : state.order.orders,
        loading: state.order.loading,
        token : state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchAllOrders : (token) => dispatch(actions.fetchOrder(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));