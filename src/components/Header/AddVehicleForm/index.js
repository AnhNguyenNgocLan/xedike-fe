import React, { Component } from "react";
import { Form, Button, Icon, Spin, Input } from "antd";
import { object, string } from "yup";
import { withFormik, Form as FormikForm, Field } from "formik";
import _ from "lodash";
import { InputNumberCustom } from "../../RecentTrips/styled";
import { ModalCustom} from "../styled";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actionAddVehicle } from "../../../reducers/Vehicle/actions";

const FormItem = Form.Item;

class AddVehicle extends Component {
    render() {
        const {
            touched,
            errors,
            values,
            setFieldValue,
            addVehicleVisible,
            addVehicleModal,
            handleSubmit,
            isSubmitting
        } = this.props;

        return (
            <ModalCustom
                title={
                    <h3 className="modal-title text-center">Tạo Chuyến Xe</h3>
                }
                footer={[null, null]}
                visible={addVehicleVisible}
                onCancel={() => addVehicleModal(false)}
            >
                <Spin spinning={isSubmitting} tip="Loading...">
                    <FormikForm onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-6">
                                <FormItem
                                    validateStatus={
                                        touched.vehicleBrand &&
                                        errors.vehicleBrand &&
                                        "error"
                                    }
                                    help={
                                        touched.vehicleBrand &&
                                        errors.vehicleBrand
                                    }
                                >
                                    <label className="mb-0">
                                        Thương Hiệu Xe
                                    </label>
                                    <Field
                                        name="vehicleBrand"
                                        render={({ field }) => (
                                            <Input
                                                suffix={
                                                    <Icon
                                                        type="car"
                                                        style={{
                                                            color:
                                                                "rgba(0,0,0,.25)"
                                                        }}
                                                    />
                                                }
                                                type="text"
                                                size="large"
                                                placeholder="Nhập Thương Hiệu Xe ..."
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                            <div className="col-6">
                                <FormItem>
                                    <label className="mb-0 ant-form-item-required">
                                        Số ghế
                                    </label>
                                    <InputNumberCustom
                                        min={1}
                                        defaultValue={2}
                                        max={50}
                                        size="large"
                                        name="numOfSeats"
                                        onChange={value =>
                                            setFieldValue("numOfSeats", value)
                                        }
                                        suffix={
                                            <Icon
                                                type="team"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                    />
                                </FormItem>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <FormItem
                                    validateStatus={
                                        touched.vehicleName &&
                                        errors.vehicleName &&
                                        "error"
                                    }
                                    help={
                                        touched.vehicleName &&
                                        errors.vehicleName
                                    }
                                >
                                    <label className="mb-0">Tên Xe</label>
                                    <Field
                                        name="vehicleName"
                                        render={({ field }) => (
                                            <Input
                                                suffix={
                                                    <Icon
                                                        type="car"
                                                        style={{
                                                            color:
                                                                "rgba(0,0,0,.25)"
                                                        }}
                                                    />
                                                }
                                                type="text"
                                                size="large"
                                                placeholder="Nhập Tên Xe..."
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                            <div className="col-6">
                                <FormItem
                                    validateStatus={
                                        touched.vehicleLisence &&
                                        errors.vehicleLisence &&
                                        "error"
                                    }
                                    help={
                                        touched.vehicleLisence &&
                                        errors.vehicleLisence
                                    }
                                >
                                    <label className="mb-0">Biển Số Xe</label>
                                    <Field
                                        name="vehicleLisence"
                                        render={({ field }) => (
                                            <Input
                                                suffix={
                                                    <Icon
                                                        type="car"
                                                        style={{
                                                            color:
                                                                "rgba(0,0,0,.25)"
                                                        }}
                                                    />
                                                }
                                                type="text"
                                                size="large"
                                                placeholder="Nhập Biển Số Xe..."
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                        </div>                        

                        <div className="row">
                            <div className="col-12 offset-5">
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    size="large"
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </FormikForm>
                </Spin>
            </ModalCustom>
        );
    }
}

const withFormikHOC = withFormik({
    mapPropsToValues() {
        return {
            vehicleBrand: "",
            numOfSeats: 2,
            vehicleName: "",
            vehicleLisence: "",
            vehicleImage:""
        };
    },
    validationSchema: object().shape({
        vehicleBrand: string().required("Nhập hãng xe."),
        vehicleName: string().required("Nhập tên xe."),
        vehicleLisence: string().required("Nhập biển số xe.")
    }),
    handleSubmit: (values, { props, resetForm, setSubmitting }) => {
        props.actionAddVehicle(values, () => {
            setSubmitting(false);
            resetForm();
            props.addVehicleModal(false);
        });
    }
});

const mapStateToProps = state => {
    return {
        user: state.authReducer
    };
};

export default connect(
    mapStateToProps,
    { actionAddVehicle }
)(withRouter(withFormikHOC(AddVehicle)));
