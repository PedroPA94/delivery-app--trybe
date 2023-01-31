import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from '../../services/request';
import AppContext from '../../AppContext/AppContext';
import Products from '../../pages/Products';
import renderWithRouterAndContext from '../utils/renderWithRouterAndContext';
import App from '../../App';

const CUSTOMER_ROUTE = '/customer/products';
const CART_BUTTON_TESTID = 'customer_products__button-cart';

const mockProducts = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: '2.20',
    url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: '7.50',
    url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
];

describe('The Product page:', () => {
  beforeAll(() => {
    localStorage.setItem('user', JSON.stringify({ token: 'token' }));
  });

  afterAll(() => {
    localStorage.clear();
  });

  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockProducts });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders the expected elements', async () => {
    renderWithRouterAndContext(
      <Products />,
      AppContext,
      [CUSTOMER_ROUTE],
    );

    const { id } = mockProducts[0];

    // Navbar
    const navbarLink = await screen
      .findByTestId('customer_products__element-navbar-link-products');

    // ProductCard
    const productName = await screen
      .findByTestId(`customer_products__element-card-title-${id}`);

    // Cart button
    const cartButton = await screen
      .findByTestId(CART_BUTTON_TESTID);
    const cartValue = await screen
      .findByTestId('customer_products__checkout-bottom-value');

    expect(navbarLink).toBeInTheDocument();
    expect(productName).toBeInTheDocument();
    expect(cartButton).toBeInTheDocument();
    expect(cartValue).toBeInTheDocument();
  });

  it('Updates the cart value correctly', async () => {
    renderWithRouterAndContext(
      <Products />,
      AppContext,
      [CUSTOMER_ROUTE],
    );

    const { id } = mockProducts[0];

    const cartValue = await screen
      .findByTestId('customer_products__checkout-bottom-value');
    const addFirstProductButton = await screen
      .findByTestId(`customer_products__button-card-add-item-${id}`);
    const removeFirstProductButton = await screen
      .findByTestId(`customer_products__button-card-rm-item-${id}`);

    expect(cartValue).toHaveTextContent('0,00');

    userEvent.dblClick(addFirstProductButton);

    expect(cartValue).toHaveTextContent('4,40');

    userEvent.click(removeFirstProductButton);

    expect(cartValue).toHaveTextContent('2,20');
  });

  it('Enables the checkout button only if there are items in the cart', async () => {
    renderWithRouterAndContext(
      <App />,
      AppContext,
      [CUSTOMER_ROUTE],
    );

    const { id } = mockProducts[0];

    const cartButton = await screen
      .findByTestId(CART_BUTTON_TESTID);
    const addFirstProductButton = await screen
      .findByTestId(`customer_products__button-card-add-item-${id}`);

    expect(cartButton).toBeDisabled();

    userEvent.click(addFirstProductButton);

    expect(cartButton).toBeEnabled();
  });

  it('Navigates to the checkout page when the button is clicked', async () => {
    renderWithRouterAndContext(
      <App />,
      AppContext,
      [CUSTOMER_ROUTE],
    );

    const { id } = mockProducts[0];

    const cartButton = await screen
      .findByTestId(CART_BUTTON_TESTID);
    const addFirstProductButton = await screen
      .findByTestId(`customer_products__button-card-add-item-${id}`);

    userEvent.click(addFirstProductButton);
    userEvent.click(cartButton);

    const checkoutPageText = await screen
      .findByRole('heading', { level: 2, name: /finalizar pedido/i });

    expect(checkoutPageText).toBeInTheDocument();
  });

  it(
    'Redirects to the login page if the user is not logged in or authorized',
    async () => {
      jest.spyOn(axios, 'get').mockRejectedValue();

      renderWithRouterAndContext(
        <App />,
        AppContext,
        [CUSTOMER_ROUTE],
      );

      const loginEmail = await screen.findByTestId('common_login__input-email');

      expect(loginEmail).toBeInTheDocument();
    },
  );
});
