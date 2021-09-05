import Restaurant from "../../models/restaurant";
import { ORDERS, RESTAURANT_LOGIN } from "../../EndPoints";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LOGIN_METHOD = "LOGIN_METHOD";
export const GET_ORDER = "GET_ORDER";
export const SET_RESTAURANT = "SET_RESTAURANT";

export const loginMethod = (phone) => {
  console.log(phone);
  return async (dispatch) => {
    const response = await axios.post(RESTAURANT_LOGIN, { phone });
    let restaurant = response.data.data;
    console.log(restaurant);
    if (restaurant !== null) {
      dispatch({ type: LOGIN_METHOD, payload: restaurant });
    }
  };
};

export const setRestaurant = () => {
  return async (dispatch) => {
    AsyncStorage.getItem("restaurant").then((res) => {
      let restaurant = JSON.parse(res);
      if (restaurant !== null) {
        dispatch({ type: SET_RESTAURANT, payload: restaurant });
      }
    });
  };
};

export const getOrder = (restaurant) => {
  return async (dispatch) => {
    const response = await axios.get(ORDERS);
    let orders = response.data;
    if (Array.isArray(orders)) {
      let myOrders = orders.filter(function (e) {
        return e.restaurant_name === restaurant;
      });
      dispatch({ type: GET_ORDER, payload: myOrders });
    }
  };
};
