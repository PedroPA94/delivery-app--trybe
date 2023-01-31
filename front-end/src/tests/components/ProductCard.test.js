import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppContext from '../../AppContext/AppContext';
import ProductCard from '../../components/ProductCard';
import renderWithRouterAndContext from '../utils/renderWithRouterAndContext';

const mockProduct = {
  id: 1,
  name: 'Skol Lata 250ml',
  price: '2.20',
  url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
};

describe('The ProductCard component:', () => {
  it('Renders the expected elements', () => {
    renderWithRouterAndContext(<ProductCard product={ mockProduct } />, AppContext);

    const price = screen
      .getByTestId(`customer_products__element-card-price-${mockProduct.id}`);
    const name = screen
      .getByTestId(`customer_products__element-card-title-${mockProduct.id}`);
    const img = screen
      .getByTestId(`customer_products__img-card-bg-image-${mockProduct.id}`);
    const decreaseBtn = screen
      .getByTestId(`customer_products__button-card-rm-item-${mockProduct.id}`);
    const increseBtn = screen
      .getByTestId(`customer_products__button-card-add-item-${mockProduct.id}`);
    const quantity = screen
      .getByTestId(`customer_products__input-card-quantity-${mockProduct.id}`);

    expect(price).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(decreaseBtn).toBeInTheDocument();
    expect(increseBtn).toBeInTheDocument();
    expect(quantity).toBeInTheDocument();
  });

  it('Shows the expected values for each element', () => {
    renderWithRouterAndContext(<ProductCard product={ mockProduct } />, AppContext);

    const price = screen
      .getByTestId(`customer_products__element-card-price-${mockProduct.id}`);
    const name = screen
      .getByTestId(`customer_products__element-card-title-${mockProduct.id}`);
    const img = screen
      .getByTestId(`customer_products__img-card-bg-image-${mockProduct.id}`);

    expect(price).toHaveTextContent('2,20');
    expect(name).toHaveTextContent(mockProduct.name);
    expect(img).toHaveAttribute('src', mockProduct.url_image);
    expect(img).toHaveAttribute('alt', mockProduct.name);
  });

  it('Allows changing the quantity by clicking the add/remove buttons', () => {
    renderWithRouterAndContext(<ProductCard product={ mockProduct } />, AppContext);

    const decreaseBtn = screen
      .getByTestId(`customer_products__button-card-rm-item-${mockProduct.id}`);
    const increseBtn = screen
      .getByTestId(`customer_products__button-card-add-item-${mockProduct.id}`);
    const quantity = screen
      .getByTestId(`customer_products__input-card-quantity-${mockProduct.id}`);

    expect(quantity).toHaveValue(0);

    userEvent.dblClick(increseBtn);
    expect(quantity).toHaveValue(2);

    userEvent.click(decreaseBtn);
    expect(quantity).toHaveValue(1);
  });

  it('Allows changing the quantity by setting it directly in the input', () => {
    renderWithRouterAndContext(<ProductCard product={ mockProduct } />, AppContext);

    const quantity = screen
      .getByTestId(`customer_products__input-card-quantity-${mockProduct.id}`);

    expect(quantity).toHaveValue(0);

    userEvent.type(quantity, '2');
    expect(quantity).toHaveValue(2);
  });

  it('Does not allow a negative quantity', () => {
    renderWithRouterAndContext(<ProductCard product={ mockProduct } />, AppContext);

    const decreaseBtn = screen
      .getByTestId(`customer_products__button-card-rm-item-${mockProduct.id}`);
    const quantity = screen
      .getByTestId(`customer_products__input-card-quantity-${mockProduct.id}`);

    expect(quantity).toHaveValue(0);

    userEvent.type(quantity, '-2');
    expect(quantity).toHaveValue(0);

    userEvent.dblClick(decreaseBtn);
    expect(quantity).toHaveValue(0);
  });
});
