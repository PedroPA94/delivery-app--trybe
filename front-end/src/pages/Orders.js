import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import { requestGet } from '../services/request';

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
          <>
            {orders.map((item) => (
              <div key={ item.id }>
                <OrderCard order={ item } />
              </div>)) }
          </>
        )}
    </div>
  );
}

export default Orders;
