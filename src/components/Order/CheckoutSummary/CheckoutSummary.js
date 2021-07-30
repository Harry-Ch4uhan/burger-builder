import React from "react";

import BurgerPreview from "../../BurgerPreview/BurgerPreview";
import classes from "./CheckoutSumm.module.css";

const CheckoutSummary = (props) => {
  // console.log(props);
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope this tastes good</h1>
      <BurgerPreview ingredients={props.ingredients} totalPrice={props.price} />
      {/* <button onClick={props.checkoutContinue}>Place Order</button>
      <button onClick={props.checkoutCancel}>Cancel</button> */}
    </div>
  );
};

export default CheckoutSummary;
