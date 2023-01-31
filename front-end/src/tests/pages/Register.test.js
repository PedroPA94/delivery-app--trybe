import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import Provider from '../../AppContext/Provider';
import Register from '../../pages/Register';
import axios from '../../services/request';
import { customer } from '../mocks/requisitions';
import renderWithRouterAndContext from '../utils/renderWithRouterAndContext';

const nameDataId = 'common_register__input-name';
const emailDataTestId = 'common_register__input-email';
const passwordDataTestId = 'common_register__input-password';
const registerButtonDataTestId = 'common_register__button-register';

describe('Register page', () => {
  it('should have a register form with input elements', () => {
    renderWithRouterAndContext(<Register />, Provider, ['/register']);

    const nameInput = screen.getByTestId(nameDataId);
    const emailInput = screen.getByTestId(emailDataTestId);
    const passwordInput = screen.getByTestId(passwordDataTestId);
    const registerButton = screen.getByTestId(registerButtonDataTestId);

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeDisabled();
  });

  it('should allow to register a new client', async () => {
    renderWithRouterAndContext(<App />, Provider, ['/register']);

    jest.spyOn(axios, 'post').mockResolvedValue(customer);

    const nameInput = screen.getByTestId(nameDataId);
    const emailInput = screen.getByTestId(emailDataTestId);
    const passwordInput = screen.getByTestId(passwordDataTestId);
    const registerButton = screen.getByTestId(registerButtonDataTestId);

    userEvent.type(nameInput, 'Cliente Nome');
    userEvent.type(emailInput, 'cliente@email.com');
    userEvent.type(passwordInput, '123456');

    expect(nameInput).toHaveValue('Cliente Nome');
    expect(emailInput).toHaveValue('cliente@email.com');
    expect(passwordInput).toHaveValue('123456');
    expect(registerButton).toBeEnabled();

    userEvent.click(registerButton);

    const cart = await screen.findByTestId('customer_products__checkout-bottom-value');
    expect(cart).toBeInTheDocument();
  });

  it('should not allow to sign in if it could not connect to database', async () => {
    renderWithRouterAndContext(<App />, Provider, ['/register']);

    jest.spyOn(axios, 'post').mockResolvedValue({});

    const nameInput = screen.getByTestId(nameDataId);
    const emailInput = screen.getByTestId(emailDataTestId);
    const passwordInput = screen.getByTestId(passwordDataTestId);
    const registerButton = screen.getByTestId(registerButtonDataTestId);

    userEvent.type(nameInput, 'Random Nome Example');
    userEvent.type(emailInput, 'test@email.com');
    userEvent.type(passwordInput, '123456');

    act(() => {
      userEvent.click(registerButton);
    });

    const errorMessage = await screen
      .findByTestId('common_register__element-invalid_register');

    expect(errorMessage).toBeInTheDocument();
  });
});
