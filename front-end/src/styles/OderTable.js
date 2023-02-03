import styled from 'styled-components';

export const OrderTableContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 50px;
  padding-bottom: 370px;
`;

export const Table = styled.table`
  padding: 0;
  margin: 0;

  td { 
    vertical-align: top;
    padding: 7px;
  }

  td p {
    padding: 0;
    margin: 0;

    :nth-child(2) {
    color: #BFB3A8;
  }
  }

  td:nth-child(1) {
    padding-left: 0;
    padding-right: 7px;
  }

  td:nth-child(2) {
    width: 40%
  }

  td:nth-child(4) {
    padding: 7px 0;
  }

  td:nth-child(5) {
    padding: 7px 0;
    width: 30px;
  }

  td:nth-child(5) button {
    background-color: transparent;
    border: none;
    color: white;
    font-size: 25px;
    padding: 0;
    margin: 0;
    width: 30px;
  }
`;

export const TotalPriceContainer = styled.div`
  display: flex;
  flex-flow: column;
  padding: 0;
  margin: 0;

  p {
    align-self: flex-end;
    font-weight: 700;
  }
`;
