import React, { Component } from "react";
import Kid from "../../assets/images/kid.jpg";
import { Icon, Skeleton } from "antd";
import { Wrapper, BodyWrapper, Thumb } from "./styled";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Detail from "./EditProfile";
import MyPassword from "./MyPassword";
import { actionGetUserDetailRequest } from "../../reducers/User/actions";
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
        const userDetails = userInfo.data;

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
                                <div className="flex-grow-1 d-inline-flex align-items-center">
                                    <Thumb
                                        src={Kid}
                                        alt="driver"
                                        className="mr-2"
                                    />
                                    <div>
                                        <p className="mb-1">
                                            {userDetails.fullName}
                                        </p>
                                        <div className="d-flex align-items-center">
                                            {userDetails.userType ===
                                            "driver" ? (
                                                <>
                                                    <Icon
                                                        type="star"
                                                        theme="twoTone"
                                                        className="mr-1"
                                                        twoToneColor="#ffc107"
                                                    />
                                                    4
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex align-items-center mb-1">
                                        {/* TODO: CALL API NUMBER OF TRIP OF USER AFTER FISNISHED */}
                                        Tổng chuyến đi:{" "}
                                        {userDetails.numberOfTrips}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        Ngày gia nhập:{" "}
                                        {moment(
                                            userDetails.registerDate
                                        ).format("DD/MM/YYYY")}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="mb-1">
                                        {userDetails.userType === "passenger"
                                            ? "Hành Khách"
                                            : "Tài Xế"}
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
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
                                email={userDetails.email}
                                fullName={userDetails.fullName}
                                dayOfBirth={moment(
                                    userDetails.dayOfBirth
                                ).format("DD/MM/YYYY")}
                                phoneNumber={userDetails.phoneNumber}
                                id={userDetails._id}
                            />
                        </Skeleton>
                    </Wrapper>
                    <Wrapper className="mt-5">
                        <h5 className="font-weight-normal d-flex align-items-center mb-3">
                            <Icon type="smile" className="mr-1" /> Thay Đổi Mật
                            Khẩu
                        </h5>

                        <MyPassword id={userDetails._id} />
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
