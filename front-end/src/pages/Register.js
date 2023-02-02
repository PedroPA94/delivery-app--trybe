import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { requestPost, setToken } from '../services/request';
import { Button, Input } from '../styles/GlobalStyles';
import { LoginForm } from '../styles/LoginStyles';
import RegisterContainer from '../styles/RegisterStyles';

function Register() {
  const [localName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const verifyLoginFormat = () => {
    const localNameLength = localName.length >= Number('12');
    const passwordLength = 6;
    return (/\S+@\S+\.\S+/.test(email))
    && (password.length >= passwordLength)
    && (localNameLength);
  };

  useEffect(() => {
    verifyLoginFormat();
  }, [email, password, localName]);

  const handleLoginButton = async (event) => {
    event.preventDefault();

    try {
      const { data } = await requestPost(
        '/register',
        { name: localName, email, password },
      );
      setToken(data.token);
      localStorage.setItem('user', JSON.stringify(data));
      return navigate('/customer/products');
    } catch (error) {
      toast.error('Usuário já cadastrado');
    }
  };

  return (
    <main>
      <RegisterContainer>
        <h1>Novo usuário</h1>
        <LoginForm className="form-register">
          <Input
            data-testid="common_register__input-name"
            type="text"
            id="nome"
            placeholder="Seu nome"
            value={ localName }
            onChange={ ({ target }) => setName(target.value) }
            required
          />
          <Input
            data-testid="common_register__input-email"
            type="email"
            id="email"
            placeholder="seu-email@site.com.br"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            required
          />
          <Input
            data-testid="common_register__input-password"
            type="password"
            id="password"
            placeholder="********"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
            required
          />
          <Button
            data-testid="common_register__button-register"
            type="submit"
            onClick={ (event) => handleLoginButton(event) }
            disabled={ !verifyLoginFormat() }
          >
            CADASTRAR
          </Button>
        </LoginForm>
        {/* {(incorrectLogin) && (
          <p data-testid="common_register__element-invalid_register">
            *Login ou senha está com formato incorreto.
          </p>
        )} */}
      </RegisterContainer>
    </main>
  );
}

export default Register;
