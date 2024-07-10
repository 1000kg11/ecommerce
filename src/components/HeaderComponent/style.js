import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
 
export const WrapperHeader = styled(Row)`
    padding: 10px 0px;
    background-color: rgb(26, 148, 255);
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    width: 1270px;
`
export const WrapperTextHeader = styled(Link)`
    font-size: 18pz;
    color: #fff;
    font-weight: bold;
    text-align: left;
`
export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    font-size: 12px;
`
export const WrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    color: #fff;

`
export const WrapperIconHeader = styled.span`
    font-size: 30px;
    color: #fff;
    white-space: nowrap
`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover{
        color: rgb(26, 148, 255);
    }
`