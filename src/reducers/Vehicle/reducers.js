import * as Types from "./actionTypes";

var initialState = [];

const vehicle = (state = initialState, action) => {
    switch (action.type) {
        case Types.ADD_NEW_VEHICLE:
            return action.payload;

        default:
            return state;
    }
};

export default vehicle;
