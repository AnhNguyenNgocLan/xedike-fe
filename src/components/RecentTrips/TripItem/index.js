import React, { Component } from "react";
// import { Icon } from "antd";
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";

class TripItem extends Component {
    render() {
        const { index, trip } = this.props;

        return (
            <div className="d-flex justify-content-between mb-2 mt-4 text-left text-capitalize container">
                <div className="col-sm">{index + 1}</div>
                <div className="col-sm">
                    {trip.isFinished ? "Hoàn Tất" : "Đang Thực Hiện"}
                </div>
                <div className="col-sm">{trip.locationFrom}</div>
                <div className="col-sm">{trip.locationTo}</div>
                <div className="col-sm">
                    {trip.fee} <sup>VND</sup>
                </div>
                <div className="col-sm">{trip.availableSeats}</div>
                <div className="col-sm">
                    <Nav pills>
                        <NavItem>
                            <Link
                                to={`/api/trips/book-trip/${trip._id}`}
                                className="btn btn-outline-primary pb-1 pt-1"
                            >
                                Đặt Xe
                            </Link>
                        </NavItem>
                    </Nav>
                </div>
            </div>
        );
    }
}

export default TripItem;
