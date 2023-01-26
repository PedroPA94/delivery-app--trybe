import { useState } from 'react';

const MIN_NAME_LENGTH = 12;
const MIN_PASSWORD_LENGTH = 6;
const NEW_USER_MODEL = {
  name: '',
  email: '',
  password: '',
  role: 'seller',
};

function NewUserForm() {
  const [newUSer, setNewUser] = useState(NEW_USER_MODEL);

  const handleChange = (target) => {
    const { name, value } = target;
    setNewUser({ ...newUSer, [name]: value });
  };

  const isSubmitEnabled = () => {
    const { name, email, password } = newUSer;
    const validName = name.length >= MIN_NAME_LENGTH;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const validEmail = emailRegex.test(email);
    const validPassword = password.length >= MIN_PASSWORD_LENGTH;
    return validName && validEmail && validPassword;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // submit para o back
    setNewUser(NEW_USER_MODEL);
  };

  return (
    <>
      <h2>Cadastrar novo usuário</h2>
      <form>
        <label htmlFor="name">
          Nome completo
          <input
            type="text"
            name="name"
            placeholder="Nome"
            data-testid="admin_manage__input-name"
            value={ newUSer.name }
            onChange={ ({ target }) => handleChange(target) }
          />
        </label>
        <label htmlFor="name">
          Email
          <input
            type="email"
            name="email"
            placeholder="seu-email@site.com.br"
            data-testid="admin_manage__input-email"
            value={ newUSer.email }
            onChange={ ({ target }) => handleChange(target) }
          />
        </label>
        <label htmlFor="name">
          Senha
          <input
            type="password"
            name="password"
            placeholder="******"
            data-testid="admin_manage__input-password"
            value={ newUSer.password }
            onChange={ ({ target }) => handleChange(target) }
          />
        </label>
        <label htmlFor="name">
          Tipo
          <select
            name="role"
            default="seller"
            data-testid="admin_manage__select-role"
            value={ newUSer.role }
            onChange={ ({ target }) => handleChange(target) }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ (event) => handleSubmit(event) }
          disabled={ !isSubmitEnabled() }
          data-testid="admin_manage__button-register"
        >
          CADASTRAR
        </button>
      </form>
    </>
  );
}

export default NewUserForm;
