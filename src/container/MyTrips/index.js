import React, { Component } from "react";
import TripItem from "../../components/RecentTrips/TripItem";
import { connect } from "react-redux";
import { Skeleton, Icon } from "antd";
import { actionGetMyTrip } from "../../reducers/MyTrip/actions";
import { Wrapper, BodyWrapper } from "../Profile/styled";

class MyTrip extends Component {
    componentDidMount() {
        this.props.actionGetMyTrip();
    }

    render() {
        return (
            <div className="container">
                {" "}
                <BodyWrapper>
                    <Wrapper>
                        <Skeleton active loading={this.props.myTrips.isLoading}>
                            <h5 className="font-weight-normal d-flex align-items-center mb-4">
                                <Icon type="car" className="mr-1" />
                                Chuyến Đi của tôi
                            </h5>

                            <TripItem
                                trip={this.props.myTrips.data}
                                showBtn={false}
                            />
                        </Skeleton>
                    </Wrapper>
                </BodyWrapper>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        myTrips: state.mytrips
    };
};

export default connect(
    mapStateToProps,
    { actionGetMyTrip }
)(MyTrip);
