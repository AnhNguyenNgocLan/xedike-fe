import React, { Component } from "react";
import { RecentTripSection } from "./styled";
import TripItem from "./TripItem";
import { connect } from "react-redux";
import * as Actions from "../../reducers/Trip/actions";
import { Link } from "react-router-dom";

class RecentTrips extends Component {
    componentDidMount() {
       if (! this.props.isHomepage) return;
        this.props.fetchAllTrips();
    }
    render() {
        var { trips = [], isHomepage } = this.props;    
       
        const tripElement = trips.map((item, index) => {
            return (
                <TripItem key={index} trip={item} index={index}  />
            );
        });

        return (
            <RecentTripSection className="container">
                <h4 className="mb-4 text-uppercase">
                    {isHomepage ? "Chuyến Xe Gần Đây" : "Kết Quả Tìm Kiếm"}
                </h4>

                {tripElement}

                {isHomepage ? (
                    <Link
                        to="/"
                        type="primary"
                        size="large"
                        block="true"
                        className="btn btn-outline-info"
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
        trips: state.trips
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
