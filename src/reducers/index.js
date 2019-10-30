import { combineReducers } from "redux";
import trips from "./Trip/reducers";
import authReducer from "./Auths/reducers";
import user from "./User/reducers";
import vehicle from "./Vehicle/reducers";
import mytrips from "./MyTrip/reducers";

const appReducers = combineReducers({
    trips,
    authReducer,
    user,
    vehicle,
    mytrips
});

export default appReducers;
