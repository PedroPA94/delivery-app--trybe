import styled from 'styled-components';

export const LoginImage = styled.img`
  width: 350px;
  height: auto;
  /* margin-bottom: 20px; */
`;

export const LoginContainer = styled.div`
  padding-top: 20px;
  /* position: relative; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginLabel = styled.label`
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
