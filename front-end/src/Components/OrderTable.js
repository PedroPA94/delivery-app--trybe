import { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext/AppContext';

function OrderTable(userType, page) {
  const { cart, setCart } = useContext(AppContext);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const value = cart.reduce((acc, item) => {
      acc += item.subTotal;
      return acc;
    }, 0);
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
            <tr key={ index }>
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
                {item.unityPrice}
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

export default OrderTable;
