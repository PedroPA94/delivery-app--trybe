import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext/AppContext';
import useLocalStorage from '../hooks/useLocalStorage';

function OrderTable({ page }) {
  const { cart, setCart, getTotalValue } = useContext(AppContext);
  const [user] = useLocalStorage('user');
  const { role: userType } = user;

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const value = getTotalValue();
    setTotalPrice(value);
  }, [cart]);

  const handleRemoveProduct = (productIndex) => {
    const newCart = cart.filter((_e, index) => productIndex !== index);
    setCart(newCart);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            {(page === 'checkout') && (
              <th>Remover Item</th>
            )}
          </tr>
        </thead>
        <tbody>
          { cart.map((item, index) => (
            <tr key={ item.id }>
              <td
                data-testid={
                  `${userType}_${page}__element-order-table-item-number-${index}`
                }
              >
                {(index + 1)}
              </td>
              <td
                data-testid={
                  `${userType}_${page}__element-order-table-name-${index}`
                }
              >
                {item.name}
              </td>
              <td
                data-testid={
                  `${userType}_${page}__element-order-table-quantity-${index}`
                }
              >
                {item.quantity}
              </td>
              <td
                data-testid={
                  `${userType}_${page}__element-order-table-unit-price-${index}`
                }
              >
                {item.price}
              </td>
              <td
                data-testid={
                  `${userType}_${page}__element-order-table-sub-total-${index}`
                }
              >
                {item.subTotal}
              </td>
              {(page === 'checkout') && (
                <td
                  data-testid={
                    `${userType}_${page}__element-order-table-remove-${index}`
                  }
                >
                  <button type="button" onClick={ () => handleRemoveProduct(index) }>
                    Remover
                  </button>
                </td>
              )}
            </tr>))}
        </tbody>
      </table>
      <div>
        <p data-testid={ `${userType}_${page}__element-order-total-price` }>
          Total: R$
          {' '}
          {totalPrice}
        </p>
      </div>
    </div>
  );
}

OrderTable.propTypes = {
  page: PropTypes.string.isRequired,
};

export default OrderTable;
