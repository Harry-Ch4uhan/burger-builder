import axios from "axios";
import * as actionTypes from "./actionTypes";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ings) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ings: ings,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get(
        "///"
      )
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch(() => {
        dispatch(setIngredients({ salad: 0, bacon: 0, cheese: 0, meat: 1 }));
      });
  };
};
