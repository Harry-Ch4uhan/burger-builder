import React from "react";
// import axios from "axios";

import SingleOrder from "../../components/Order/SingleOrder/SingleOrder";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class Orders extends React.Component {
  componentDidMount() {
    if (this.props.tokenId) {
      this.props.onLoadIngs(this.props.tokenId, this.props.userId);
    } else {
      return;
    }
  }

  render() {
    let loader = null;
    if (this.props.loading) {
      loader = (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      );
    }
    return (
      <>
        {loader}
        {this.props.orders.map((ele) => (
          <SingleOrder
            key={ele.id}
            ingredients={ele.ingredients}
            price={ele.price}
            name={ele.name}
          />
        ))}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    orders: state.orders,
    tokenId: state.token,
    userId: state.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadIngs: (tokenId, userId) =>
      dispatch(actions.retireveOrders(tokenId, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
