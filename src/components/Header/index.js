import React, { Component } from "react";
import Logo from "./../../assets/images/logo.png";
import { Collapse, Navbar, Nav, NavItem } from "reactstrap";
import { HeaderWrapper } from "./styled";
import { Button } from "antd";
import { FaUserCircle } from "react-icons/fa";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { Menu, Avatar, Dropdown } from "antd";
import { connect } from "react-redux";
import { actionLogout } from "../../reducers/Auths/actions";
import { Link } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            signInVisible: false,
            signUpVisible: false,
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    signInModal = value => {
        this.setState({
            signInVisible: value,
            signUpVisible: false
        });
    };

    signUpModal = value => {
        this.setState({
            signUpVisible: value,
            signInVisible: false
        });
    };

    render() {
        const { signInVisible, signUpVisible } = this.state;
        const { auth } = this.props;
        const { isAuthenticated } = auth;
        
        const menu = (
            <Menu>
                <Menu.Item>
                    <Link to="/profile">Thông Tin Cá Nhân</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/my-trip">Chuyến Đi</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/" onClick={() => this.props.actionLogout()}>Đăng Xuất</Link>
                </Menu.Item>
            </Menu>
        );

        return (
            <HeaderWrapper a={true}>
                <Navbar color="dark" light expand="md">
                    
                        <Link to="/">
                        <img src={Logo} className="logo" alt="Logo" />
                        </Link>
                   
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto align-items-center" navbar>
                            <NavItem className="mr-3">
                                <Link
                                    to="/trips"
                                    className="text-white cursor-point"
                                >
                                    Danh Sách Chuyến Xe
                                </Link>
                            </NavItem>

                            {isAuthenticated ? (
                                <>
                                    <NavItem className="mr-3">
                                        <Dropdown overlay={menu}>
                                            <Avatar
                                                icon="user"
                                                className="cursor-point"
                                            />
                                        </Dropdown>
                                    </NavItem>
                                </>
                            ) : (
                                <>
                                    <NavItem className="mr-3">
                                        <p
                                            className="text-white cursor-point mb-0"
                                            onClick={() =>
                                                this.signInModal(true)
                                            }
                                        >
                                            Đăng Nhập
                                        </p>

                                        <SignInForm
                                            signInVisible={signInVisible}
                                            signInModal={this.signInModal}
                                            signUpModal={this.signUpModal}
                                        />
                                    </NavItem>
                                    <NavItem className="mr-3">
                                        <Button
                                            type="button"
                                            className="btn-primary cursor-point mb-0"
                                            onClick={() =>
                                                this.signUpModal(true)
                                            }
                                        >
                                            <FaUserCircle className="mr-1" />
                                            Đăng Ký
                                        </Button>

                                        <SignUpForm
                                            signUpVisible={signUpVisible}
                                            signUpModal={this.signUpModal}
                                            signInModal={this.signInModal}
                                        />
                                    </NavItem>
                                </>
                            )}
                        </Nav>
                    </Collapse>
                </Navbar>
            </HeaderWrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer
    };
};

export default connect(
    mapStateToProps,
    { actionLogout }
)(Header);
