import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo.svg';

function Login() {
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
      <img src={ Logo } alt="app-logo" />
      <form>
        <label htmlFor="login">
          Login
          <input
            type="email"
            id="login"
            data-testid="common_login__input-email"
            placeholder="email@trybeer.com.br"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            required
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            data-testid="common_login__input-password"
            placeholder="************"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
            required
          />
        </label>
        <button
          type="submit"
          data-testid="common_login__button-login"
          onClick={ (event) => handleLoginButton(event) }
        >
          LOGIN
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => navigate('/cadastro') }
        >
          Ainda não tenho conta
        </button>
      </form>
      {(incorrectLogin) && (
        <p data-testid="common_login__element-invalid-email">
          *Sinto muito, seu login ou senha está incorreto.
        </p>
      )}
    </main>
  );
}

export default Login;
