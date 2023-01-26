import { useState } from 'react';
import { requestPost } from '../services/request';

const MIN_NAME_LENGTH = 12;
const MIN_PASSWORD_LENGTH = 6;
const NEW_USER_MODEL = {
  name: '',
  email: '',
  password: '',
  role: 'seller',
};

function NewUserForm() {
  const [newUser, setNewUser] = useState(NEW_USER_MODEL);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleChange = (target) => {
    const { name, value } = target;
    setNewUser({ ...newUser, [name]: value });
  };

  const isSubmitEnabled = () => {
    const { name, email, password } = newUser;
    const validName = name.length >= MIN_NAME_LENGTH;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const validEmail = emailRegex.test(email);
    const validPassword = password.length >= MIN_PASSWORD_LENGTH;
    return validName && validEmail && validPassword;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await requestPost('/register/admin', newUser);
    } catch (error) {
      console.error(error);
      setShowErrorMessage(true);
      return;
    }
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
            value={ newUser.name }
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
            value={ newUser.email }
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
            value={ newUser.password }
            onChange={ ({ target }) => handleChange(target) }
          />
        </label>
        <label htmlFor="name">
          Tipo
          <select
            name="role"
            default="seller"
            data-testid="admin_manage__select-role"
            value={ newUser.role }
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
      <p
        data-testid="admin_manage__element-invalid-register"
        hidden={ !showErrorMessage }
      >
        *Usuário já existe
      </p>
    </>
  );
}

export default NewUserForm;
