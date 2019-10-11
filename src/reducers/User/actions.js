import * as Types from "./actionTypes";
import callAPI from "../../utils/apiCaller";
import swal from 'sweetalert';

export const actionGetUserDetailRequest = id => {
    return dispatch => {
        return callAPI(`api/users/${id}`, "GET", null)
            .then(res => {
                dispatch({
                    type: Types.GET_USER_DETAILS,
                    payload: res.data
                });
            })
            .catch(err => {
                console.log(err.response);
            });
    };
};

export const actionUpdateUserDetailRequest = (id, data, showErr) => {
    return dispatch => {
        return callAPI(`api/users/${id}`, "PUT", data)
            .then(res => {
                dispatch({
                    type: Types.UPDATE_USER_DETAILS,
                    payload: res.data
                });
                swal({
                    text: 'Cập Nhật thành công',
                    icon: 'success',
                    buttons: false,
                    timer: 1500
                });
            })
            .catch(err => {
                showErr(err);
            });
    };
};

