import styled from 'styled-components';

export const Table = styled.table`
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

export const OrderTable = styled.div`
  /* right: 0;
  position: absolute; */
`;
