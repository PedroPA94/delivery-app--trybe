import styled from 'styled-components';

export const mainColor = '#262624';
export const emphasisColor = '#C99D66';
export const textColor = '#F2F2F2';
export const inputColor = '#FFFFFF';
export const placeholderColor = '#949494';
export const disabledButton = '#BFB3A8';

export const AdmContainer = styled.div`
  padding-top: 60px;
  /* position: relative; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AdmForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AdmLabel = styled.label`
  margin-bottom: 20px;
  text-align: left;
`;

export const LinkText = styled.button`
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  text-decoration: none;
  &:focus {
    outline: none;
  }
`;

export const Select = styled.select`
  background-color: ${inputColor};
  color: ${mainColor};
  padding: 10px;
  margin-bottom: 20px;
  width: 270px;
  height: 55px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  font-family: Mulish, sans-serif;
  ::placeholder { color: ${placeholderColor}};
  option {
  color: ${placeholderColor};
  };
  ::selected { background-color: ${placeholderColor}; 
    color: ${placeholderColor}; }
`;
