import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducer from "./reducers/reducer";
const initialState = {
  restaurant: [],
};
const store = createStore(reducer, initialState, applyMiddleware(ReduxThunk));
export default store;
