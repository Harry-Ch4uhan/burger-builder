import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  checkoutContinue = () => {
    this.props.history.replace("/my-orders");
    console.log(this.props.ingredients);
  };
  checkoutCancel = () => {
    this.props.history.goBack();
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      summary = (
        <div>
          <CheckoutSummary
            price={this.props.totalPrice}
            ingredients={this.props.ingredients}
          />
          <ContactData
            checkoutContinue={this.checkoutContinue}
            checkoutCancel={this.checkoutCancel}
            ingredients={this.props.ingredients}
            price={this.props.totalPrice}
            {...this.props}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStatetoProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

export default connect(mapStatetoProps)(Checkout);
