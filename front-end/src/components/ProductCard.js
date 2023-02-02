import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IoAddCircleSharp, IoRemoveCircleOutline } from 'react-icons/io5';
import AppContext from '../AppContext/AppContext';
import {
  Img,
  Price,
  ProductCardContainer,
  CartControls,
  Quantity,
  CardButtons,
} from '../styles/ProductCard';

function ProductCard({ product }) {
  const {
    id,
    name,
    price,
    url_image: urlImage,
  } = product;

  const [quantity, setQuantity] = useState(0);
  const { changeQuantity } = useContext(AppContext);

  useEffect(() => changeQuantity({ ...product, quantity }), [quantity]);

  return (
    <ProductCardContainer>
      <div>
        <Img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt={ name }
        />
      </div>
      <div>
        <p
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          { name }
        </p>
        <Price
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { price.replace('.', ',') }
        </Price>
        <CartControls>
          <CardButtons
            type="button"
            id="decrease"
            onClick={ () => { if (quantity > 0) setQuantity(quantity - 1); } }
            data-testid={ `customer_products__button-card-rm-item-${id}` }
          >
            <IoRemoveCircleOutline />
          </CardButtons>
          <Quantity
            type="number"
            min="0"
            data-testid={ `customer_products__input-card-quantity-${id}` }
            value={ quantity }
            onChange={ ({ target }) => setQuantity(Number(target.value)) }
          />
          <CardButtons
            type="button"
            onClick={ () => setQuantity(quantity + 1) }
            data-testid={ `customer_products__button-card-add-item-${id}` }
          >
            <IoAddCircleSharp />
          </CardButtons>
        </CartControls>
      </div>
    </ProductCardContainer>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    url_image: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
