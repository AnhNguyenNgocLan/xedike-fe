import React, { Component } from "react";
import AvatarImg from "../../assets/images/user-ic.png";
import { Avatar, UploadAvatar } from "./styled";
import { Icon } from "antd";
import moment from "moment";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import { actionUploadUserAvatar } from "../../reducers/User/actions";

class AvatarWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            file: null
        };
    }
    onHandleAvatar = e => {
        let file = e.target.files[0];
        console.log(file);

        const { actionUploadUserAvatar, match, isAuthenticated } = this.props;
        const formData = new FormData();
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };

        let id = match.params.id;

        if (_.isEmpty(match.params)) {
            id = isAuthenticated.user.id;
        }

        formData.append("avatar", file);

        this.setState({
            isLoading: true
        });

        actionUploadUserAvatar(id, formData, config, () => {
            this.setState({
                isLoading: false
            });
        });
    };

    render() {
        const { avatar, fullName } = this.props;

        const { isLoading } = this.state;
        return (
            <div>
                <Avatar>
                    <div className="text-center">
                        <UploadAvatar isLoading={isLoading}>
                            <label className="cursor-point mb-0">
                                <img
                                    src={!avatar ? AvatarImg : avatar}
                                    alt="avatar"
                                />
                                <input
                                    className="d-none"
                                    type="file"
                                    onChange={this.onHandleAvatar}
                                />
                            </label>
                            <div className="btn-upload">
                                <Icon type={isLoading ? "loading" : "plus"} />
                                <div className="ant-upload-text">Upload</div>
                            </div>
                        </UploadAvatar>

                        <h5 className="mb-0 name">{fullName}</h5>
                    </div>
                </Avatar>
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
    { actionUploadUserAvatar }
)(withRouter(AvatarWrapper));
