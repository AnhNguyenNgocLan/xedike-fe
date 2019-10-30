import React, { Component } from "react";
import { Icon, Skeleton } from "antd";
import { Wrapper, BodyWrapper } from "./styled";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Detail from "./EditProfile";
import MyPassword from "./MyPassword";
import { actionGetUserDetailRequest } from "../../reducers/User/actions";
import AvatarWrapper from "../../components/Avatar/index";
import moment from "moment";

class Profile extends Component {
    componentDidMount() {
        const {
            match,
            isAuthenticated,
            actionGetUserDetailRequest
        } = this.props;
        let id = match.params.id;

        if (_.isEmpty(match.params)) {
            id = isAuthenticated.user.id;
        }
        actionGetUserDetailRequest(id);
    }

    render() {
        const { userInfo } = this.props;

        const { user, vehicles } = userInfo;       

        return (
            <div className="container">
                <BodyWrapper>
                    <Skeleton
                        loading={userInfo.isLoading}
                        active
                        paragraph={{ rows: 4 }}
                    >
                        <Wrapper>
                            <h5 className="font-weight-normal d-flex align-items-center mb-3">
                                <Icon type="user" className="mr-1" /> Thông Tin
                                Cá Nhân
                            </h5>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <AvatarWrapper
                                        fullName={user && user.fullName}
                                        userType={user && user.userType}
                                        avatar={user && user.avatar}
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex align-items-center mb-1">
                                        {/* TODO: CALL API NUMBER OF TRIP OF USER AFTER FISNISHED */}
                                        Tổng chuyến đi:{" "}
                                        {user && user.numberOfTrips}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        Ngày gia nhập:{" "}
                                        {user &&
                                            moment(user.registerDate).format(
                                                "DD/MM/YYYY"
                                            )}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex align-items-center mb-1">
                                        {user && user.userType === "passenger"
                                            ? "Hành Khách"
                                            : "Tài Xế"}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        Email:{" "}
                                        {user && user.email}
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                        {user && user.userType === "driver" ? (
                            <Wrapper>
                                <h5 className="font-weight-normal d-flex align-items-center mb-3">
                                    <Icon type="car" className="mr-1" /> Thông
                                    Tin Xe
                                </h5>
                                {!_.isEmpty(vehicles) &&
                                    _.map(vehicles, (veh, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={
                                                    _.isEmpty(vehicles)
                                                        ? "d-none"
                                                        : "mb-4 ml-4 container"
                                                }
                                            >
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 mr-0 text-right">
                                                                Tên Xe:
                                                            </label>
                                                            <div className="col-sm-9 text-left">
                                                                {veh.vehicleName}
                                                            </div>
                                                        </div>
                                                    </div>
                                                
                                                    <div className="col-sm-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 mr-0 text-right">
                                                                Hãng Xe:
                                                            </label>
                                                            <div className="col-sm-9 text-left ">
                                                                {veh.vehicleBrand}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 mr-0 text-right">
                                                                Biển Số:
                                                            </label>
                                                            <div className="col-sm-9 text-left">
                                                                {veh.vehicleLisence}
                                                            </div>
                                                        </div>
                                                    </div>
                                                
                                                    <div className="col-sm-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 mr-0 text-right">
                                                                Số ghế:
                                                            </label>
                                                            <div className="col-sm-9 text-left">
                                                                {veh.numOfSeats}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </Wrapper>
                        ) : (
                            <></>
                        )}
                    </Skeleton>
                    <Wrapper className="mt-5">
                        <Skeleton
                            loading={userInfo.isLoading}
                            active
                            paragraph={{ rows: 5 }}
                        >
                            <h5 className="font-weight-normal d-flex align-items-center mb-3">
                                <Icon type="profile" className="mr-1" /> Thông
                                tin Chi Tiết
                            </h5>

                            <Detail
                                email={user && user.email}
                                fullName={user && user.fullName}
                                dayOfBirth={
                                    user &&
                                    moment(user.dayOfBirth).format("DD/MM/YYYY")
                                }
                                phoneNumber={user && user.phoneNumber}
                                id={user && user._id}
                            />
                        </Skeleton>
                    </Wrapper>
                    <Wrapper className="mt-5">
                        <h5 className="font-weight-normal d-flex align-items-center mb-3">
                            <Icon type="lock" className="mr-1" /> Thay Đổi Mật
                            Khẩu
                        </h5>

                        <MyPassword id={user && user._id} />
                    </Wrapper>
                </BodyWrapper>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer,
        userInfo: state.user
    };
};

export default connect(
    mapStateToProps,
    { actionGetUserDetailRequest }
)(withRouter(Profile));
