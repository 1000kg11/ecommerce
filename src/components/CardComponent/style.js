import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img{
        height: 200px;
        width: 200px;
    }
    position: relative;
    background-color: ${props => props.disabled ? '#ccc' : '#fff'}
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}
`


export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: rgb(56, 56, 61);
    font-weight: 400;
`

export const WrapperReportText = styled.div`
    font-weight: 11px;
    display: flex;
    align-items: center;
    color: rgb(128, 128, 137);
    margin: 6px 0 0px;
`

export const WrapperPriceText = styled.div`
    font-weight: 500;
    font-size: 16px;
    color: rgb(255, 66, 78);
`

export const WrapperDiscountText = styled.div`
    font-weight: 500;
    font-size: 12px;
    color: rgb(255, 66, 78);
`
export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`