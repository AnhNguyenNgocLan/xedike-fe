import * as Types from "./actionTypes";
import callAPI from "../../utils/apiCaller";
import setHeader from "../../utils/setHeader";
import jwtDecode from "jwt-decode";
import swal from "sweetalert";

export const actionLogin = (data, showErr) => {
    return dispatch => {
        return callAPI("api/users/login", "POST", data)
            .then(res => {
                const { token } = res.data;

                // Save token in local storage
                localStorage.setItem("token", token);

                //decode token -> dispatch authenticate in Reducer
                const decoded = jwtDecode(token);

                dispatch({
                    type: Types.LOGIN,
                    payload: decoded
                });

                swal({
                    text: "Đăng nhập thành công.",
                    icon: "success",
                    buttons: false,
                    timer: 1500
                });
                // Set param token in header for later requests (such as: login, reload page)
                //debugger;
                setHeader({ token });

                // Test token is added in header in trips request
                // callAPI("api/trips", "GET", null);
            })
            .catch(err => {
                showErr(err);
            });
    };
};

export const actionLogout = () => {
    return dispatch => {
        localStorage.removeItem("token");
        dispatch({
            type: Types.LOGOUT
        });
        setHeader({});
    };
};
