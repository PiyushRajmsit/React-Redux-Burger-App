import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from  '../../../hoc/withErrorHandler/withErrorHandler'
import orderBuilder from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest'
            }
        },
        allowSubmit : false
    }

    checkFormSubmission = () =>{
        let isValid = true;
        for(let key in this.state.orderForm)
        {
            if(this.state.orderForm[key].valid !== undefined)
            {
                isValid = isValid && this.state.orderForm[key].valid;
            }
        }
        return isValid;
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        let isAllowed = this.state.allowSubmit;
        let isValid = this.checkFormSubmission();
        if(isValid !== isAllowed){
            this.setState({allowSubmit : isValid});
        }
        if(isValid === true)
        {
            const formData = {};
            for (let formElementIdentifier in this.state.orderForm) {
                formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
            }
            const order = {
                ingredients: this.props.ingredients,
                price: this.props.totalPrice,
                orderData: formData
            }
            this.props.orderHandler(order);
            // axios.post( '/order.json', order )
            //     .then( response => {
            //         this.setState( { loading: false } );
            //         this.props.history.push( '/' );
            //     } )
            //     .catch( error => {
            //         this.setState( { loading: false } );
            //     } );
        }
        else{
            alert('Invalid Input');
        }
    }

    checkValidity = (value,rules) =>
    {
        let valid = false;
        let minLength  = 4;
        let maxLength = 20;
        if(rules.required){
            if(value.trim() !== '' && value.length >= minLength && value.length <= maxLength)
            {
                valid = true;
            }
        }
        return valid;
    }

    inputChangedHandler = (event, inputIdentifier) => { 
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        if(updatedFormElement.validation &&  updatedFormElement.validation.required)
        {
            let valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
            if(updatedFormElement.valid !== valid){
                updatedFormElement.valid = valid;
            }
        }
        this.setState({orderForm: updatedOrderForm});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success">ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        orderHandler : (orderData) => dispatch(orderBuilder.purchaseBurger(orderData)) 
    }
}


const mapStateToProps = state =>{
    return{
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        
    }
}


export default connect(mapStateToProps,mapDispatchToProps )(withErrorHandler(ContactData,axios));