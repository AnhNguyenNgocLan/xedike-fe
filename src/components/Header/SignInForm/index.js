import React, { Component } from "react";
import { Input, Button, Icon, Form, Spin } from "antd";
import { ModalCustom } from "../styled";
import * as Yup from "yup";
import { withFormik, Form as FormikForm, Field } from "formik";
import { connect } from "react-redux";
import { actionLogin } from "../../../reducers/Auths/actions";

const FormItem = Form.Item;

class SignInForm extends Component {
    render() {
        const {
            signInVisible,
            signInModal,
            signUpModal,
            touched,
            errors,
            handleSubmit,
            isSubmitting
        } = this.props;

        return (
            <ModalCustom
                title={<h3 className="modal-title text-center">Đăng Nhập</h3>}
                footer={[null, null]}
                visible={signInVisible}
                onCancel={() => signInModal(false)}
            >
                <Spin spinning={isSubmitting}>
                    <FormikForm onSubmit={handleSubmit}>
                        <FormItem
                            validateStatus={
                                touched.email && errors.email && "error"
                            }
                            help={touched.email && errors.email}
                        >
                            <label>Email</label>
                            <Field
                                name="email"
                                render={({ field }) => (
                                    <Input
                                        type="email"
                                        size="large"
                                        placeholder="Nhập email..."
                                        suffix={
                                            <Icon
                                                type="mail"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                        {...field}
                                    />
                                )}
                            />
                        </FormItem>
                        <FormItem
                            validateStatus={
                                touched.password && errors.password && "error"
                            }
                            help={touched.password && errors.password}
                        >
                            <label>Mật Khẩu</label>
                            <Field
                                name="password"
                                render={({ field }) => (
                                    <Input
                                        type="password"
                                        size="large"
                                        placeholder="Nhập mật khẩu..."
                                        suffix={
                                            <Icon
                                                type="lock"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                        {...field}
                                    />
                                )}
                            />
                        </FormItem>
                        <div className="input-group text-center mb-3 justify-content-center">
                            Bạn là Thành viên ?
                            <span
                                className="text-primary ml-1 cursor-point"
                                onClick={() => signUpModal(true)}
                            >
                                Đăng Ký
                            </span>
                        </div>
                        <div className="input-group mb-3">
                            <Button
                                type="primary"
                                size="large"
                                block
                                htmlType="submit"
                            >
                                Đăng Nhập
                            </Button>
                        </div>
                    </FormikForm>
                </Spin>
            </ModalCustom>
        );
    }
}

const withFormikHOC = withFormik({
    mapPropsToValues() {
        // Init form field
        return {
            email: "",
            password: ""
        };
    },
    validationSchema: Yup.object().shape({
        // Validate form field
        email: Yup.string()
            .required("Email is required")
            .email("Email is invalid"),
        password: Yup.string()
            .required("Password is required")
            .min(4, "Password has at least 4 characters")
    }),
    handleSubmit: (
        values,
        { resetForm, props, setFieldError, setSubmitting }
    ) => {
        props.actionLogin(
            values,
            () => {
                setSubmitting(false);
                resetForm();
            },
            err => {
                setSubmitting(false);
                Object.keys({ email: "", password: "" }).forEach(field => {
                    setFieldError(field, err.response.data);
                });
            }
        );
    }
});

export default connect(
    null,
    { actionLogin }
)(withFormikHOC(SignInForm));
