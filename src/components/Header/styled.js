import styled from "styled-components";
import { Modal } from "antd";
import { theme } from "./../../theme";
import { DropdownMenu } from "reactstrap";
import { DatePicker} from 'antd';


export const HeaderWrapper = styled.header`
    color: ${props => props.theme.headerBackgroundColor};

    .logo {
        width: auto;
        height: 35px;
    }
`;

export const ModalCustom = styled(Modal)`
    .ant-modal-footer {
        display: none;
    }
`;

export const UserType = styled.label`
    input {
        display: none;
    }

    .label-wrapper {
        border: 1px solid rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.2s;
        padding: 20px 40px 15px 40px;
        border-radius: 5px;
        margin-bottom: 0;

        &:hover {
            border-color: ${theme.primary};
        }
    }

    input:checked + .label-wrapper {
        border-color: ${theme.primary};
    }
`;

export const DropdownMenuCustom = styled(DropdownMenu)`
    min-width: 6rem !important;
    padding: 0 !important;
    transform: translate3d(-60px, 44px, 0px) !important;

    button {
        font-size: 14px;
    }
`;
export const DatePickerCustom = styled(DatePicker)`
    display: block !important;
`;