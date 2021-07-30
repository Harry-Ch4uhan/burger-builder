import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 5,
  error: false,
  orders: [],
  loading: false,
  auth: false,
  authErr: null,
  token: null,
  userId: null,
};

const INGPRICES = {
  meat: 1.2,
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.5,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //////////////////////////////////////Ingredients actions
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGPRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGPRICES[action.ingredientName],
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ings,
        totalPrice: 5,
        error: false,
      };
    //////////////////////////////////////Purchase actions
    case actionTypes.START_PURCHASE:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_SUCCESS:
      const newOrder = {
        ...action.id,
        ...action.orderData,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
      };
    case actionTypes.PURCHASE_FAILED:
      return {
        ...state,
        loading: false,
      };
    //////////////////////////////////////Display Orders actions
    case actionTypes.RETRIEVE_ORDERS:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.RETRIEVE_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case actionTypes.RETRIEVE_ORDERS_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    /////////////////////////////////////////authentication
    case actionTypes.AUTH_USER:
      return {
        ...state,
        authErr: null,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        auth: true,
        token: action.token,
        userId: action.userId,
        loading: false,
      };
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        authErr: action.error,
        loading: false,
      };
    case actionTypes.CLEAR_LOGIN:
      return {
        ...state,
        orders: [],
        loading: false,
        auth: false,
        authErr: null,
        token: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default reducer;
