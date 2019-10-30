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

export const actionGetTripByID = id => {
    return dispatch => {
        return callAPI(`api/trips/${id}`, "GET", null)
            .then(res => {
                dispatch({
                    type: Types.GET_TRIP_BY_ID,
                    payload: res.data
                });
            })
            .catch(err => {
                console.log(err.response);
            });
    };
};

export const actionCreateTripRequest = (trip, callback) => {
    return dispatch => {
        return callAPI("api/trips", "POST", trip)
            .then(res => {
                swal({
                    text: "Tạo chuyến đi thành công",
                    icon: "success",
                    buttons: false,
                    timer: 1500
                }).then(() => {
                    dispatch({
                        type: Types.CREATE_TRIP,
                        payload: res.data
                    });
                    callback();
                });
            })
            .catch(err => {
                console.log(err.response);
            });
    };
};

// export const actionGetMyTrip = () => {
//     return dispatch => {
//         return callAPI("api/users/my-trips", "GET", null)
//             .then(res => {
//                 dispatch({
//                     type: Types.GET_MY_OWN_TRIP,
//                     payload: res.data
//                 });
//             })
//             .catch(err => {
//                 console.log(err.res);
//             });
//     };
// };


