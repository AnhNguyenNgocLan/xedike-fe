import * as Types from "./actionTypes";
import callAPI from "../../utils/apiCaller";
import swal from "sweetalert";

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
                    text: "Cập Nhật thành công",
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

export const actionUploadUserAvatar = (id, data, config, callback) => {
    return dispatch => {
        return callAPI(`api/users/upload-avatar/${id}`, "POST", data, config)
            .then(res => {
                dispatch({
                    type: Types.UPLOAD_USER_AVATAR,
                    payload: res.data
                });
                swal({
                    text: "Đổi hình đại diện thành công",
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

export const ratingDriver = (id, data) => {
    return dispatch => {
        return callAPI(`api/users/rating/${id}`, "PUT", { rating: data })
            .then(res => {
                dispatch({
                    type: Types.RATING,
                    payload: res.data
                });
                swal({
                    text: "Cảm ơn bạn đã đánh giá",
                    icon: "success",
                    buttons: false,
                    timer: 1500
                });
            })
            .catch(err => {
                if (err.response.status === 401) {
                    return swal({
                        text: "Bạn phải đăng nhập để đánh giá",
                        icon: "error",
                        buttons: false,
                        timer: 1500
                    });
                }
                console.log(err.response);
            });
    };
};
