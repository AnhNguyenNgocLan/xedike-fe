import * as Types from "./actionTypes";
import callAPI from "../../utils/apiCaller";

export const actionFetchTripsRequest = () => {
    return dispatch => {
        return callAPI("api/trips", "GET", null)
            .then(res => {
                dispatch({
                    type: Types.FETCH_TRIPS,
                    payload: res.data
                });
            })
            .catch(err => {
                console.log(err.response);
            });
    };
};

export const actionSearchTrip = payload => {
    return {
        type: Types.SEARCH_TRIPS,
        payload
    };
};
