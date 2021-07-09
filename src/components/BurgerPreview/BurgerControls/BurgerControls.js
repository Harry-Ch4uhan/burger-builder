import React from "react";

import BurgerControl from "./Burger Control/BurgerControl";
import classes from "./BurgerControls.module.css";

const controlObj = [
  { label: "Meat", type: "meat" },
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
];

const BurgerControls = (props) => {
  return (
    <div className={classes.BurgerControls}>
      {controlObj.map((ctrl) => (
        <BurgerControl
          label={ctrl.label}
          key={ctrl.label}
          less={() => props.lessIng(ctrl.type)}
          added={() => props.addedIng(ctrl.type)}
          disabled={props.isDisabled[ctrl.type]}
        ></BurgerControl>
      ))}
      <div
        className={classes.OrderButton}
        onClick={props.ordering}
        disabled={true}
      >
        Order Now
      </div>
    </div>
  );
};
export default BurgerControls;
