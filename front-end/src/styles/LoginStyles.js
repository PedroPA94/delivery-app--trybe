import styled from 'styled-components';

export const LoginImage = styled.img`
  width: 326px;
  height: 316px;
  margin-bottom: 50px;
`;

export const LoginContainer = styled.div`
  position: relative;
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
