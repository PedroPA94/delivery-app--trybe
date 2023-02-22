import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrderCard from '../../components/OrderCard';
import renderWithRouterAndContext from '../utils/renderWithRouterAndContext';

const mockOrder = {
  id: 1,
  status: 'Entregue',
  saleDate: '/01/01/2023',
  totalPrice: '2.20',
  deliveryAddress: 'Street of Dreams',
};

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('The OrderCard component:', () => {
  beforeAll(() => {
    localStorage.setItem('user', JSON.stringify({ role: 'seller' }));
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('Renders the expected elements', () => {
    renderWithRouterAndContext(<OrderCard order={ mockOrder } />);

    const button = screen
      .getByTestId('seller_orders__element-order-id-1');
    const date = screen
      .getByTestId('seller_orders__element-order-date-1');
    const price = screen
      .getByTestId('seller_orders__element-card-price-1');
    const address = screen
      .getByTestId('seller_orders__element-card-address-1');
    const status = screen
      .getByTestId('seller_orders__element-delivery-status-1');

    expect(button).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(address).toBeInTheDocument();
    expect(status).toBeInTheDocument();
  });

  it('Renders the correct values', () => {
    renderWithRouterAndContext(<OrderCard order={ mockOrder } />);

    const orderNumber = screen
      .getByText('Pedido');
    const date = screen
      .getByTestId('seller_orders__element-order-date-1');
    const price = screen
      .getByTestId('seller_orders__element-card-price-1');
    const address = screen
      .getByTestId('seller_orders__element-card-address-1');
    const status = screen
      .getByTestId('seller_orders__element-delivery-status-1');

    expect(orderNumber).toHaveTextContent('Pedido1');
    expect(date).toHaveTextContent('01/01/2023');
    expect(price).toHaveTextContent('R$ 2,20');
    expect(address).toHaveTextContent('Street of Dreams');
    expect(status).toHaveTextContent('Entregue');
  });

  it('Redirects the user to the correct details page', () => {
    renderWithRouterAndContext(<OrderCard order={ mockOrder } />);

    const button = screen
      .getByTestId('seller_orders__element-order-id-1');

    userEvent.click(button);

    expect(mockedUsedNavigate).toHaveBeenCalled();
    expect(mockedUsedNavigate).toHaveBeenCalledWitcdh('/seller/orders/1');
  });
});
