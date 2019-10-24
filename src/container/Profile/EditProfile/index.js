import React, { Component } from "react";
import { Form, Input, Button, Icon, DatePicker } from "antd";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import moment from "moment";
import { actionUpdateUserDetailRequest } from "../../../reducers/User/actions";
import { connect } from "react-redux";

const FormItem = Form.Item;

class EditProfile extends Component {
    render() {
        const {
            id,
            email,
            phoneNumber,
            fullName,
            dayOfBirth,
            actionUpdateUserDetailRequest
        } = this.props;


        return (
            <Formik
                enableReinitialize={true}
                initialValues={{
                    email: email,
                    phoneNumber: phoneNumber,
                    fullName: fullName,
                    dayOfBirth:
                        dayOfBirth === null
                            ? null
                            : moment(dayOfBirth, "DD/MM/YYYY")
                }}
                onSubmit={(values, { setFieldError }) => {
                    actionUpdateUserDetailRequest(id, values, err => {
                        Object.keys(err.response.data).forEach(field => {
                            setFieldError(field, err.response.data[field] )
                            // console.log(err.response.data[field]);
                        });
                        console.log(err.response);
                    });
                }}
                validationSchema={Yup.object().shape({
                    // Validate form field
                    email: Yup.string()
                        .required("Nhập Email.")
                        .email("Email không hợp lệ."),
                    fullName: Yup.string()
                        .required("Nhập Họ Tên.")
                        .min(2, "Họ Tên có ít nhất 2 ký tự"),
                    phoneNumber: Yup.string().required("Nhập số điện thoại."),
                    dayOfBirth: Yup.string().required("Chọn ngày sinh.")
                })}
                render={({
                    setFieldValue,
                    values,
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
                                    Email
                                </label>
                            </div>
                            <div className="col-9">
                                <FormItem
                                    validateStatus={
                                        touched.email && errors.email && "error"
                                    }
                                    help={touched.email && errors.email}
                                >
                                    <Field
                                        name="email"
                                        render={({ field }) => (
                                            <Input
                                                suffix={
                                                    <Icon
                                                        type="mail"
                                                        style={{
                                                            color:
                                                                touched.email &&
                                                                errors.email
                                                                    ? "#f5222d"
                                                                    : "rgba(0,0,0,.25)"
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
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 text-right">
                                <label className="mb-0 ant-form-item-required">
                                    Họ Tên
                                </label>
                            </div>
                            <div className="col-9">
                                <FormItem
                                    validateStatus={
                                        touched.fullName &&
                                        errors.fullName &&
                                        "error"
                                    }
                                    help={touched.fullName && errors.fullName}
                                >
                                    <Field
                                        name="fullName"
                                        render={({ field }) => (
                                            <Input
                                                suffix={
                                                    <Icon
                                                        type="user"
                                                        style={{
                                                            color:
                                                                "rgba(0,0,0,.25)"
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
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 text-right">
                                <label className="mb-0 ant-form-item-required">
                                    Số Điện Thoại
                                </label>
                            </div>
                            <div className="col-9">
                                <FormItem
                                    validateStatus={
                                        touched.phoneNumber &&
                                        errors.phoneNumber &&
                                        "error"
                                    }
                                    help={
                                        touched.phoneNumber &&
                                        errors.phoneNumber
                                    }
                                >
                                    <Field
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <Input
                                                suffix={
                                                    <Icon
                                                        type="phone"
                                                        style={{
                                                            color:
                                                                "rgba(0,0,0,.25)"
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
                        </div>
                        <div className="row">
                            <div className="col-3 text-right">
                                <label className="mb-0 ant-form-item-required">
                                    Ngày Sinh
                                </label>
                            </div>
                            <div className="col-9">
                                <FormItem
                                    validateStatus={
                                        touched.dayOfBirth &&
                                        errors.dayOfBirth &&
                                        "error"
                                    }
                                    help={
                                        touched.dayOfBirth && errors.dayOfBirth
                                    }
                                >
                                    <DatePicker
                                        value={values.dayOfBirth}
                                        format="DD/MM/YYYY"
                                        size="large"
                                        className="d-block"
                                        name="dayOfBirth"
                                        onChange={value =>
                                            setFieldValue(
                                                "dayOfBirth",
                                                value === null
                                                    ? undefined
                                                    : value
                                            )
                                        }
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

export default connect(
    null,
    { actionUpdateUserDetailRequest }
)(EditProfile);
