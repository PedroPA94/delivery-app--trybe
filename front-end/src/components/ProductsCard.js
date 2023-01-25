import React, { useState } from 'react';

function ProductsCard(products) {
  const {
    id,
    name,
    price,
    url_image: urlImage,
  } = products;

  const [quantity, setQuantity] = useState(0);
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity <= 0) { setQuantity(quantity - 1); }
  };

  return (
    <div>
      <div
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { price }
      </div>
      <div
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }
      </div>
      <div
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      >
        { urlImage }
      </div>
      <button
        type="button"
        id="decrease"
        onClick={ () => handleDecrement() }
        data-testid={ `customer_products__button-card-rm-item-${id}` }
      >
        -
      </button>
      <div
        data-testid={ `customer_products__input-card-quantity-${id}` }
      >
        { quantity }
      </div>
      <button
        type="button"
        onClick={ () => handleIncrement() }
        data-testid={ `customer_products__button-card-add-item-${id}` }
      >
        +
      </button>

    </div>
  );
}

export default ProductsCard;
