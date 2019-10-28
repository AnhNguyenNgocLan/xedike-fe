import { combineReducers } from "redux";
import trips from "./Trip/reducers";
import authReducer from "./Auths/reducers";
import user from "./User/reducers";
import vehicle from "./Vehicle/reducer";

const appReducers = combineReducers({
    trips,
    authReducer,
    user,
    vehicle
});

export default appReducers;
