import * as Types from "./actionTypes";
import callAPI from "../../utils/apiCaller";
import swal from "sweetalert";

export const actionAddVehicle = (data, callback) => {
    return dispatch => {
        return callAPI("api/vehicles/add-vehicle", "POST", data)
            .then(res => {
                dispatch({
                    type: Types.ADD_NEW_VEHICLE,
                    payload: res.data
                });
                swal({
                    text: "Thêm xe thành công",
                    icon: "success",
                    buttons: false,
                    timer: 1500
                });
                callback();
            })
            .catch(err => {
                console.log(err.response);
            });
    };
};
