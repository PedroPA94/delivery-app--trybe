import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext/AppContext';
import useLocalStorage from '../hooks/useLocalStorage';

function OrderTable({ page }) {
  const { cart, getTotalValue, changeQuantity, order } = useContext(AppContext);
  const [user] = useLocalStorage('user');
  const { role: userType } = user;
  const [productList, setProductList] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const value = getTotalValue();
    setTotalPrice(value);
  }, [cart]);

  useEffect(() => {
    if (page === 'checkout') {
      setProductList(cart);
    } else {
      setProductList(order);
    }
  }, [cart, order]);

  const handleRemoveProduct = (product) => {
    changeQuantity({ ...product, quantity: 0 });
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
          { productList.map((item, index) => (
            <tr key={ item.id }>
              <td
                data-testid={
                  `${userType}_${page}__element-order-table-item-number-${index}`
                }
              >
                {(index + 1)}
              </td>
              <td>
                <p
                  data-testid={
                    `${userType}_${page}__element-order-table-name-${index}`
                  }
                >
                  {item.name}
                </p>
                <p
                  data-testid={
                    `${userType}_${page}__element-order-table-unit-price-${index}`
                  }
                >
                  {item.price.replace('.', ',')}
                </p>
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
                  `${userType}_${page}__element-order-table-sub-total-${index}`
                }
              >
                {(item.quantity * item.price)
                  .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </td>
              {(page === 'checkout') && (
                <td>
                  <button
                    data-testid={
                      `${userType}_${page}__element-order-table-remove-${index}`
                    }
                    type="button"
                    onClick={ () => handleRemoveProduct(item) }
                  >
                    Remover
                  </button>
                </td>
              )}
            </tr>))}
        </tbody>
      </table>
      <div>
        {productList.length > 0 && page === 'checkout'
        && (
          <p>
            Total: R$
            {' '}
            <span
              data-testid={ `${userType}_${page}__element-order-total-price` }
            >
              {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

OrderTable.propTypes = {
  page: PropTypes.string.isRequired,
};

export default OrderTable;
