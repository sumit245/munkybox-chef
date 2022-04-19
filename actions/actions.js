import { ORDERS, RESTAURANT_LOGIN, RESTAURANT_URL } from "../EndPoints";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LOGIN_METHOD = "LOGIN_METHOD";
export const ENTRY_METHOD = "ENTRY_METHOD";
export const GET_ORDER = "GET_ORDER";
export const SET_RESTAURANT = "SET_RESTAURANT";
export const SET_STATUS = "SET_STATUS";

export const loginMethod = (phone, navigation) => async (dispatch) => {
  const response = await axios.post(RESTAURANT_LOGIN, { phone });
  const restaurant = await response.data.data;
  let enter = false;

  if (restaurant !== null && restaurant !== undefined) {
    try {
      const credential = await AsyncStorage.getItem("credential");
      dispatch({ type: LOGIN_METHOD, payload: restaurant });
      const { entry } = await JSON.parse(credential);
      enter = entry;
      dispatch({ type: ENTRY_METHOD, payload: entry });

      navigation.navigate("Main");
    } catch (error) {
      const entry = { entry: false };
      enter = entry;
      dispatch({ type: ENTRY_METHOD, payload: entry });
      navigation.navigate("Pin", { entry: entry });
    }
  } else {
    enter = false;
    alert(
      "You are not a registered chef!!! Please send a request to become partner"
    );
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
  let neworders = orders.filter(
    (item) => item.status === "pending" && item.restaurant === restaurant
  );
  if (orders !== null) {
    dispatch({ type: GET_ORDER, payload: neworders });
    
  }
};

export const editBankInfo = (id, bankInfo) => async (dispatch) => {
  const response = await axios.put(RESTAURANT_URL + id, bankInfo);
  const data = await response.data;
  await AsyncStorage.setItem("restaurant", JSON.stringify(data));
  dispatch({ type: SET_RESTAURANT, payload: data });
};
export const changeStatus = (id, status) => async (dispatch) => {
  const response = await axios.put(RESTAURANT_URL + id, status);
  const data = await response.data;
  await AsyncStorage.setItem("restaurant", JSON.stringify(data));
  dispatch({ type: SET_RESTAURANT, payload: data });
};
