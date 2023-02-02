import styled from 'styled-components';
import { emphasisColor, Input } from './GlobalStyles';

export const ProductCardContainer = styled.div`
  background-color: #F2F2F208;
  width: 324px;
  height: 194px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
`;

export const CardDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

export const Img = styled.img`
  height: 154px;
`;

export const Price = styled.p`
  color: ${emphasisColor};
  font-weight: 600;
  ::before {
    content: 'R$ ';
  }
`;

export const CartControls = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

export const Quantity = styled(Input)`
  width: 38px;
  height: 31px;
  text-align: center;
::-webkit-outer-spin-button,
::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
[type=number] {
  -moz-appearance: textfield;
}
`;

export const CardButtons = styled.button`
  background-color: transparent;
  border: none;
  color: ${emphasisColor};
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 22px;
`;
