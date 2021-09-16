import { GET_ORDER, LOGIN_METHOD, SET_RESTAURANT } from "../actions/actions";


let RESTAURANT = [];
let ORDERS=[];
const initialState = {
  restaurant: RESTAURANT,
  orders:ORDERS
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_METHOD:
      console.log(action.type)
      return { ...state, restaurant: action.payload };
    case GET_ORDER:
      console.log(action.payload)
      return { ...state, orders: action.payload };
    case SET_RESTAURANT:
      return { ...state, restaurant: action.payload };
    default:
      return state;
  }
};
