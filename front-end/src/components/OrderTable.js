import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { IoTrashSharp } from 'react-icons/io5';
import AppContext from '../AppContext/AppContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { OrderTableContainer, Table, TotalPriceContainer } from '../styles/OderTable';

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
    <OrderTableContainer>
      <Table>
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
                x
                {item.quantity}
              </td>
              <td
                data-testid={
                  `${userType}_${page}__element-order-table-sub-total-${index}`
                }
              >
                R$
                {' '}
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
                    <IoTrashSharp />
                  </button>
                </td>
              )}
            </tr>))}
        </tbody>
      </Table>
      <TotalPriceContainer>
        {productList.length > 0
        && (
          <p>
            Total: R$
            {' '}
            <span
              data-testid={ `${userType}_${page}__element-order-total-price` }
            >
              {
                (page === 'checkout'
                  ? totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                  : productList[0].totalPrice.replace('.', ','))
              }
            </span>
          </p>
        )}
      </TotalPriceContainer>
    </OrderTableContainer>
  );
}

OrderTable.propTypes = {
  page: PropTypes.string.isRequired,
};

export default OrderTable;
