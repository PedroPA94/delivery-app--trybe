import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [localName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [incorrectLogin, setIncorrectLogin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [userRole, setUserRole] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setIncorrectLogin(false);
  }, [email, password]);

  const verifyLoginFormat = () => {
    const passwordLength = 6;
    return (/\S+@\S+\.\S+/.test(email)) && (password.length >= passwordLength);
  };

  const handleLoginButton = async (event) => {
    event.preventDefault();
    if (!verifyLoginFormat()) return setIncorrectLogin(false);

    try {
      const { token } = await requestLogin('/login', { email, password });
      setToken(token);
      const { role } = await requestData('/login/validate', { email, password });
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      setUserRole(role);
    } catch (error) {
      setIncorrectLogin(true);
      setIsLogged(false);
    }
  };

  if (isLogged) return navigate(`/${userRole}`);

  return (
    <main>
      <h1>Cadastro</h1>
      <form className="form-register">
        <label htmlFor="nome">
          Nome
          <input
            data-testid="common_register_input-name"
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
            data-testid="common_login__input-email"
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
            data-testid="common_login__input-email"
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
          disable={ verifyLoginFormat() }
        >
          CADASTRAR
        </button>
      </form>
      {(incorrectLogin) && (
        <p data-testid="common_register__element-invalid-email">
          *Login ou senha está com formato incorreto.
        </p>
      )}
    </main>
  );
}

export default Register;
