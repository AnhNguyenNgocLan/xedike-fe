import * as Types from "./actionTypes";

var initialState = {
    isLoading: true,
    data: {
        isFinished: false,
        _id: "",
        locationFrom: "",
        locationTo: "",
        startTime: null,
        availableSeats: "",
        fee: "",
        passengers: []
    }
};

// const findIndex = (trips, id) => {
//     return trips.findIndex(item => item.id === id);
// };

const trips = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_TRIPS:
            return {
                isLoading: false,
                data: action.payload
            };

        case Types.SEARCH_TRIPS:
            return {
                isLoading: false,
                data: action.payload
            };

        default:
            return state;
    }
};

export default trips;
