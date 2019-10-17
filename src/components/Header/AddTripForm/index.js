import React, { Component } from "react";
import { Form, Input, Button, Icon, Select, Spin } from "antd";
import { object, string } from "yup";
import { withFormik, Form as FormikForm } from "formik";
import _ from "lodash";
import apiCaller from "../../../utils/apiCaller";
import { InputNumberCustom } from "../../../components/RecentTrips/styled";
import { ModalCustom, DatePickerCustom } from "../styled";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { actionCreateTripRequest } from "../../../reducers/Trip/actions";

const FormItem = Form.Item;
const { Option } = Select;

class AddTrip extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locationArr: []
        };
    }

    componentDidMount() {
        apiCaller("api/provinces", "GET", null)
            .then(res => {
                this.setState({
                    locationArr: res.data
                });
            })
            .catch(err => console.log(err.response));
    }

    render() {
        const {
            touched,
            errors,
            values,
            setFieldValue,
            addTripVisible,
            addTripModal,
            handleSubmit,
            isSubmitting
        } = this.props;

        const locations = _.map(this.state.locationArr, (item, index) => {
            return (
                <Option key={index} value={item.Title}>
                    {item.Title}
                </Option>
            );
        });

        return (
            <ModalCustom
                title={
                    <h3 className="modal-title text-center">Thêm Chuyến Xe</h3>
                }
                footer={[null, null]}
                visible={addTripVisible}
                onCancel={() => addTripModal(false)}
            >
                <Spin spinning={isSubmitting} tip="Loading...">
                    <FormikForm onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-6">
                                <FormItem
                                    validateStatus={
                                        touched.locationFrom &&
                                        errors.locationFrom &&
                                        "error"
                                    }
                                    help={
                                        touched.locationFrom &&
                                        errors.locationFrom
                                    }
                                >
                                    <label className="mb-0">Nơi Đi</label>
                                    <Select
                                        name="locationFrom"
                                        size="large"
                                        showSearch
                                        placeholder="Select location"
                                        optionFilterProp="children"
                                        value={values.locationFrom}
                                        onChange={value =>
                                            setFieldValue("locationFrom", value)
                                        }
                                        suffixIcon={
                                            <Icon
                                                type="environment"
                                                style={{ color: "#28a745" }}
                                            />
                                        }
                                    >
                                        {locations}
                                    </Select>
                                </FormItem>
                            </div>
                            <div className="col-6">
                                <FormItem
                                    validateStatus={
                                        touched.locationTo &&
                                        errors.locationTo &&
                                        "error"
                                    }
                                    help={
                                        touched.locationTo && errors.locationTo
                                    }
                                >
                                    <label className="mb-0">Nơi Đến</label>
                                    <Select
                                        name="locationTo"
                                        size="large"
                                        showSearch
                                        placeholder="Select location"
                                        optionFilterProp="children"
                                        value={values.locationTo}
                                        onChange={value =>
                                            setFieldValue("locationTo", value)
                                        }
                                        suffixIcon={
                                            <Icon
                                                type="environment"
                                                style={{ color: "#dc3545" }}
                                            />
                                        }
                                    >
                                        {locations}
                                    </Select>
                                </FormItem>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <FormItem>
                                    <label className="mb-0 ant-form-item-required">
                                        Chi Phí
                                    </label>
                                    <InputNumberCustom
                                        min={20000}
                                        defaultValue={20000}
                                        size="large"
                                        name="fee"
                                        onChange={value =>
                                            setFieldValue("fee", value)
                                        }
                                        suffix={
                                            <Icon
                                                type="money-collect"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                    />
                                </FormItem>
                            </div>

                            <div className="col-6">
                                <FormItem
                                    validateStatus={
                                        touched.availableSeats &&
                                        errors.availableSeats &&
                                        "error"
                                    }
                                    help={
                                        touched.availableSeats &&
                                        errors.availableSeats
                                    }
                                >
                                    <label className="mb-0 ant-form-item-required">
                                        Số chỗ
                                    </label>
                                    <InputNumberCustom
                                        min={1}
                                        max={50}
                                        defaultValue={2}
                                        size="large"
                                        name="availableSeats"
                                        onChange={value =>
                                            setFieldValue(
                                                "availableSeats",
                                                value
                                            )
                                        }
                                    />
                                </FormItem>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <FormItem
                                    validateStatus={
                                        touched.startTime &&
                                        errors.startTime &&
                                        "error"
                                    }
                                    help={touched.startTime && errors.startTime}
                                >
                                    <label className="mb-0">
                                        Thời Gian Khởi Hành
                                    </label>
                                    <DatePickerCustom
                                        size="large"
                                        onChange={e => {
                                            setFieldValue("startTime", e);
                                        }}
                                        disabledDate={currentDay => {
                                            return (
                                                currentDay &&
                                                currentDay <=
                                                    moment().endOf("day")
                                            );
                                        }}
                                        name="startTime"
                                        value={values.startTime}
                                        format="DD/MM/YYYY"
                                        // value={values.startTime}
                                        placeholder="Thời gian khởi hành..."
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
            locationFrom: undefined,
            locationTo: undefined,
            availableSeats: 2,
            fee: 10000,
            startTime: undefined
        };
    },
    validationSchema: object().shape({
        locationFrom: string().required("Chọn nơi đi"),
        locationTo: string().required("Chọn nơi đến"),
        startTime: string().required("Chọn thời gian đi.")
    }),
    handleSubmit: (values, { props, resetForm, setSubmitting }) => {
        props.actionCreateTripRequest(values, () => {
            setSubmitting(false);
            resetForm();
            props.addTripModal(false);
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
    { actionCreateTripRequest }
)(withRouter(withFormikHOC(AddTrip)));
