import React from "react";

import classes from "./OrderSummary.module.css";

const OrderSummary = (props) => {
  const ingSummary = Object.keys(props.ingredients).map((key) => (
    <li
      key={key + Math.random()}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        textTransform: "capitalize",
        textAlign: "center",
        padding: 0,
        margin: 0,
      }}
    >
      {key}:<strong>{props.ingredients[key]}</strong>
    </li>
  ));
  return (
    <>
      <h1>Your Order Summary</h1>
      <p>Here's the burger you ordered:</p>
      <ul
        style={{
          textAlign: "center",
          listStyle: "none",
          width: "20%",
          padding: 0,
          margin: 0,
          marginBottom: "1rem",
        }}
      >
        {ingSummary}
        <li
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            textTransform: "capitalize",
            textAlign: "center",
            borderTop: "1px solid black",
            paddingTop: "1rem",
            alignItems: "center",
          }}
        >
          Your order cost:<strong>{props.totalPrice}</strong>
        </li>
      </ul>
      <div
        style={{
          display: "flex",
          width: "20%",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            fontWeight: 700,
            color: "orangered",
            cursor: "pointer",
          }}
          onClick={props.placeOrder}
        >
          Continue
        </p>
        <p
          style={{ fontWeight: 700, color: "red", cursor: "pointer" }}
          onClick={props.cancel}
        >
          Cancel
        </p>
      </div>
    </>
  );
};

export default OrderSummary;
