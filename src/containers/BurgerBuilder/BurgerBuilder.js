import React, { Component } from "react";

import Burger from "../../components/BurgerPreview/BurgerPreview";
import BurgerControls from "../../components/BurgerPreview/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/BurgerPreview/OrderSummary/OrderSummary";
import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGPRICES = {
  meat: 1.2,
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.5,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 5,
    purchasable: false,
    ordering: false,
    loading: false,
  };

  componentDidMount() {
    axios
      .get(
        "https://burger-builder-3162c-default-rtdb.firebaseio.com/Ingredients"
      )
      .then((Response) => this.setState({ ingredients: Response.data }))
      .catch(() => {
        this.setState({
          ingredients: {
            salad: 0,
            meat: 1,
            bacon: 0,
            cheese: 0,
          },
        });
      });
  }

  purchaseCheck(ings) {
    let newThing = Object.keys(ings)
      .map((key) => ings[key])
      .reduce((sum, cur) => sum + cur, 0);
    this.setState({ purchasable: newThing <= 0 });
  }

  addIngHandler = (type) => {
    let oldQuantity = this.state.ingredients[type];
    let oldIngs = { ...this.state.ingredients };
    oldIngs[type] = oldQuantity + 1;

    let addPrice = INGPRICES[type];
    this.setState({
      ingredients: oldIngs,
      totalPrice: this.state.totalPrice + addPrice,
    });
    this.purchaseCheck(oldIngs);
  };

  lessIngHandler = (type) => {
    let oldQuantity = this.state.ingredients[type];
    if (oldQuantity <= 0) {
      return;
    }
    let oldIngs = { ...this.state.ingredients };
    oldIngs[type] = oldQuantity - 1;

    let lessPrice = INGPRICES[type];
    this.setState({
      ingredients: oldIngs,
      totalPrice: this.state.totalPrice - lessPrice,
    });
    this.purchaseCheck(oldIngs);
  };

  orderHandler = () => {
    this.setState({ ordering: true });
  };

  addToCartHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Harry",
        address: "Your Home",
        email: "harsh58585@gmail.com",
      },
      deliveryMethod: "fastest",
    };

    axios
      .post("/orders.json", order)
      .then((Response) => {
        console.log(Response);
        this.setState({ loading: false, ordering: false });
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong!");
        this.setState({ loading: false, ordering: false });
      });
  };

  hideModalHandler = () => {
    this.setState({ ordering: false });
  };

  render() {
    const ingInfo = { ...this.state.ingredients };
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

    if (this.state.ingredients) {
      burger = (
        <>
          <Burger
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
          />

          <BurgerControls
            lessIng={this.lessIngHandler}
            addedIng={this.addIngHandler}
            isDisabled={ingInfo}
            ordering={this.orderHandler}
            purchasable={this.state.purchasable}
          />
        </>
      );
      OrderSumm = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancel={this.hideModalHandler}
          totalPrice={this.state.totalPrice}
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

export default BurgerBuilder;
