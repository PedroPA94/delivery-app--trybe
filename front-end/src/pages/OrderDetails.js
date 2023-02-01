import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import Navbar from '../components/Navbar';
import OrderTable from '../components/OrderTable';
import useLocalStorage from '../hooks/useLocalStorage';
import { requestGet, requestPut } from '../services/request';

function OrderDetails() {
  const [isCustomer, setIsCustomer] = useState(false);
  const [user] = useLocalStorage('user');
  const { setOrder, order } = useContext(AppContext);
  const { id } = useParams();
  const [sellerName, setSellerName] = useState();
  const [date, setDate] = useState('');

  const getOrders = async () => {
    const { data } = await requestGet(`/sale/${id}`);
    const result = data.map((item) => ({
      ...item.product, ...item.sale, ...item,
    }));
    setOrder(result);
  };

  const updateStatus = async (newStatus) => {
    console.log(order[0].saleId);
    await requestPut('/sale/orders', { saleId: order[0].saleId, status: newStatus });
    getOrders();
    console.log(order);
  };

  const dataTestOrder = '_order_details__element-order-details-label-delivery-status';
  const testid = `${user.role}${dataTestOrder}`;

  const getUsers = async () => {
    if (order.length > 0) {
      const sellers = await requestGet('/seller');
      console.log(order[0]);
      const result = sellers.data.find((e) => e.id === order[0].sellerId);
      setSellerName(result.name);
    }
  };

  useEffect(() => {
    const checkRole = (data) => data.role === 'customer';
    setIsCustomer(checkRole(user));
  }, [user]);

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    getUsers();
    if (order.length > 0) {
      console.log(typeof order[0].saleDate);
      setDate((new Date(order[0].saleDate)).toLocaleDateString('en-GB'));
    }
  }, [order]);

  // const testid = 'customer_order_details__element-order-details-label-delivery-status';

  return (
    <div>
      <Navbar />
      <h1>Detalhe do Pedido</h1>
      { order.length > 0
      && (
        <>
          <p
            data-testid={
              `${user.role}_order_details__element-order-details-label-order-id`
            }
          >
            Pedido
            00
            {id}
          </p>
          { (
            user.role === 'customer')
          && (
            <p
              data-testid={
                `${user.role}_order_details__element-order-details-label-seller-name`
              }
            >
              {sellerName}
            </p>
          )}
          <p
            data-testid={
              `${user.role}_order_details__element-order-details-label-order-date`
            }
          >
            { date }
          </p>
          <div>
            { (isCustomer)
              ? (
                <div>
                  <h1
                    data-testid={ testid }
                  >
                    Status:
                    {' '}
                    {order[0].status}
                  </h1>
                  <button
                    data-testid="customer_order_details__button-delivery-check"
                    type="button"
                    disabled={ order[0].status !== 'Em Trânsito' }
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
                    {order[0].status}
                  </h1>
                  <button
                    data-testid="seller_order_details__button-preparing-check"
                    type="button"
                    disabled={ order[0].status !== 'Pendente' }
                    onClick={ () => {
                      updateStatus('Preparando');
                    } }
                  >
                    Preparar Pedido
                  </button>
                  <button
                    data-testid="seller_order_details__button-dispatch-check"
                    type="button"
                    disabled={ order[0].status !== 'Preparando' }
                    onClick={ () => updateStatus('Em Trânsito') }
                  >
                    Saiu para entrega
                  </button>
                </div>
              )}
          </div>
        </>
      )}
      <OrderTable page="order_details" />
    </div>
  );
}

export default OrderDetails;
