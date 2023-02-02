import styled from 'styled-components';

export const mainColor = '#262624';
export const emphasisColor = '#C99D66';
export const textColor = '#F2F2F2';
export const inputColor = '#FFFFFF';
export const placeholderColor = '#949494';
export const disabledButton = '#BFB3A8';

export const GlobalStyles = styled.main`
  @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700;800&display=swap');
  background-color: ${mainColor};
  color: ${textColor};
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-family: Mulish, sans-serif;
`;

export const Input = styled.input`
  background-color: ${inputColor};
  color: ${mainColor};
  width: 251px;
  height: 39px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  font-family: Mulish, sans-serif;
  ::placeholder { color: ${placeholderColor}};
`;

export const Button = styled.button`
  background-color: ${emphasisColor};
  color: ${mainColor};
  width: 251px;
  height: 39px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  font-weight: 700;
  font-family: Mulish, sans-serif;
  :disabled {
    background-color: ${disabledButton};
    color: #616161;
  }
`;
