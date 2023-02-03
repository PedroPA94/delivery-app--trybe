import styled from 'styled-components';
import { emphasisColor } from './GlobalStyles';

export const OrdersPageWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 70px;

`;

export const CustomerOrderContainer = styled.div`
  background-color: #F2F2F208;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
  flex-direction: column;
  margin: 10px;
  
  `;
export const CardButtons = styled.button`
  background-color: transparent;
  width: 80%;
  border: none;
  color: ${emphasisColor};
  display: flex;
  align-items: center;
  font-size: 22px;
  flex-direction: column;
  p {
  font-family: 'Mulish';
  font-style: normal;
  font-size: 20px;

  color: #F2F2F2;}

`;
export const PriceDateDiv = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
`;

export const DateDiv = styled.div`
text-align: left;
`;

// export const Status = styled.p`

// `;
