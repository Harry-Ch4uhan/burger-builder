import React from "react";
// import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as orderActions from "../../../store/actions/index";
import { Link } from "react-router-dom";

class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    phone: "",
    street: "",
    postal: "",
    deliveryMethod: "",
    noInfo: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    if (
      this.state.name !== "" &&
      this.state.email !== "" &&
      this.state.phone !== "" &&
      this.state.street !== "" &&
      this.state.postal !== ""
    ) {
      const order = {
        ingredients: this.props.ings,
        price: this.props.totalPrice,
        userId: this.props.userId,
        customer: {
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          address: {
            street: this.state.street,
            zipCode: this.state.postal,
          },
        },
        deliveryMethod: this.state.deliveryMethod,
      };
      if (this.props.token === null) {
      }
      this.props.onPlaceOrder(order, this.props.token, this.props.history);
    } else {
      this.setState({ noInfo: true });
    }
  };


  changeInputHandler = (event, stateName) => {
    this.setState({ [stateName]: event.target.value });
  };

  render() {
    let err = null;
    if (this.state.noInfo) {
      err = (
        <p style={{ color: "red", fontWeight: "600" }}>
          Please input all the details
        </p>
      );
    }

    let spinner = (
      <div style={{ width: "100%" }}>
        <h1 style={{ textAlign: "center" }}>Enter Your Contact Details</h1>

        <form className={classes.ContactData}>
          <input
            onChange={(event) => this.changeInputHandler(event, "name")}
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />
          <input
            onChange={(event) => this.changeInputHandler(event, "email")}
            type="email"
            name="email"
            placeholder="Your Mail"
            required
          />

          <input
            onChange={(event) => this.changeInputHandler(event, "phone")}
            type="text"
            name="phone"
            required
            placeholder="Your Contact Number"
          />
          <input
            onChange={(event) => this.changeInputHandler(event, "street")}
            type="text"
            name="street"
            required
            placeholder="Street"
          />
          <input
            onChange={(event) => this.changeInputHandler(event, "postal")}
            type="text"
            name="postal"
            required
            placeholder="Postal Code"
          />

          <select
            onChange={(event) =>
              this.changeInputHandler(event, "deliveryMethod")
            }
            required
            style={{ marginTop: "1rem" }}
          >
            <option>Regular</option>
            <option>Extra fast</option>
          </select>
          {err}
          {this.props.token === null ? (
            <Link
              to="/auth"
              style={{ textAlign: "center", textDecoration: "none" }}
            >
              Create an account to continue
            </Link>
          ) : (
            <button onClick={this.orderHandler} name="submit">
              Place the order
            </button>
          )}
          <button
            onClick={this.props.checkoutCancel}
            name="submit"
            className={classes.Cancel}
          >
            Cancel
          </button>
        </form>
      </div>
    );
    if (this.props.loading) {
      spinner = (
        <div>
          <Spinner />
        </div>
      );
    }
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {spinner}
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    loading: state.loading,
    token: state.token,
    userId: state.userId,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onPlaceOrder: (orderData, token, history) => {
      dispatch(orderActions.placePurchaseOrder(orderData, token, history));
    },
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(withRouter(ContactData));
