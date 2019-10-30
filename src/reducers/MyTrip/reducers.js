import * as Types from "./actionTypes";
import _ from "lodash";

var initialState = {
    isLoading: true,
    data: [
        {
            _id: "",
            locationFrom: "",
            locationTo: "",
            startTime: null,
            availableSeats: "",
            fee: "",
            driverID: {
                _id: "",
                fullName: "",
                rating: 0
            }
        }
    ]
};

// const findIndex = (trips, id) => {
//     return trips.findIndex(item => item.id === id);
// };

const mytrips = (state = initialState, action) => {
    switch (action.type) {       

        case Types.GET_MY_OWN_TRIP:
            return {
                isLoading: false,
                data: action.payload
            };

        case Types.FINISH_TRIP:
            let finishTrip = [...state.data];
            const findIndex = _.findIndex(finishTrip, trip => {
                return trip._id === action.payload._id;
            });

            finishTrip[findIndex].isFinished = action.payload.isFinished;

            return {
                isLoading: false,
                data: [...finishTrip]
            };

            return action.payload;
        default:
            return state;
    }
};

export default mytrips;
