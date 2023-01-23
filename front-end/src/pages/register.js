import React from 'react';

function Register() {
  const [localName, setLocalName] = useState('');
  const [localEmail, setLocalEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const { setName, setEmail } = useContext(UserContext);

  const history = useHistory();
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
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid="common_login__input-email"
            type="email"
            id="email"
            placeholder="seu-email@site.com.br"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            data-testid="common_login__input-email"
            type="password"
            id="password"
            placeholder="********"
          />
        </label>
        <button
          data-testid="common_register__button-register"
          type="button"
        >
          CADASTRAR
        </button>
      </form>
    </main>
  );
}

export default Register;
