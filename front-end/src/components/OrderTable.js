import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext/AppContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { OrderTableContainer, TotalPriceContainer } from '../styles/OderTable';
import GenericTable from './GenericTable';

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
      <GenericTable
        data={ productList }
        userType={ userType }
        page={ page }
        handleRemove={ handleRemoveProduct }
      />
      <TotalPriceContainer>
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
      </TotalPriceContainer>
    </OrderTableContainer>
  );
}

OrderTable.propTypes = {
  page: PropTypes.string.isRequired,
};

export default OrderTable;
