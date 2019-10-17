import React, { Component } from "react";
// import { Icon } from "antd";
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Empty } from "antd";

class TripItem extends Component {
    render() {
        const { index, trip = [], userType } = this.props;

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
                                    className="d-flex justify-content-between mb-2 mt-4 text-left text-capitalize"
                                >
                                    <div className="col-sm">{index + 1}</div>
                                    <div className="col-sm">
                                        {item.isFinished
                                            ? "Hoàn Tất"
                                            : "Đang Thực Hiện"}
                                    </div>
                                    <div className="col-sm">
                                        {item.locationFrom}
                                    </div>
                                    <div className="col-sm">
                                        {item.locationTo}
                                    </div>
                                    <div className="col-sm">
                                        {item.fee} <sup>VND</sup>
                                    </div>
                                    <div className="col-sm">
                                        {item.availableSeats}
                                    </div>
                                    {userType !== "driver" ? (
                                        <>
                                            <div className="col-sm">
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
