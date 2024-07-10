// import styled from "styled-components";

// export const WrapperContentInfo = styled.div`
// padding: 10px 0;
// `
// export const WrapperHeaderUser= styled.div`
// display: flex;
//   justify-content: space-between;
//   background: #fff;
//   padding: 20px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   margin-bottom: 20px;
//   border-radius: 8px;
// `
// export const WrapperLabel= styled.div`
// font-weight: bold;
// margin-bottom: 5px;
// color: #333;
// `
// export const WrapperStyleContent= styled.div`
// background: #fff;
// padding: 20px;
// box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// border-radius: 8px;
// `
// export const WrapperInfoUser= styled.div`
// flex: 1;
// margin: 0 10px;
// `
// export const WrapperProduct = styled.div`
//     display: flex;
//     align-items: flex-start;
//     margin-top: 10px;
// `
// export const WrapperNameProduct = styled.div`
//     display: flex;
//     align-items: flex-start;
//     width: 670px;
// `
// export const WrapperItem = styled.div`
//     width: 200px;
//     font-weight: bold;
//     &:last-child{
//         color: red
//     }
// `
// export const WrapperItemLabel = styled.div`
//     width: 200px;
//     &:last-child{
//         font-weight: bold;
//     }
// ` 
// export const WrapperAllPrice = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: flex-end; 
// `

import styled from "styled-components";

export const WrapperContentInfo = styled.div`
  padding: 10px 0;
`;

export const WrapperHeaderUser = styled.div`
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border-radius: 8px;
`;

export const WrapperLabel = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;

export const WrapperStyleContent = styled.div`
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const WrapperInfoUser = styled.div`
  flex: 1;
  margin: 0 10px;
`;

export const WrapperProduct = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

export const WrapperNameProduct = styled.div`
  display: flex;
  align-items: flex-start;
  width: 670px;
`;

export const WrapperItem = styled.div`
  width: 200px;
  font-weight: bold;
  color: #555;
  &:last-child {
    color: red;
  }
`;

export const WrapperItemLabel = styled.div`
  width: 200px;
  font-weight: bold;
  color: #555;
  &:last-child {
    font-weight: bold;
  }
`;

export const WrapperAllPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 20px;
`;

export const WrapperAllPriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;
