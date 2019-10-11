import React, { Component } from "react";
import { Parallax } from "react-parallax";
import ParallaxImg from "./../../assets/images/parallax.jpg";
import { Select, Form, Col, Row, Icon } from "antd";
import { Formik } from "formik";
import {
    DatePickerCustom,
    InputNumberCustom,
    ButtonCustom,
    BookingContainer
} from "./styled";

import { withRouter } from "react-router-dom";
import queryString from "query-string";
import moment from "moment";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../reducers/Trip/actions";
import callAPI from "../../utils/apiCaller";

const { Option } = Select;
const FormItem = Form.Item;

class Booking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locationFrom: undefined,
            locationTo: undefined,
            startTime: undefined,
            slot: 2,
            provinceArr: []
        };
    }

    componentDidMount() {
        callAPI("api/provinces", "GET", null)
            .then(res => {
                this.setState({
                    provinceArr: res.data
                });
            })
            .catch(err => console.log(err.response));

        if (this.props.isHomepage) return;

        const { location, searchTrips } = this.props;
        const parsed = queryString.parse(location.search);

        this.setState({
            locationFrom: parsed.from,
            locationTo: parsed.to,
            startTime: moment(parsed.startTime),
            slot: parsed.slot
        });

        callAPI(`api/trips/search${location.search}`, "POST", null)
            .then(res => {
                searchTrips(res.data);
            })
            .catch(() => {
                searchTrips([]);
            });
    }

    render() {
        const { history, isHomepage } = this.props;
        const {
            locationFrom,
            locationTo,
            startTime,
            slot,
            provinceArr
        } = this.state;

        const locations = provinceArr.map((item, index) => {
            return (
                <Option key={index} value={item.Title}>
                    {item.Title}
                </Option>
            );
        });

        return (
            <section className="booking-trip">
                <Parallax
                    blur={0.5}
                    bgImage={ParallaxImg}
                    bgImageAlt="the cat"
                    strength={200}
                >
                    {/* <div style={{ height: "225px" }} /> */}

                    <BookingContainer>
                        <div className="container">
                            <Formik
                                initialValues={{
                                    locationFrom: locationFrom,
                                    locationTo: locationTo,
                                    startTime: startTime,
                                    slot: slot
                                }}
                                validationSchema={Yup.object().shape({
                                    // Validate form field
                                    locationFrom: Yup.string().required(
                                        "Chọn nơi đi."
                                    ),
                                    locationTo: Yup.string().required(
                                        "Chọn nơi đến."
                                    ),
                                    startTime: Yup.string().required(
                                        "Chọn thời gian khởi hành."
                                    ),
                                    slot: Yup.number()
                                        .positive("Số chỗ phải lớn hơn 1.")
                                        .required("Chọn số chỗ.")
                                })}
                                enableReinitialize={true}
                                onSubmit={values => {
                                    const suffixSearchQuery = queryString.stringify(
                                        {
                                            from: values.locationFrom,
                                            to: values.locationTo,
                                            startTime: values.startTime,
                                            slot: values.slot
                                        }
                                    );

                                    history.push(
                                        `/api/trips/search?${suffixSearchQuery}`
                                    );

                                    if (!isHomepage) {
                                        callAPI(
                                            `api/trips/search?${suffixSearchQuery}`,
                                            "POST",
                                            null
                                        )
                                            .then(res => {
                                                this.props.searchTrips(
                                                    res.data
                                                );
                                            })
                                            .catch(err =>
                                                console.log(
                                                    err.response.data.message
                                                )
                                            );
                                    }
                                }}
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
                                        <Row type="flex" align="bottom">
                                            <Col className="px-1" md={6}>
                                                <label className="font-weight-bold text-white">
                                                    Nơi Đi
                                                </label>
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
                                                        placeholder="Nơi Đi..."
                                                        optionFilterProp="children"
                                                        value={
                                                            values.locationFrom
                                                        }
                                                        onChange={e => {
                                                            setFieldValue(
                                                                "locationFrom",
                                                                e
                                                            );
                                                        }}
                                                    >
                                                        {locations}
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                            <Col className="px-1" md={6}>
                                                <label className="font-weight-bold text-white">
                                                    Nơi Đến
                                                </label>
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
                                                        placeholder="Nơi Đến..."
                                                        optionFilterProp="children"
                                                        value={
                                                            values.locationTo
                                                        }
                                                        onChange={e => {
                                                            setFieldValue(
                                                                "locationTo",
                                                                e
                                                            );
                                                        }}
                                                    >
                                                        {locations}
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                            <Col className="px-1" md={4}>
                                                <label className="font-weight-bold text-white">
                                                    Ngày Khởi Hành
                                                </label>
                                                <FormItem
                                                    validateStatus={
                                                        touched.startTime &&
                                                        errors.startTime &&
                                                        "error"
                                                    }
                                                    help={
                                                        touched.startTime &&
                                                        errors.startTime
                                                    }
                                                >
                                                    <DatePickerCustom
                                                        size="large"
                                                        onChange={e => {
                                                            setFieldValue(
                                                                "startTime",
                                                                e
                                                            );
                                                        }}
                                                        name="startTime"
                                                        value={values.startTime}
                                                        format="DD/MM/YYYY"
                                                        // value={values.startTime}
                                                        placeholder="Chọn ngày..."
                                                    />
                                                </FormItem>
                                            </Col>
                                            <Col className="px-1" md={2}>
                                                <label className="font-weight-bold text-white">
                                                    Số Chỗ
                                                </label>
                                                <FormItem
                                                    validateStatus={
                                                        touched.slot &&
                                                        errors.slot &&
                                                        "error"
                                                    }
                                                    help={
                                                        touched.slot &&
                                                        errors.slot
                                                    }
                                                >
                                                    <InputNumberCustom
                                                        min={1}
                                                        max={10}
                                                        defaultValue={2}
                                                        size="large"
                                                        onChange={value => {
                                                            setFieldValue(
                                                                "slot",
                                                                value
                                                            );
                                                        }}
                                                        value={values.slot}
                                                    />
                                                </FormItem>
                                            </Col>
                                            <Col className="px-1" md={6}>
                                                <FormItem>
                                                    {isHomepage ? (
                                                        <ButtonCustom
                                                            type="primary"
                                                            size="large"
                                                            block
                                                            htmlType="submit"
                                                        >
                                                            <Icon type="car" />
                                                            Tìm Kiếm
                                                        </ButtonCustom>
                                                    ) : (
                                                        <ButtonCustom
                                                            type="primary"
                                                            size="large"
                                                            block
                                                            htmlType="submit"
                                                        >
                                                            <Icon type="car" />
                                                            Tìm Kiếm
                                                        </ButtonCustom>
                                                    )}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </form>
                                )}
                            />
                        </div>
                    </BookingContainer>
                </Parallax>
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchTrips: data => {
            dispatch(actions.actionSearchTrip(data));
        }
    };
};

const BookingComponent = connect(
    null,
    mapDispatchToProps
)(Booking);

export default withRouter(BookingComponent);
