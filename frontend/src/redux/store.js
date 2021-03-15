import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {medicamentsReducer} from "./reducers/medicamentsReducer";
import {generalReducer} from "./reducers/generalReducer";
const rootReducer = combineReducers({
  medicaments: medicamentsReducer,
  general: generalReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
