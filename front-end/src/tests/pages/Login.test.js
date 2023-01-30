import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Provider from '../../AppContext/Provider';
import Login from '../../pages/Login';

import renderWithRouterAndContext from '../utils/renderWithRouterAndContext';

jest.mock('axios');

// const allProviders = ({ children }) => (
//   <Provider>
//     <BrowserRouter>
//       {children}
//     </BrowserRouter>
//   </Provider>
// );

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

  it(
    'should change to the register page when user clicks "Ainda não tenho conta" button',
    async () => {
      renderWithRouterAndContext(<Login />, Provider, ['/login']);

      const registerButton = screen.getByTestId('common_login__button-register');

      userEvent.click(registerButton);

      expect(screen.getByTestId('common_register__input-email'));
    },
  );

  // it('should change to products page if the client login is correct', async () => {
  //   // render(<App />, { wrapper: BrowserRouter });
  //   render(
  //     <App />,
  //     { wrapper: BrowserRouter },
  //   );
  //   // render(<App />, { wrapper: allProviders });

  //   axios.post.mockResolvedValue(customer);

  //   const emailInput = screen.getByTestId('common_login__input-email');
  //   const passwordInput = screen.getByTestId('common_login__input-password');
  //   const loginButton = screen.getByTestId('common_login__button-login');

  //   userEvent.type(emailInput, 'cliente@email.com');
  //   userEvent.type(passwordInput, '123456');

  //   expect(emailInput).toHaveValue('cliente@email.com');
  //   expect(passwordInput).toHaveValue('123456');
  //   expect(loginButton).toBeEnabled();
  //   // const { location: { pathname } } = window;

  //   userEvent.click(loginButton);

  //   expect(screen.getByTestId('customer_products__element-card-title-1'))
  //     .toBeInTheDocument();

  //   // expect(screen.getByTestId('common_login__element-invalid-email'))
  //   //   .toBeInTheDocument();
  //   // expect(screen.getByTestId('customer_products__element-card-title-1'))
  //   //   .toBeInTheDocument();
  // });
});
