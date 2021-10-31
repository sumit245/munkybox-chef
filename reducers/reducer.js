import {
  GET_ORDER,
  LOGIN_METHOD,
  ENTRY_METHOD,
  SET_RESTAURANT,
  SET_STATUS,
} from "../actions/actions";

let RESTAURANT = [];
let ORDERS = [];
const initialState = {
  restaurant: RESTAURANT,
  orders: ORDERS,
  status: "",
  entry: true,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_METHOD:
      return { ...state, restaurant: action.payload };
    case ENTRY_METHOD:
      return {...state,entry:action.payload}
    case GET_ORDER:
      return { ...state, orders: action.payload };
    case SET_RESTAURANT:
      return { ...state, restaurant: action.payload };
    case SET_STATUS:
      return { ...state, status: action.payload };
    default:
      return state;
  }
}
