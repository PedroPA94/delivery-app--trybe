import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext/AppContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { requestGet, requestPut } from '../services/request';

function StatusSales({ saleIdOrder }) {
  const [user] = useLocalStorage('user');
  const { setOrder, order } = useContext(AppContext);
  const [isCustomer, setIsCustomer] = useState(false);
  const [status, setStatus] = useState('');

  const getOrders = async () => {
    const { data } = await requestGet(`/sale/${saleIdOrder}`);
    const result = data.map((item) => ({
      ...item.product, ...item.sale, ...item,
    }));
    setOrder(result);
  };

  useEffect(() => {
    getOrders();
  }, [status]);

  useEffect(() => {
    setStatus(order[0].status);
  }, [order]);

  useEffect(() => {
    const checkRole = (data) => data.role === 'customer';
    setIsCustomer(checkRole(user));
  }, [user]);

  const updateStatus = async (newStatus) => {
    await requestPut('/sale/orders', { saleId: saleIdOrder, status: newStatus });
    getOrders();
  };

  const dataTestOrder = '_order_details__element-order-details-label-delivery-status';
  const testid = `${user.role}${dataTestOrder}`;

  return (
    <div>
      { (isCustomer)
        ? (
          <div>
            <h1
              data-testid={ testid }
            >
              Status:
              {' '}
              {status}
            </h1>
            <button
              data-testid="customer_order_details__button-delivery-check"
              type="button"
              disabled={ status !== 'Em Trânsito' }
              onClick={ () => updateStatus('Entregue') }
            >
              MARCAR COMO ENTREGUE
            </button>
          </div>)
        : (
          <div>
            <h1
              data-testid={ testid }
            >
              Status:
              {' '}
              {status}
            </h1>
            <button
              data-testid="seller_order_details__button-preparing-check"
              type="button"
              disabled={ status !== 'Pendente' }
              onClick={ () => {
                updateStatus('Preparando');
              } }
            >
              Preparar Pedido
            </button>
            <button
              data-testid="seller_order_details__button-dispatch-check"
              type="button"
              disabled={ status !== 'Preparando' }
              onClick={ () => updateStatus('Em Trânsito') }
            >
              Saiu para entrega
            </button>
          </div>
        )}
    </div>
  );
}

StatusSales.propTypes = {
  saleIdOrder: PropTypes.number.isRequired,
};

export default StatusSales;
