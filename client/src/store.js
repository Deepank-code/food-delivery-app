import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { mealReducer, mealDetailReducer } from "./reducers/mealReducers";

const reducer = combineReducers({
  meals: mealReducer,
  mealDetail: mealDetailReducer,
});

let initalState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
