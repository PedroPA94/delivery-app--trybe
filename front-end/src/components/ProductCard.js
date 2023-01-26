import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../AppContext/AppContext';

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
    <div>
      <div
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { price.replace('.', ',') }
      </div>
      <div
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }
      </div>
      <div>
        <img
          src={ urlImage }
          alt={ name }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />
      </div>
      <button
        type="button"
        id="decrease"
        onClick={ () => { if (quantity > 0) setQuantity(quantity - 1); } }
        data-testid={ `customer_products__button-card-rm-item-${id}` }
      >
        -
      </button>
      <input
        type="number"
        // min="0"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        value={ quantity }
        onChange={ ({ target }) => setQuantity(Number(target.value)) }
      />
      <button
        type="button"
        onClick={ () => setQuantity(quantity + 1) }
        data-testid={ `customer_products__button-card-add-item-${id}` }
      >
        +
      </button>

    </div>
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
