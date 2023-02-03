import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import OrderTable from '../components/OrderTable';
import StatusSales from '../components/StatusSales';
import useLocalStorage from '../hooks/useLocalStorage';
import { requestGet } from '../services/request';
import OrderDetailsContainer from '../styles/OrderDetails';

function OrderDetails() {
  const [user] = useLocalStorage('user');
  const { setOrder, order } = useContext(AppContext);
  const { id } = useParams();
  const [sellerName, setSellerName] = useState();
  const [date, setDate] = useState('');
  const [isFetching, setIsFetching] = useState(true);

  const getSellerName = async () => {
    const sellers = await requestGet('/seller');
    const sellerResult = sellers.data.find((e) => e.id === order[0].sellerId);
    setSellerName(sellerResult.name);
  };

  const getOrders = async () => {
    const { data } = await requestGet(`/sale/${id}`);
    const result = data.map((item) => ({
      ...item.product, ...item.sale, ...item,
    }));
    setOrder(result);
    await getSellerName();
    setDate((new Date(result[0].saleDate)).toLocaleDateString('en-GB'));
    setIsFetching(false);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <Navbar />
      { isFetching
        ? <Loading />
        : (
          <OrderDetailsContainer>
            <h1>Detalhes do Pedido</h1>
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
          <p>
            Total: R$
            {' '}
            {order[0].totalPrice.replace('.', ',')}
          </p>
          <StatusSales saleIdOrder={ order[0].saleId } />
        </>
      )}
            <OrderTable page="order_details" />
          </OrderDetailsContainer>
        )}
    </div>
  );
}

export default OrderDetails;
