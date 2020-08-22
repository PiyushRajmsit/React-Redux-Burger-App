import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import actions from '../../store/actions/index'; 

class Orders extends Component {

    componentDidMount() {
        this.props.fetchAllOrders();
        // axios.get('/order.json')
        //     .then(res => {
        //         console.log(res);
        //         const fetchedOrders = [];
        //         for (let key in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             });
        //         }
        //         this.setState({loading: false, orders: fetchedOrders});
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         this.setState({loading: false});
        //     });
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
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchAllOrders : () => dispatch(actions.fetchOrder())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));