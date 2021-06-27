import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import favReducer from "./reducers/favReducer";

const rootReducer = combineReducers({
  user: userReducer,
  fav: favReducer,
});

export default rootReducer;
