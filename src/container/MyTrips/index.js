import React, { Component } from "react";
import TripItem from "../../components/RecentTrips/TripItem";
import { connect } from "react-redux";
import { Skeleton } from "antd";
import { actionGetMyTrip } from "../../reducers/Trip/actions";
import { Wrapper, BodyWrapper } from "../Profile/styled";

class MyTrip extends Component {
    componentDidMount() {
        this.props.actionGetMyTrip();
    }

    render() {
        console.log(this.props.myTrips);
        
        return (
            <div className="container">
                {" "}
                <BodyWrapper>
                    <Wrapper>
                        <Skeleton active loading={this.props.myTrips.isLoading}>
                            <TripItem trip={this.props.myTrips.data} large />
                        </Skeleton>
                    </Wrapper>
                </BodyWrapper>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        myTrips: state.trips
    };
};

export default connect(
    mapStateToProps,
    { actionGetMyTrip }
)(MyTrip);
