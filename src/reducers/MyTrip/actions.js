import * as Types from "./actionTypes";
import callAPI from "../../utils/apiCaller";
import swal from "sweetalert";

export const actionGetMyTrip = () => {
    return dispatch => {
        return callAPI("api/users/my-trips", "GET", null)
            .then(res => {
                dispatch({
                    type: Types.GET_MY_OWN_TRIP,
                    payload: res.data
                });
            })
            .catch(err => {
                console.log(err.res);
            });
    };
};

export const actionFinishTrip = id => {
    return dispatch => {
        return callAPI(`api/trips/finish-trip/${id}`, "PUT", null)
            .then(res => {
                dispatch({
                    type: Types.FINISH_TRIP,
                    payload: res.data
                });
                swal({
                    text: "Chuyến Đi đã hoàn thành.",
                    icon: "success",
                    timer: 1500
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
};
