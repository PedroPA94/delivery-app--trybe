import styled from 'styled-components';
import { mainColor } from './GlobalStyles';

export const CheckoutContainer = styled.main`
  display: flex;
  flex-flow: column;
  gap: 5px;
  padding-top: 70px;
  
  section {
    padding: 0 30px;
  }

  h2 {
    font-weight: 400;
  }
`;

export const FormContainer = styled.div`
  background-color: ${mainColor};
  position: fixed;
  height: 300px;
  bottom: 0;
  width: 100%;
  padding: 0 30px;
  margin: 0;
`;
