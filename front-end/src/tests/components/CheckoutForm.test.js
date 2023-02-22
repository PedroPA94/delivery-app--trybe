import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import AppContext from '../../AppContext/AppContext';
import CheckoutForm from '../../components/CheckoutForm';
import renderWithRouterAndContext from '../utils/renderWithRouterAndContext';

const mockSellers = [{
  id: 1,
  name: 'Fulana Pereira',
}];

const selectTestId = 'customer_checkout__select-seller';
const addressTestId = 'customer_checkout__input-address';
const numberTestId = 'customer_checkout__input-address-number';
const buttonTestId = 'customer_checkout__button-submit-order';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('The CheckoutForm component:', () => {
  beforeAll(() => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@test.com' }));
  });

  afterAll(() => {
    localStorage.clear();
  });

  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockSellers });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders the expected elements', () => {
    renderWithRouterAndContext(<CheckoutForm />, AppContext);

    const selectSeller = screen
      .getByTestId(selectTestId);
    const address = screen
      .getByTestId(addressTestId);
    const deliveryNumber = screen
      .getByTestId(numberTestId);
    const button = screen
      .getByTestId(buttonTestId);

    expect(selectSeller).toBeInTheDocument();
    expect(address).toBeInTheDocument();
    expect(deliveryNumber).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('Enables the submit button only when the fields are correctly set', async () => {
    renderWithRouterAndContext(<CheckoutForm />, AppContext);

    const button = screen
      .getByTestId(buttonTestId);
    const selectSeller = screen
      .getByTestId(selectTestId);
    const address = screen
      .getByTestId(addressTestId);
    const deliveryNumber = screen
      .getByTestId(numberTestId);

    expect(button).toBeDisabled();

    waitFor(() => userEvent.selectOptions(selectSeller, '1'));

    expect(button).toBeDisabled();

    userEvent.type(address, 'Street XYZ');

    expect(button).toBeDisabled();

    userEvent.type(deliveryNumber, '300');

    waitFor(() => expect(button).toBeEnabled());
  });

  it(`When the button is clicked, a POST request is sent to the API 
  and the user is redirected to the order detail page`, async () => {
    jest.spyOn(axios, 'post').mockResolvedValue({ data: { saleId: 1 } });

    renderWithRouterAndContext(<CheckoutForm />, AppContext);

    const button = screen
      .getByTestId(buttonTestId);
    const selectSeller = screen
      .getByTestId(selectTestId);
    const address = screen
      .getByTestId(addressTestId);
    const deliveryNumber = screen
      .getByTestId(numberTestId);

    waitFor(() => userEvent.selectOptions(selectSeller, '1'));
    userEvent.type(address, 'Street XYZ');
    userEvent.type(deliveryNumber, '300');

    userEvent.click(button);

    waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalled();
      expect(mockedUsedNavigate).toHaveBeenLastCalledWith('/customer/orders/1');
    });
  });

  it('Sets the correct values on inputs and select elements', async () => {
    const testAddress = 'Street AAA';

    renderWithRouterAndContext(<CheckoutForm />, AppContext);

    const selectSeller = screen
      .getByTestId(selectTestId);
    const address = screen
      .getByTestId(addressTestId);
    const deliveryNumber = screen
      .getByTestId(numberTestId);

    expect(selectSeller).toHaveTextContent('Pessoa Vendedora Responsável');
    expect(address).toHaveTextContent('');
    expect(deliveryNumber).toHaveTextContent('');

    waitFor(() => userEvent.selectOptions(selectSeller, '1'));
    userEvent.type(address, testAddress);
    userEvent.type(deliveryNumber, '300');

    waitFor(() => {
      expect(selectSeller).toHaveTextContent(mockSellers[0].name);
      expect(address).toHaveTextContent(testAddress);
      expect(deliveryNumber).toHaveTextContent('300');
      expect(selectSeller).toHaveValue(mockSellers[0].id);
      expect(address).toHaveValue(testAddress);
      expect(deliveryNumber).toHaveValue('300');
    });
  });
});
