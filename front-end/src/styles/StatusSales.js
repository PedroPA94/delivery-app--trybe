import styled from 'styled-components';
import { Button, statusChecker } from './GlobalStyles';

export const StatusButton = styled(Button)` 
  ${statusChecker}
  letter-spacing: 2px;
  font-size: 15px;
  color: white;
  text-transform: uppercase;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
