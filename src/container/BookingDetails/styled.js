import styled from "styled-components";

export const Wrapper = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    padding: 16px;
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
    margin-top: 40px;

    .ant-empty-normal {
        margin-bottom: 0;
    }

    label {
        margin-right: 40px;
    }
`;

export const BodyWrapper = styled.div`
    margin: 32px 0;
    flex-grow: 1;
`;