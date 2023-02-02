import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { requestPost, setToken } from '../services/request';

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
      <h1>Cadastro</h1>
      <form className="form-register">
        <label htmlFor="nome">
          Nome
          <input
            data-testid="common_register__input-name"
            type="text"
            id="nome"
            placeholder="Seu nome"
            value={ localName }
            onChange={ ({ target }) => setName(target.value) }
            required
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid="common_register__input-email"
            type="email"
            id="email"
            placeholder="seu-email@site.com.br"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            required
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            data-testid="common_register__input-password"
            type="password"
            id="password"
            placeholder="********"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
            required
          />
        </label>
        <button
          data-testid="common_register__button-register"
          type="submit"
          onClick={ (event) => handleLoginButton(event) }
          disabled={ !verifyLoginFormat() }
        >
          CADASTRAR
        </button>
      </form>
    </main>
  );
}

export default Register;
