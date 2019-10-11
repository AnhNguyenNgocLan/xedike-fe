import React, { Component } from "react";
import { ModalCustom, UserType } from "../styled";
import { Input, Button, DatePicker, Icon, Form } from "antd";
import * as Yup from "yup";
import { withFormik, Form as FormikForm, Field } from "formik";
import apiCaller from "../../../utils/apiCaller";
import Passenger from "../../../assets/images/signup_passenger.png";
import Driver from "../../../assets/images/signup_driver.png";
import swal from "sweetalert";

const FormItem = Form.Item;

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            signUpModal,
            signUpVisible,
            signInModal,
            touched,
            errors,
            handleSubmit,
            setFieldValue,
            values
        } = this.props;

        //console.log(this.props);
        return (
            <ModalCustom
                title={
                    <>
                        <h3 className="modal-title text-center">Đăng Ký</h3>
                        <p className="text-center mb-0">
                            Bạn có tài khoản chưa?{" "}
                            <span
                                className="cursor-point text-primary"
                                onClick={() => signInModal(true)}
                            >
                                Đăng Nhập
                            </span>
                        </p>
                    </>
                }
                footer={[null, null]}
                visible={signUpVisible}
                onCancel={() => signUpModal(false)}
            >
                <FormikForm onSubmit={handleSubmit}>
                    <FormItem
                        validateStatus={
                            touched.email && errors.email && "error"
                        }
                        help={touched.email && errors.email}
                    >
                        <label className="mb-0">Email</label>
                        <Field
                            name="email"
                            render={({ field }) => (
                                <Input
                                    suffix={
                                        <Icon
                                            type="mail"
                                            style={{
                                                color: "rgba(0,0,0,.25)"
                                            }}
                                        />
                                    }
                                    type="email"
                                    size="large"
                                    placeholder="Nhập email..."
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        validateStatus={
                            touched.fullName && errors.fullName && "error"
                        }
                        help={touched.fullName && errors.fullName}
                    >
                        <label className="mb-0">Họ Tên</label>
                        <Field
                            name="fullName"
                            render={({ field }) => (
                                <Input
                                    suffix={
                                        <Icon
                                            type="user"
                                            style={{
                                                color: "rgba(0,0,0,.25)"
                                            }}
                                        />
                                    }
                                    type="text"
                                    size="large"
                                    placeholder="Nhập Tên đầy đủ..."
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    <div className="row">
                        <div className="col-6">
                            <FormItem
                                validateStatus={
                                    touched.password &&
                                    errors.password &&
                                    "error"
                                }
                                help={touched.password && errors.password}
                            >
                                <label className="mb-0">Mật Khẩu</label>
                                <Field
                                    name="password"
                                    render={({ field }) => (
                                        <Input.Password
                                            type="password"
                                            size="large"
                                            placeholder="Nhập mật khẩu..."
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                        </div>
                        <div className="col-6">
                            <FormItem
                                validateStatus={
                                    touched.confirmPassword &&
                                    errors.confirmPassword &&
                                    "error"
                                }
                                help={
                                    touched.confirmPassword &&
                                    errors.confirmPassword
                                }
                            >
                                <label className="mb-0">Xác Minh Mật Khẩu</label>
                                <Field
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <Input.Password
                                            type="password"
                                            size="large"
                                            placeholder="Xác minh mật khẩu..."
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <FormItem
                                validateStatus={
                                    touched.phoneNumber &&
                                    errors.phoneNumber &&
                                    "error"
                                }
                                help={touched.phoneNumber && errors.phoneNumber}
                            >
                                <label className="mb-0">Số Điện Thoại</label>
                                <Field
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <Input
                                            suffix={
                                                <Icon
                                                    type="phone"
                                                    style={{
                                                        color: "rgba(0,0,0,.25)"
                                                    }}
                                                />
                                            }
                                            type="text"
                                            size="large"
                                            placeholder="Nhập số điện thoại..."
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                        </div>
                        <div className="col-6">
                            <FormItem
                                validateStatus={
                                    touched.dayOfBirth &&
                                    errors.dayOfBirth &&
                                    "error"
                                }
                                help={touched.dayOfBirth && errors.dayOfBirth}
                            >
                                <label className="mb-0">Ngày Sinh</label>
                                <DatePicker
                                    value={values.dayOfBirth}
                                    format="DD/MM/YYYY"
                                    size="large"
                                    className="d-block"
                                    name="dayOfBirth"
                                    onChange={value =>
                                        setFieldValue("dayOfBirth", value)
                                    }
                                />
                            </FormItem>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <label className="mb-3 mt-2">Bạn Là?</label>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    <FormItem
                                        validateStatus={
                                            touched.userType &&
                                            errors.userType &&
                                            "error"
                                        }
                                        help={
                                            touched.userType && errors.userType
                                        }
                                    >
                                        <UserType>
                                            <Field
                                                name="userType"
                                                render={({ field }) => (
                                                    <input
                                                        type="radio"
                                                        {...field}
                                                        value="passenger"
                                                        checked={
                                                            values.userType ===
                                                            "passenger"
                                                        }
                                                    />
                                                )}
                                            />
                                            <div className="label-wrapper">
                                                <img
                                                    src={Passenger}
                                                    alt="Hành khách"
                                                />
                                                <strong className="text-center d-block">
                                                        Hành Khách
                                                </strong>
                                            </div>
                                        </UserType>
                                    </FormItem>
                                </div>
                                <div className="col-6">
                                    <FormItem>
                                        <UserType>
                                            <Field
                                                name="userType"
                                                render={({ field }) => (
                                                    <input
                                                        type="radio"
                                                        {...field}
                                                        value="driver"
                                                        checked={
                                                            values.userType ===
                                                            "driver"
                                                        }
                                                    />
                                                )}
                                            />
                                            <div className="label-wrapper">
                                                <img
                                                    src={Driver}
                                                    alt="Tài Xế"
                                                />
                                                <strong className="text-center d-block">
                                                    Tài Xế
                                                </strong>
                                            </div>
                                        </UserType>
                                    </FormItem>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <Button
                            type="primary"
                            size="large"
                            block
                            htmlType="submit"
                        >
                            Đăng Ký
                        </Button>
                    </div>
                </FormikForm>
            </ModalCustom>
        );
    }
}

export default withFormik({
    mapPropsToValues() {
        // Init form field
        return {
            email: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            dayOfBirth: undefined,
            userType: ""
        };
    },
    validationSchema: Yup.object().shape({
        // Validate form field
        email: Yup.string()
            .required("Nhập Email.")
            .email("Email không hợp lệ."),
        fullName: Yup.string()
            .required("Nhập Họ Tên.")
            .min(2, "Họ Tên có ít nhất 2 ký tự"),
        password: Yup.string().required("Nhập Mật Khẩu."),
        confirmPassword: Yup.string()
            .required("Nhập Mật Khẩu.")
            .oneOf(
                [Yup.ref("password"), null],
                "Hai mật khẩu phải giống nhau."
            ),
        phoneNumber: Yup.string().required("Nhập số điện thoại."),
        dayOfBirth: Yup.string().required("Nhập ngày sinh."),
        userType: Yup.string().required("Chọn vai trò.")
    }),
    handleSubmit: (values, { resetForm, props, setFieldError }) => {
        apiCaller("api/users/register", "POST", values)
            .then(res => {
                if (res.status === 200) {
                    swal({
                        text: "Đăng ký thành công!",
                        icon: "success",
                        buttons: false,
                        timer: 1500
                    }).then(() => {
                        resetForm();
                        props.signUpModal(false);
                        props.signInModal(true);
                    });
                }
            })
            .catch(err => {
                setFieldError("email", err.response.data.email);
                setFieldError("phone", err.response.data.phone);
            });
    }
})(SignUpForm);
