import { GET_ORDER, LOGIN_METHOD, SET_RESTAURANT } from "../actions/actions";

let RESTAURANT = [];
const initialState = {
  restaurant: RESTAURANT,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_METHOD:
      console.log(action.type)
      return { ...state, restaurant: action.payload };
    case GET_ORDER:
      console.log(action.type)
      return { ...state, order: action.payload };
    case SET_RESTAURANT:
      console.log(action.type)
      return { ...state, restaurant: action.payload };
    default:
      return state;
  }
};
