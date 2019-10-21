import React, { Component } from "react";
import { Form, Input, Button, Icon } from "antd";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import callAPI from "../../../utils/apiCaller";
import swal from "sweetalert";

const FormItem = Form.Item;

class MyPassword extends Component {
    render() {
        const { id } = this.props;

        return (
            <Formik
                enableReinitialize={true}
                initialValues={{
                    password: "",
                    newPassword: "",
                    confirmNewPassword: ""
                }}
                validationSchema={Yup.object().shape({
                    // Validate form field
                    password: Yup.string().required("Nhập Mật Khẩu."),
                    newPassword: Yup.string().required("Nhập mật khẩu mới."),
                    confirmNewPassword: Yup.string()
                        .required("Nhập Mật Khẩu.")
                        .oneOf(
                            [Yup.ref("newPassword"), null],
                            "Mật khẩu không trùng nhau."
                        )
                })}
                onSubmit={(values, { resetForm, props, setFieldError }) => {
                    callAPI(`api/users/password/${id}`, "PUT", values).then(res => {
                        if (res.status === 200) {
                            swal({
                                text: "Cập nhật thành công!",
                                icon: "success",
                                buttons: false,
                                timer: 1500
                            }).then(() => {
                                resetForm();                               
                            });
                        }
                    })
                    .catch(err => {
                        Object.keys(err.response.data).forEach(field => {
                            setFieldError(field, err.response.data[field]);
                        });                       
                    });
                    
                }}
                render={({                    
                    touched,
                    errors,
                    handleSubmit
                }) => (
                    <form
                        onSubmit={handleSubmit}
                        className="trip-booking__form"
                    >
                        <div className="row">
                            <div className="col-3 text-right">
                                <label className="mb-0 ant-form-item-required">
                                    Mật Khẩu Cũ
                                </label>
                            </div>
                            <div className="col-9">
                                <FormItem
                                    validateStatus={
                                        touched.password &&
                                        errors.password &&
                                        "error"
                                    }
                                    help={touched.password && errors.password}
                                >
                                    <Field
                                        name="password"
                                        render={({ field }) => (
                                            <Input.Password
                                                suffix={
                                                    <Icon
                                                        type="password"
                                                        style={{
                                                            color:
                                                                "rgba(0,0,0,.25)"
                                                        }}
                                                    />
                                                }
                                                type="password"
                                                size="large"
                                                placeholder="Nhập mật khẩu..."
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3 text-right">
                                <label className="mb-0 ant-form-item-required">
                                    Mật Khẩu Mới
                                </label>
                            </div>
                            <div className="col-9">
                                <FormItem
                                    validateStatus={
                                        touched.newPassword &&
                                        errors.newPassword &&
                                        "error"
                                    }
                                    help={
                                        touched.newPassword &&
                                        errors.newPassword
                                    }
                                >
                                    <Field
                                        name="newPassword"
                                        render={({ field }) => (
                                            <Input.Password
                                                suffix={
                                                    <Icon
                                                        type="password"
                                                        style={{
                                                            color:
                                                                "rgba(0,0,0,.25)"
                                                        }}
                                                    />
                                                }
                                                type="password"
                                                size="large"
                                                placeholder="Nhập mật khẩu..."
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 text-right">
                                <label className="mb-0 ant-form-item-required">
                                    Xác Minh Mật Khẩu
                                </label>
                            </div>
                            <div className="col-9">
                                <FormItem
                                    validateStatus={
                                        touched.confirmNewPassword &&
                                        errors.confirmNewPassword &&
                                        "error"
                                    }
                                    help={
                                        touched.confirmNewPassword &&
                                        errors.confirmNewPassword
                                    }
                                >
                                    <Field
                                        name="confirmNewPassword"
                                        render={({ field }) => (
                                            <Input.Password
                                                suffix={
                                                    <Icon
                                                        type="password"
                                                        style={{
                                                            color:
                                                                "rgba(0,0,0,.25)"
                                                        }}
                                                    />
                                                }
                                                type="password"
                                                size="large"
                                                placeholder="Nhập lại mật khẩu..."
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6 offset-3">
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    size="large"
                                >
                                    Cập Nhật
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            />
        );
    }
}

export default MyPassword;
