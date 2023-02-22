import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppContext from '../../AppContext/AppContext';
import Navbar from '../../components/Navbar';
import renderWithRouterAndContext from '../utils/renderWithRouterAndContext';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('The Navbar component:', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({
      name: 'Teste',
      role: 'customer',
    }));
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('Renders the expected elements', () => {
    renderWithRouterAndContext(<Navbar />, AppContext);

    const username = screen
      .getByTestId('customer_products__element-navbar-user-full-name');
    const linkToProducts = screen
      .getByTestId('customer_products__element-navbar-link-products');
    const linkToOrders = screen
      .getByTestId('customer_products__element-navbar-link-orders');
    const logout = screen
      .getByTestId('customer_products__element-navbar-link-logout');

    expect(username).toBeInTheDocument();
    expect(username).toHaveTextContent('Teste');
    expect(linkToProducts).toBeInTheDocument();
    expect(linkToOrders).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
  });

  it('Navigates to the correct routes', async () => {
    renderWithRouterAndContext(<Navbar />, AppContext);

    const linkToOrders = screen
      .getByTestId('customer_products__element-navbar-link-orders');

    userEvent.click(linkToOrders);

    expect(mockedUsedNavigate).toHaveBeenCalled();
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/customer/orders');

    const linkToProducts = screen
      .getByTestId('customer_products__element-navbar-link-products');

    userEvent.click(linkToProducts);

    expect(mockedUsedNavigate).toHaveBeenCalled();
    expect(mockedUsedNavigate).toHaveBeenLastCalledWith('/customer/products');
  });

  it('Correctly handles the logout', async () => {
    renderWithRouterAndContext(<Navbar />, AppContext);
    const logout = screen
      .getByTestId('customer_products__element-navbar-link-logout');

    userEvent.click(logout);

    expect(mockedUsedNavigate).toHaveBeenCalled();
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
    expect(localStorage.getItem('user')).toBeNull();
  });
});
