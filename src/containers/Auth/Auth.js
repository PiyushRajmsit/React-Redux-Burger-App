import React,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Styles from './Auth.css';
import { connect } from 'react-redux';
import actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'

class Auth extends Component{
    state = {
        controls : {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation : {
                    required : true,
                    isEmail : true
                },
                valid : false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation : {
                    required : true,
                    minLength : 6
                },
                valid : false,
                touched: false
            }

        },
        isSignup: true,
        showResult: false,
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignup);
        this.setState({showResult: true});
    }
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }
    checkError = () =>{
        if(!this.props.loading && this.props.error && this.state.showResult)
        {
            console.log(this.props.error,this.props.error.error.message);
            alert('Error: '+ this.props.error.error.message);
            this.setState({showResult : false});
        }
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} 
                        touched={formElement.config.touched}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        />
                ))}
                <Button btnType="Success">SUBMIT</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner></Spinner>
        }
        if(this.state.showResult)
        {
            this.checkError();
        }
        let loginSignUp = (
                <ul className={Styles.Label}>
                    <li onClick={this.switchAuthModeHandler} className={this.state.isSignup ? Styles.Active : ''}>Signup</li>
                    <li onClick={this.switchAuthModeHandler} className={this.state.isSignup ? '' : Styles.Active}>Login</li>
                </ul>);
        return(
            <div className={Styles.Auth}>
                {loginSignUp}
                {form}
            </div>

        )
    }
}

const mapStateToProps = state =>{
    return{
        loading : state.auth.loading,
        error : state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password , isSignup) => dispatch(actions.auth(email, password, isSignup))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);