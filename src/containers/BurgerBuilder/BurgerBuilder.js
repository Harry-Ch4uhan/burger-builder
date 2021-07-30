import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Burger from "../../components/BurgerPreview/BurgerPreview";
import BurgerControls from "../../components/BurgerPreview/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/BurgerPreview/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionTypes from "../../store/actions/actionTypes";
import * as burgerBuilderActions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    ordering: false,
    loading: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  orderHandler = () => {
    this.setState({ ordering: true });
  };

  hideModalHandler = () => {
    this.setState({ ordering: false });
  };

  addToCartHandler = () => {
    this.props.history.push("/Checkout");
  };

  render() {
    const ingInfo = { ...this.props.ings };
    for (let key in ingInfo) {
      ingInfo[key] = ingInfo[key] <= 0;
    }

    let OrderSumm = false;
    let burger = (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Spinner />
      </div>
    );

    if (this.props.ings) {
      burger = (
        <>
          <Burger
            ingredients={this.props.ings}
            totalPrice={this.props.totalPrice}
          />

          <BurgerControls
            addedIng={this.props.onAddIngredients}
            lessIng={this.props.onRemoveIngredients}
            isDisabled={ingInfo}
            ordering={this.orderHandler}
          />
        </>
      );
      OrderSumm = (
        <OrderSummary
          ingredients={this.props.ings}
          cancel={this.hideModalHandler}
          totalPrice={this.props.totalPrice}
          placeOrder={this.addToCartHandler}
        />
      );
    }

    if (this.state.loading) {
      OrderSumm = <Spinner />;
    }

    return (
      <>
        <Modal show={this.state.ordering} hide={this.hideModalHandler}>
          {OrderSumm}
        </Modal>
        {burger}
      </>
    );
  }
}

// ////////////////////////  redux state config
const mapStatetoProps = (state) => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    onAddIngredients: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onRemoveIngredients: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(
  BurgerBuilder,
  axios
);
