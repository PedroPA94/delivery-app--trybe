import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';
import Provider from '../../AppContext/Provider';
import Login from '../../pages/Login';
import { customer } from '../mocks/requisitions';
import renderWithRouterAndContext from '../utils/renderWithRouterAndContext';

jest.mock('axios');

describe('Login page', () => {
  it('should have a login form with input elements', () => {
    renderWithRouterAndContext(<Login />, Provider, ['/login']);

    const emailInput = screen.getByTestId('common_login__input-email');
    const passwordInput = screen.getByTestId('common_login__input-password');
    const loginButton = screen.getByTestId('common_login__button-login');
    const registerButton = screen.getByTestId('common_login__button-register');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
    expect(registerButton).toBeInTheDocument();
  });

  // it(
  //   'should change to the register page when user clicks "Ainda não tenho conta" button',
  //   () => {
  //     const { history } = renderWithRouterAndContext(<Login />, Provider, ['/login']);

  //     const registerButton = screen.getByTestId('common_login__button-register');

  //     userEvent.click(registerButton);
  //     expect(history.location.pathname).toBe('/register');
  //   },
  // );

  it('should change to products page if the client login is correct', async () => {
    render(<App />, { wrapper: BrowserRouter });

    axios.post.mockResolvedValue(customer);

    const emailInput = screen.getByTestId('common_login__input-email');
    const passwordInput = screen.getByTestId('common_login__input-password');
    const loginButton = screen.getByTestId('common_login__button-login');

    userEvent.type(emailInput, 'cliente@email.com');
    userEvent.type(passwordInput, '123456');

    expect(emailInput).toHaveValue('cliente@email.com');
    expect(passwordInput).toHaveValue('123456');
    expect(loginButton).toBeEnabled();
    // const { location: { pathname } } = window;

    await userEvent.click(loginButton);

    expect(screen.getByTestId('common_login__element-invalid-email'))
      .toBeInTheDocument();
    // expect(screen.getByTestId('customer_products__element-card-title-1'))
    //   .toBeInTheDocument();
  });
});
