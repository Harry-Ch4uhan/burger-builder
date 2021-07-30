import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router";
import { connect } from "react-redux";

import Layout from "../components/Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Checkout from "./Checkout/Checkout";
import Orders from "./Orders/Orders";
import Auth from "./Auth/Auth";
import Logout from "./Auth/Logout/logout";
import * as actions from "../store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }
  render() {
    return (
      <div style={{ marginTop: "5rem" }} className="App">
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/Checkout" exact component={Checkout} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/my-orders" exact component={Orders} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: () => dispatch(actions.authCheck()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
