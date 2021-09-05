import { GET_ORDER, LOGIN_METHOD, SET_RESTAURANT } from "../actions/actions";

let RESTAURANT = [];
const initialState = {
  restaurant: RESTAURANT,
};
const state = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_METHOD:
      return { ...state, restaurant: action.payload };
    case GET_ORDER:
      return { ...state, order: action.payload };
    case SET_RESTAURANT:
      console.log(action.types);
      return { ...state, restaurant: action.payload };
    default:
      return state;
  }
};
export default state;
