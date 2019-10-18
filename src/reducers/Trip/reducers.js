import * as Types from "./actionTypes";
import { stat } from "fs";

var initialState = {
    isLoading: true,
    data: [
        {
            isFinished: false,
            _id: "",
            locationFrom: "",
            locationTo: "",
            startTime: null,
            availableSeats: "",
            fee: "",
            passengers: []
        }
    ]
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

        case Types.GET_TRIP_BY_ID:            
            return {
                isLoading: false,
                data: action.payload
            };
        
        case Types.CREATE_TRIP:
            state.data.push(action.payload);

            return {
                isLoading: false,
                data: [...state.data]
            };

        default:
            return state;
    }
};

export default trips;
