import axios from "axios";
import * as actionTypes from "./actionTypes";

//////////////////////////////////////////////////////////// Place Orders
export const purchaseStart = () => {
  return {
    type: actionTypes.START_PURCHASE,
  };
};

export const purchaseSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    id: id,
    orderData: orderData,
  };
};

export const purchaseFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_FAILED,
    error: error,
  };
};

export const placePurchaseOrder = (orderData, token, history) => {
  return (dispatch) => {
    dispatch(purchaseStart());
    axios
      .post(
        "/////" +
          token,
        orderData
      )
      .then((res) => {
        dispatch(purchaseSuccess(res.data, orderData));
        history.replace("/");
      })
      .catch((err) => dispatch(purchaseFailed(err)));
  };
};

//////////////////////////////////////////////////////////// Retrieve Orders

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.RETRIEVE_ORDERS,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.RETRIEVE_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.RETRIEVE_ORDERS_FAILED,
    error: error,
  };
};

export const retireveOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get(
        "//////////" +
          queryParams
      )
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            id: key,
            ingredients: res.data[key].ingredients,
            price: res.data[key].price,
            name: res.data[key].customer.name,
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFailed(err));
      });
  };
};
