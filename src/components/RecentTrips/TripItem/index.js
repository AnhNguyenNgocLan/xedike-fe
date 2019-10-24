import React, { Component } from "react";
import Kid from "../../../assets/images/kid.jpg";
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Empty, Icon } from "antd";
import {
    Price,
    Thumb,
    InputNumberCustom
} from "../../../components/RecentTrips/styled";
import moment from "moment";

class TripItem extends Component {
    render() {
        const { trip = [], userType } = this.props;
        const isEmpty = _.isEmpty(trip);
        
        // const tripElement = data.map((item, index) => {
        //     return <TripItem key={index} trip={item} index={index} />;
        // });

        return (
            <>
                {" "}
                {isEmpty ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : (
                    <div className="container">
                        {_.map(trip, (item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="d-flex text-capitalize mt-3"
                                >
                                    <div className="col-4">
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
                                    <div className="flex-grow-1">
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
                                    <Link
                                        className="flex-grow-1 d-inline-flex text-dark"
                                        to={`/driver-profile/${item.driverID && item.driverID._id}`}
                                    >
                                        <Thumb
                                            src={item.driverID && item.driverID.avatar}
                                            alt="driver"
                                            className="mr-2"
                                        />
                                        <div>
                                            <p className="mb-1">
                                                {item.driverID && item.driverID.fullName}
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
                                    <Price
                                        priceFont="30px"
                                        className="flex-grow-1"
                                    >
                                        {item.fee} <sup>vnd</sup>
                                    </Price>

                                    {userType !== "driver" ? (
                                        <>
                                            <div className="d-inline-flex text-dark">
                                                <Nav pills>
                                                    <NavItem>
                                                        <Link
                                                            to={`/book-trip/${item._id}`}
                                                            className="btn btn-outline-primary pb-1 pt-1"
                                                        >
                                                            Đặt Xe
                                                        </Link>
                                                    </NavItem>
                                                </Nav>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
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

export default TripItem;
