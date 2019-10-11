import React from "react";
import { Select } from "antd";
import { FooterWrapper, FooterCopyRight, FooterLanguage } from "./styled";

const Footer = () => {
    const { Option } = Select;

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <FooterWrapper color="dark">
            <FooterCopyRight>© 2019 Nguyen Ngoc Lan Anh</FooterCopyRight>
            <FooterLanguage>
                <Select
                    defaultValue="Tiếng Việt"
                    style={{ width: 120 }}
                    onChange={handleChange}
                >
                    <Option value="vn">Tiếng Việt</Option>
                    <Option value="eng">Tiếng Anh</Option>
                </Select>
            </FooterLanguage>
        </FooterWrapper>
    );
};

export default Footer;
