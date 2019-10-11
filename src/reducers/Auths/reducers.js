import validateToken from "../../utils/validateToken";
import * as Types from "./actionTypes";

let initialState = {
    user: {},
    isAuthenticated: false
};

if (validateToken().status)
    initialState = { user: validateToken().decoded, isAuthenticated: true };

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN:
            return {
                user: action.payload,
                isAuthenticated: true
            };

        case Types.LOGOUT:
            return {
                user: {},
                isAuthenticated: false
            };

        default:
            break;
    }
    return state;
};

export default authReducer;
