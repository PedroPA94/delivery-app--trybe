import styled from 'styled-components';
import { emphasisColor, mainColor } from './GlobalStyles';

export const Header = styled.header`
  background-color: ${emphasisColor};
  font-size: 18px;
  color: ${mainColor};
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
`;

export const MenuButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const MenuButton = styled.button`
  padding: 0;
  background-color: ${emphasisColor};
  border: none;
  font-size: 30px;
  color: ${mainColor};
`;
