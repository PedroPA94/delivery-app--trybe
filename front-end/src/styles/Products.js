import styled from 'styled-components';
import { mainColor, PopIn, PopOut } from './GlobalStyles';

export const ProductsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 70px 0 60px;
`;

export const Cart = styled.button`
  border-radius: 50%;
  border: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-size: 36px;
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #D9D9D9;
  color: ${mainColor};
  animation: ${PopIn} 0.5s ease-out 1;
  :disabled {
    animation: ${PopOut} 0.2s ease-in;
    transform: scale(0);
  }
`;
