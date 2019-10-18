import React, { Component } from "react";
// import { Icon } from "antd";
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Empty, Button } from "antd";

class MyTrip extends Component {
    render() {
        const { trip = [], userType } = this.props;

        const isEmpty = _.isEmpty(trip);
        // const tripElement = data.map((item, index) => {
        //     return <TripItem key={index} trip={item} index={index} />;
        // });

        return (
            <>
                 <h4 className="mt-4 mb-4 text-uppercase">
                   Chuyến Đi Của Tôi
                </h4>
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

                                    <div className="col-sm">
                                        <Nav pills>
                                            <NavItem>
                                                <Button className="btn btn-outline-primary pb-1 pt-1">
                                                    Hủy Chuyến Xe
                                                </Button>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </>
        );
    }
}

export default MyTrip;
