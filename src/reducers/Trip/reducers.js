import * as Types from "./actionTypes";

var initialState = [];

// const findIndex = (trips, id) => {
//     return trips.findIndex(item => item.id === id);
// };

const trips = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_TRIPS:
            //state = action.payload;
            // return [...state];
            return action.payload;

        case Types.SEARCH_TRIPS:
            state = action.payload;
            return [...state];

        default:
            return state;
    }
};

export default trips;
