import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import { requestGet } from '../services/request';
import { CustomerOrderContainer, OrdersPageWrap } from '../styles/Order';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const getOrders = async () => {
    const { data } = await requestGet('/sale');
    setOrders(data);
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
          <OrdersPageWrap>
            {orders.map((item) => (
              <CustomerOrderContainer key={ item.id }>
                <OrderCard order={ item } />
              </CustomerOrderContainer>)) }
          </OrdersPageWrap>
        )}
    </div>
  );
}

export default Orders;
