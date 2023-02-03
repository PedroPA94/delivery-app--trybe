import styled from 'styled-components';
import { Button, Input, inputColor, mainColor } from './GlobalStyles';

export const Form = styled.form`
  display: flex;
  flex-flow: column;
  gap: 15px;
`;

export const SelectForm = styled.select`
  background-color: ${inputColor};
  color: ${mainColor};
  margin: 0;
  height: 35px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  padding: 5px 10px;
  font-family: Mulish, sans-serif;
  width: 300px;
`;

export const InputForm = styled(Input)`
  margin: 0;
  height: 35px;
  padding: 5px 10px;
  width: 280px;
`;

export const SendOrderButton = styled(Button)`
  margin: 0;
  height: 35px;
  padding: 5px 10px;
  width: 300px;
`;
