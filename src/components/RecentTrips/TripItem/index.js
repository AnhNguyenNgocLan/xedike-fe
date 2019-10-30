import React, { Component } from "react";
import Kid from "../../../assets/images/user-ic.png";
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Empty, Icon, Button, Rate } from "antd";
import { Price, Thumb } from "../../../components/RecentTrips/styled";
import moment from "moment";
import { actionFinishTrip } from "../../../reducers/MyTrip/actions";
import swalReact from "@sweetalert/with-react";
import { connect } from "react-redux";
import swal from "sweetalert";
import callAPI from "../../../utils/apiCaller";

class TripItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rate: 0
        };
    }
    handleFinishTrip(tripID, driverID) {
        const { actionFinishTrip } = this.props;
        console.log(tripID);
        
        swal({
            title: "Bạn muốn đánh giá tài xế chứ ?",
            icon: "info",
            buttons: {
                close: {
                    text: "Không!",
                    className: "ant-btn ant-btn-danger",
                    value: "noRate"
                },
                rate: {
                    text: "Đồng Ý",
                    value: "rate",
                    className: "ant-btn ant-btn-primary"
                }
            }
        }).then(value => {
            if (value === "noRate") {
                return actionFinishTrip(tripID);
            }
           
            

            swalReact(<Rate onChange={this.handleRating} />, {
                buttons: {
                    close: {
                        text: "Cancel",
                        className: "ant-btn ant-btn-danger",
                        value: "close"
                    },
                    submit: {
                        text: "Submit",
                        className: "ant-btn ant-btn-primary",
                        value: "submit"
                    }
                }
            }).then(value => {
                if (value === "close") {
                    return actionFinishTrip(tripID);
                }
                callAPI(`users/rating/${driverID}`, "PUT", {
                    rate: this.state.rate
                })
                    .then(() => {
                        swal({
                            title: "Finish trip and Rating successfully!",
                            icon: "success",
                            timer: 2000
                        });
                        actionFinishTrip(tripID);
                    })
                    .catch(err => console.log(err.response));
            });
        });
    }

    handleRating = value => {
        this.setState({
            rate: value
        });
    };

    render() {
        const { trip = [], userType, showBtn = true } = this.props;
        const isEmpty = _.isEmpty(trip);

        return (
            <>
                {" "}
                {isEmpty ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : (
                    <div className="">
                        {_.map(trip, (item, index) => {
                            // console.log(item);

                            return (
                                <div
                                    key={index}
                                    className="row text-capitalize mt-3 ml-4 mr-4"
                                >
                                    <div className="col-3">
                                        <div className="d-flex align-items-center mb-1">
                                            {item.locationFrom}
                                            <Icon
                                                type="arrow-right"
                                                className="mx-2"
                                            />
                                            {item.locationTo}
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <Icon
                                                type="calendar"
                                                className="mr-1"
                                            />
                                            {moment(item.startTime).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="mb-1 d-flex align-items-center">
                                            Honda
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <Icon
                                                type="team"
                                                className="mr-1"
                                            />
                                            {item.availableSeats}
                                        </div>
                                    </div>
                                    <Link className="col-3 d-inline-flex text-dark"
                                        to={`/driver-profile/${item.driverID &&
                                            item.driverID._id}`}
                                    >
                                        {item.driverID &&
                                        item.driverID.avatar !== undefined ? (
                                            <Thumb
                                                src={
                                                    item.driverID &&
                                                    item.driverID.avatar
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

                                        <div className="">
                                            <p className="mb-1">
                                                {item.driverID &&
                                                    item.driverID.fullName}
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
                                    </Link>
                                    <Price className="col-3"
                                        priceFont="30px"
                                        className="flex-grow-1"
                                    >
                                        {item.fee} <sup>vnd</sup>
                                    </Price>

                                    {showBtn ? (
                                        <>
                                            {(userType !== "driver" ||
                                                userType === "passenger") && (
                                                <div className="d-inline-flex text-dark">
                                                    <Nav pills>
                                                        <NavItem>
                                                            <Link
                                                                to={`/book-trip/${item._id}`}
                                                                className="btn btn-success"
                                                            >
                                                                Đặt Xe
                                                            </Link>
                                                        </NavItem>
                                                    </Nav>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Button
                                            onClick={() =>
                                                this.handleFinishTrip(
                                                    item && item._id,
                                                    item.driverID &&
                                                        item.driverID._id
                                                )
                                            }
                                            type="primary"
                                            disabled={item.isFinished && true}
                                        >
                                            Hoàn Thành
                                        </Button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </>
        );
    }
}

export default connect(
    null,
    { actionFinishTrip }
)(TripItem);
