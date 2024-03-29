import React, { Component } from "react";
import Kid from "../../../assets/images/user-ic.png";
import { Wrapper } from "../styled";
import {
    Form,
    Input,
    Button,
    Icon,
    Select,
    notification,
    Skeleton
} from "antd";
import { object, string } from "yup";
import { withFormik, Form as FormikForm } from "formik";
import _ from "lodash";
import apiCaller from "../../../utils/apiCaller";
import {
    Price,
    Thumb,
    InputNumberCustom
} from "../../../components/RecentTrips/styled";
import { withRouter } from "react-router-dom";
import { BodyWrapper } from "../styled";
import swal from "sweetalert";
import { connect } from "react-redux";
import { actionGetTripByID } from "../../../reducers/Trip/actions";
import moment from "moment";

const FormItem = Form.Item;
const { Option } = Select;

class BookingTrip extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locationArr: []
        };
    }

    componentDidMount() {
        const { match, actionGetTripByID, user } = this.props;
        const { id } = match.params;
        // console.log("User: ", user.user.userType);

        actionGetTripByID(id);

        apiCaller("api/provinces", "GET", null)
            .then(res => {
                this.setState({
                    locationArr: res.data
                });
            })
            .catch(err => console.log(err.response));
    }

    render() {
        const { touched, errors, values, setFieldValue, trips } = this.props;
        const tripData = trips.data;
        console.log(tripData.driverID);

        const locations = _.map(this.state.locationArr, (item, index) => {
            return (
                <Option key={index} value={item.Title}>
                    {item.Title}
                </Option>
            );
        });

        return (
            <div className="container">
                <BodyWrapper>
                    <Wrapper>
                        <h5 className="font-weight-normal d-flex align-items-center mb-3">
                            <Icon type="car" className="mr-1" /> Thông Tin
                            Chuyến Đi
                        </h5>
                        <Skeleton
                            loading={trips.isLoading}
                            active
                            paragraph={{ rows: 4 }}
                        >
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <div className="d-flex align-items-center mb-1">
                                        {tripData.locationFrom}
                                        <Icon
                                            type="arrow-right"
                                            className="mx-2"
                                        />
                                        {tripData.locationTo}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Icon
                                            type="calendar"
                                            className="mr-1"
                                        />
                                        {moment(tripData.startTime).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="mb-1 d-flex align-items-center">
                                        {/* TODO: Ten xe */}
                                        Ten XE
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Icon type="team" className="mr-1" />
                                        {tripData.availableSeats}
                                    </div>
                                </div>
                                <div className="flex-grow-1 d-inline-flex">
                                    {tripData.driverID &&
                                    tripData.driverID.avatar !== undefined ? (
                                        <Thumb
                                            src={
                                                tripData.driverID &&
                                                tripData.driverID.avatar
                                            }
                                            alt="driver"
                                            className="mr-2"
                                        />
                                    ) : (
                                        <Thumb
                                            src={Kid}
                                            alt="driver"
                                            className="mr-2"
                                        />
                                    )}

                                    <div>
                                        <p className="mb-1">
                                            {" "}
                                            {tripData.driverID &&
                                                tripData.driverID.fullName}
                                        </p>
                                        <div className="d-flex align-items-center">
                                            <Icon
                                                type="star"
                                                theme="twoTone"
                                                className="mr-1"
                                                twoToneColor="#ffc107"
                                            />
                                            4
                                        </div>
                                    </div>
                                </div>
                                <Price priceFont="30px" className="flex-grow-1">
                                    {tripData.fee} <sup>vnd</sup>
                                </Price>
                            </div>
                        </Skeleton>
                    </Wrapper>
                    <Wrapper className="mt-5">
                        <h5 className="font-weight-normal d-flex align-items-center mb-3">
                            <Icon type="carry-out" className="mr-1" /> Đặt Chỗ
                        </h5>
                        <FormikForm>
                            <div className="row">
                                <div className="col-2 text-right">
                                    <label className="mb-0 ant-form-item-required">
                                        Nơi Đi
                                    </label>
                                </div>
                                <div className="col-10">
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
                                        <Select
                                            name="locationFrom"
                                            size="large"
                                            showSearch
                                            placeholder="Select location"
                                            optionFilterProp="children"
                                            value={values.locationFrom}
                                            onChange={value =>
                                                setFieldValue(
                                                    "locationFrom",
                                                    value
                                                )
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
                            </div>
                            <div className="row">
                                <div className="col-2 text-right">
                                    <label className="mb-0 ant-form-item-required">
                                        Nơi Đến
                                    </label>
                                </div>
                                <div className="col-10">
                                    <FormItem
                                        validateStatus={
                                            touched.locationTo &&
                                            errors.locationTo &&
                                            "error"
                                        }
                                        help={
                                            touched.locationTo &&
                                            errors.locationTo
                                        }
                                    >
                                        <Select
                                            name="locationTo"
                                            size="large"
                                            showSearch
                                            placeholder="Select location"
                                            optionFilterProp="children"
                                            value={values.locationTo}
                                            onChange={value =>
                                                setFieldValue(
                                                    "locationTo",
                                                    value
                                                )
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
                                <div className="col-2 text-right">
                                    <label className="mb-0 ant-form-item-required">
                                        Thanh Toán
                                    </label>
                                </div>
                                <div className="col-10">
                                    <FormItem>
                                        <Input
                                            disabled
                                            size="large"
                                            value="Cash"
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
                            </div>
                            <div className="row">
                                <div className="col-2 text-right">
                                    <label className="mb-0 ant-form-item-required">
                                        Số chỗ
                                    </label>
                                </div>
                                <div className="col-10">
                                    <FormItem
                                        validateStatus={
                                            touched.numberOfBookingSeats &&
                                            errors.numberOfBookingSeats &&
                                            "error"
                                        }
                                        help={
                                            touched.numberOfBookingSeats &&
                                            errors.numberOfBookingSeats
                                        }
                                    >
                                        <InputNumberCustom
                                            min={1}
                                            max={10}
                                            defaultValue={2}
                                            size="large"
                                            name="numberOfBookingSeats"
                                            onChange={value =>
                                                setFieldValue(
                                                    "numberOfBookingSeats",
                                                    value
                                                )
                                            }
                                        />
                                    </FormItem>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2 text-right">
                                    <label className="mb-0">Ghi chú</label>
                                </div>
                                <div className="col-10">
                                    <FormItem>
                                        <Input.TextArea
                                            name="note"
                                            autoSize={{ minRows: 5 }}
                                            onChange={value =>
                                                setFieldValue(
                                                    "note",
                                                    value.target.value
                                                )
                                            }
                                        />
                                    </FormItem>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-10 offset-2">
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
                    </Wrapper>
                </BodyWrapper>
            </div>
        );
    }
}

const withFormikHOC = withFormik({
    mapPropsToValues() {
        return {
            locationFrom: undefined,
            locationTo: undefined,
            numberOfBookingSeats: 2,
            note: ""
        };
    },
    validationSchema: object().shape({
        locationFrom: string().required("Chọn nơi đi"),
        locationTo: string().required("Chọn nơi đến")
    }),
    handleSubmit: (values, { props }) => {
        if (!props.user.isAuthenticated) {
            return swal({
                text: "Bạn phải đăng nhập đế đặt chuyến đi",
                icon: "warning",
                buttons: false,
                timer: 1500
            });
        }

        apiCaller(`api/trips/book-trip/${props.match.params.id}`, "PUT", values)
            .then(() => {
                swal({
                    text: "Đặt chỗ thành công!",
                    icon: "success",
                    buttons: false,
                    timer: 1500
                }).then(() => {
                    props.history.push("/");
                });
            })
            .catch(err => {
                let errs = err.response;
                if (_.get(err, "response.data.message")) {
                    errs = err.response.data.message;
                }
                notification.error({
                    message: errs,
                    duration: 2.5,
                    placement: "topLeft"
                });
            });
    }
});

const mapStateToProps = state => {
    return {
        user: state.authReducer,
        trips: state.trips
    };
};

export default connect(
    mapStateToProps,
    { actionGetTripByID }
)(withRouter(withFormikHOC(BookingTrip)));
