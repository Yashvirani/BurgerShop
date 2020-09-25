import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = props =>  {

    const { onFetchOrders } = props;

    useEffect(() => {
      onFetchOrders(props.token,props.userId);
    },[onFetchOrders]);



      let orders = <Spinner />;

      if (!props.loading){
        orders = (
          <div>
              {props.orders.map(order => (
                  <Order
                      key={order.id}
                      ingredients={order.ingredients}
                      price={order.price} />
              ))}
          </div>
        );
      }
        return (
            <div>
              {orders}
            </div>
        );

}
const mapStatetoProps = state => {
  return {
    orders:state.order.orders,
    loading:state.order.loading,
    token:state.auth.token,
    userId:state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
  };
};

export default connect(mapStatetoProps,mapDispatchToProps)(withErrorHandler(orders, axios));