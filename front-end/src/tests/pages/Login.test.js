import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import Provider from '../../AppContext/Provider';
import Login from '../../pages/Login';
import axios from '../../services/request';
import { customer, seller } from '../mocks/requisitions';
import renderWithRouterAndContext from '../utils/renderWithRouterAndContext';

const emailDataTestId = 'common_login__input-email';
const passwordDataTestId = 'common_login__input-password';
const loginButtonDataTestId = 'common_login__button-login';

describe('Login page', () => {
  it('should have a login form with input elements', () => {
    renderWithRouterAndContext(<Login />, Provider, ['/login']);

    const emailInput = screen.getByTestId(emailDataTestId);
    const passwordInput = screen.getByTestId(passwordDataTestId);
    const loginButton = screen.getByTestId(loginButtonDataTestId);
    const registerButton = screen.getByTestId('common_login__button-register');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
    expect(registerButton).toBeInTheDocument();
  });

  it(
    'should change to the register page when user clicks "Ainda não tenho conta" button',
    async () => {
      renderWithRouterAndContext(<App />, Provider, ['/login']);

      const registerButton = screen.getByTestId('common_login__button-register');

      userEvent.click(registerButton);
      const title = await screen.findByText('Cadastro');
      expect(title).toBeInTheDocument();
    },
  );

  it('should change to products page if the client login is correct', async () => {
    renderWithRouterAndContext(<App />, Provider, ['/login']);

    jest.spyOn(axios, 'post').mockResolvedValue(customer);

    const emailInput = screen.getByTestId(emailDataTestId);
    const passwordInput = screen.getByTestId(passwordDataTestId);
    const loginButton = screen.getByTestId(loginButtonDataTestId);

    userEvent.type(emailInput, 'cliente@email.com');
    userEvent.type(passwordInput, '123456');

    expect(emailInput).toHaveValue('cliente@email.com');
    expect(passwordInput).toHaveValue('123456');
    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);

    const cart = await screen.findByTestId('customer_products__checkout-bottom-value');
    expect(cart).toBeInTheDocument();
  });

  it('should change to products page if the seller login is correct', async () => {
    renderWithRouterAndContext(<App />, Provider, ['/login']);

    jest.spyOn(axios, 'post').mockResolvedValue(seller);

    const emailInput = screen.getByTestId(emailDataTestId);
    const passwordInput = screen.getByTestId(passwordDataTestId);
    const loginButton = screen.getByTestId(loginButtonDataTestId);

    userEvent.type(emailInput, 'seller@email.com');
    userEvent.type(passwordInput, '123456');

    expect(emailInput).toHaveValue('seller@email.com');
    expect(passwordInput).toHaveValue('123456');
    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);

    const titleHeader = await screen.findByText('Pedido');
    expect(titleHeader).toBeInTheDocument();
  });

  it('should not allow to sign in if the login is incorrect', async () => {
    renderWithRouterAndContext(<App />, Provider, ['/login']);

    jest.spyOn(axios, 'post').mockResolvedValue({});

    const emailInput = screen.getByTestId(emailDataTestId);
    const passwordInput = screen.getByTestId(passwordDataTestId);
    const loginButton = screen.getByTestId(loginButtonDataTestId);

    userEvent.type(emailInput, 'wrong@email.com');
    userEvent.type(passwordInput, '123456');

    act(() => {
      userEvent.click(loginButton);
    });

    const errorMessage = await screen.findByTestId('common_login__element-invalid-email');

    expect(errorMessage).toBeInTheDocument();
  });
});
