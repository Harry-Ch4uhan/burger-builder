import React from "react";

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";

const burger = (props) => {
  // console.log(props.ingredients);
  let recievedIngs = Object.keys(props.ingredients).map((igKey) =>
    [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey}></BurgerIngredient>;
    })
  );

  const ingLength = recievedIngs.reduce((sum, ing) => {
    return sum + ing;
  }, []);

  if (ingLength < 1) recievedIngs = "Please add some ingredients";

  return (
    <div className={classes.burgerPreview}>
      <div className={classes.burger}>
        <BurgerIngredient type="top-bread"></BurgerIngredient>
        {recievedIngs}
        <BurgerIngredient type="bottom-bread"></BurgerIngredient>
      </div>
      <p>
        Total Price:<strong>{props.totalPrice}</strong>
      </p>
    </div>
  );
};

export default burger;
