import { ORDERS, RESTAURANT_LOGIN } from "../EndPoints";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LOGIN_METHOD = "LOGIN_METHOD";
export const GET_ORDER = "GET_ORDER";
export const SET_RESTAURANT = "SET_RESTAURANT";

export const loginMethod = (phone) => async (dispatch) => {
  const response = await axios.post(RESTAURANT_LOGIN, { phone });
  let restaurant = response.data.data;
  if (restaurant !== null) {
    dispatch({ type: LOGIN_METHOD, payload: restaurant });
  }
};

export const setRestaurant = () => async (dispatch) => {
  const response = await AsyncStorage.getItem("restaurant");
  let restaurant = await JSON.parse(response);

  if (restaurant !== null) {
    dispatch({ type: SET_RESTAURANT, payload: restaurant });
  }
};

export const getOrder = (restaurant) => async (dispatch) => {
  const response = await axios.get(ORDERS);
  let orders = response.data;
  if (Array.isArray(orders)) {
    let myOrders = orders.filter(function (e) {
      return e.restaurant_name === restaurant;
    });
    dispatch({ type: GET_ORDER, payload: myOrders });
  }
};
