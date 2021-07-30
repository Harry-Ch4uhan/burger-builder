import React from "react";

import classes from "./SingleOrder.module.css";

const SingleOrder = (props) => {
  console.log(props);
  const ingredients = [];
  for (let ing in props.ingredients) {
    ingredients.push({ name: ing, ings: props.ingredients[ing] });
  }

  const printIngs = ingredients.map((ig) => {
    return (
      <span
        style={{
          marginLeft: "1rem",
          display: "inline-block",
          textTransform: "capitalize",
          border: "1px solid grey",
          padding: "0.2rem",
        }}
      >
        {ig.name}({ig.ings})
      </span>
    );
  });

  return (
    <div className={classes.SingleOrder}>
      <p>ingredients: {printIngs}</p>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <p>Price: {props.price}</p>
        <p>
          Ordered By: <strong>{props.name}</strong>
        </p>
      </div>
    </div>
  );
};

export default SingleOrder;
