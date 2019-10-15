import * as Types from "./actionTypes";
import callAPI from "../../utils/apiCaller";
import swal from "sweetalert";

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

export const actionCreateTripRequest = (trip, showErr) => {
    return dispatch => {
        return callAPI("api/trips", "POST", trip)
            .then(res => {
                dispatch({
                    type: Types.CREATE_TRIP,
                    payload: res.data
                });
                swal({
                    text: "Tạo chuyến đi thành công",
                    icon: "success",
                    buttons: false,
                    timer: 1500
                });
            })
            .catch(err => {
                showErr(err);
            });
    };
};
