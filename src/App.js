import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import actions from './store/actions/index';
import {connect} from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import {withRouter} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }
  render () {

    let route = (
      <Switch>
        <Route path="/auth" exact component={Auth}/>
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>
    );

    if(this.props.isAuthenticated){
      route=(<Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/"/>
      </Switch>)
    }
    return (
      <div>
        <Layout>
          {route}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAuthenticated: state.auth.token !== null
  }
}


const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignUp : () => dispatch(actions.authCheckState())
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
