import styled, { css } from 'styled-components';
import { Button } from './GlobalStyles';

const statusChecker = css`
  background-color: ${({ status }) => {
    if (status === 'Entregue') return '#29872F';
    if (status === 'Em Trânsito') return '#5D6DC9';
    if (status === 'Preparando') return '#C3B63E';
    return '#CC3835';
  }};
`;

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
