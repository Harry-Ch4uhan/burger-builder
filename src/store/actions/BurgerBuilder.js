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
        "https://burger-builder-f3576-default-rtdb.firebaseio.com/ingredients.json"
        // {
        //   headers: {
        //     "Access-Control-Allow-Origin": "http://localhost:3000/",
        //     "Referrer-Policy": "origin",
        //   },
        // }
      )
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch(() => {
        dispatch(setIngredients({ salad: 0, bacon: 0, cheese: 0, meat: 1 }));
      });
  };
};

// "https://burger-builder-3162c-default-rtdb.firebaseio.com/Ingredients";
// initIngredients({ bacon: 0, meat: 1, cheese: 0, salad: 0
// {
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//           },
//         }
