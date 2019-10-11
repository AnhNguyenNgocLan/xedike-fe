import { combineReducers } from "redux";
import trips from "./Trip/reducers";
import authReducer from "./Auths/reducers";
import user from "./User/reducers"

const appReducers = combineReducers({
    trips,
    authReducer,
    user
});

export default appReducers;
