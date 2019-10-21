import styled from "styled-components";
import { InputNumber } from "antd";

export const RecentTripSection = styled.section`
    background-color: #fff;
    padding: 40px;

    h3 {
        color: #26abed;
    }

    strong {
        color: #fff;
    }

    button {
        width: 200px;
    }
`;

export const Thumb = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

export const Price = styled.div`
    font-size: ${props => props.priceFont || "15px"};
`;

export const InputNumberCustom = styled(InputNumber)`
    display: block !important;
    width: 100% !important;
`;
