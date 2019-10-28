import React, { PureComponent } from "react";
import { Icon, Skeleton } from "antd";
import Kid from "../../../assets/images/user-ic.png";
import { Wrapper, BodyWrapper, Thumb } from "../../Profile/styled";
import moment from "moment";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actionGetUserDetailRequest } from "../../../reducers/User/actions";

class MyProfile extends PureComponent {
    componentDidMount() {
        const { match, auth, actionGetUserDetailRequest } = this.props;

        let userId = match.params.id;

        if (_.isEmpty(match.params)) {
            userId = auth.user.id;
        }

        actionGetUserDetailRequest(userId);
    }

    render() {
        const { userInfo, auth } = this.props;
        const data = userInfo.user;
        console.log(data);
        

        return (
            <div className="container">
                {/* <GoBack /> */}
                <BodyWrapper>
                    {/* <Skeleton
                        loading={data.isLoading}
                        active
                        paragraph={{ rows: 4 }}
                    > */}
                    <Wrapper>
                        <h5 className="font-weight-normal d-flex align-items-center mb-3">
                            <Icon type="user" className="mr-1" /> Thông Tin Tài
                            Xế
                        </h5>
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1 d-inline-flex align-items-center">
                                {data && data.avatar !== undefined ? (
                                    <Thumb
                                        src={data && data.avatar}
                                        alt="driver"
                                        className="mr-2"
                                    />
                                ) : (
                                    <Thumb
                                        src={Kid}
                                        alt="driver"
                                        className="mr-2"
                                    />
                                )}
                                <div>
                                    <p className="mb-1">
                                        {data && data.fullName}
                                    </p>
                                    <div className="d-flex align-items-center">
                                        {data && data.userType === "driver" ? (
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
                                    Tổng chuyến đi: {data && data.numberOfTrips}
                                </div>
                                <div className="d-flex align-items-center">
                                    Ngày gia nhập:{" "}
                                    {data &&
                                        moment(data.registerDate).format(
                                            "DD/MM/YYYY"
                                        )}
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <div className="mb-1 d-flex align-items-center">
                                    {data && data.userType === "passenger"
                                        ? "Hành Khách"
                                        : "Tài Xế"}
                                </div>
                                <div className="d-flex align-items-center">
                                    Email: {data && data.email}
                                </div>
                            </div>
                        </div>
                    </Wrapper>
                    {/* </Skeleton> */}

                    <Wrapper>
                        <h5 className="font-weight-normal d-flex align-items-center mb-4">
                            <Icon type="user" className="mr-1" />
                            Thông tin Chi Tiết
                        </h5>
                        <div className="form-group row">
                            <div className="col-3 text-right">Email:</div>
                            <div className="col-sm-9">{data && data.email}</div>
                        </div>
                        <div className="form-group row">
                            <div className="col-3 text-right">Full Name:</div>
                            <div className="col-sm-9">
                                {data && data.fullName}
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-3 text-right">
                                Day of birth:
                            </div>
                            <div className="col-sm-9">
                                {moment(data && data.dayOfBirth).format(
                                    "DD/MM/YYYY"
                                )}
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-3 text-right">
                                Phone number:
                            </div>
                            <div className="col-sm-9">
                                {data && data.phoneNumber}
                            </div>
                        </div>
                    </Wrapper>
                </BodyWrapper>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer,
        userInfo: state.user
    };
};

export default connect(
    mapStateToProps,
    { actionGetUserDetailRequest }
)(withRouter(MyProfile));
