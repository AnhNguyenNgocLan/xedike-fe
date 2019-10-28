import React, { Component } from "react";
import { RecentTripSection } from "./styled";
import TripItem from "./TripItem";
import { connect } from "react-redux";
import * as Actions from "../../reducers/Trip/actions";
import { Link } from "react-router-dom";
import { Skeleton } from "antd";

class RecentTrips extends Component {
    componentDidMount() {
        if (!this.props.isHomepage) return;
        this.props.fetchAllTrips();
    }
    render() {
        const { trips, isHomepage, auth } = this.props;
        const { isLoading, data } = trips;
       
        return (
            <RecentTripSection className="container">
                <h4 className="mb-4 text-uppercase">
                    {isHomepage ? "Chuyến Xe Gần Đây" : "Kết Quả Tìm Kiếm"}
                </h4>
                {isLoading ? (
                    <Skeleton active />
                ) : (
                    <TripItem trip={data} userType={auth.user.userType} />
                )}

                {isHomepage ? (
                    <Link
                        to="/"
                        type="primary"
                        size="large"
                        block="true"
                        className="btn btn-outline-info mt-4"
                    >
                        Xem Thêm
                    </Link>
                ) : (
                    <></>
                )}
            </RecentTripSection>
        );
    }
}

const mapStateToProps = state => {
    return {
        trips: state.trips,
        auth: state.authReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllTrips: () => {
            dispatch(Actions.actionFetchTripsRequest());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecentTrips);
