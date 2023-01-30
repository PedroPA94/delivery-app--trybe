import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import { requestGetAllSale } from '../services/request';

function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const { data } = await requestGetAllSale('/sale');
    console.log(data);
    setOrders(data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  console.log('orders', orders);

  return (
    <div>
      <Navbar />
      {orders.map((item) => (
        <div key={ item.id }>
          <OrderCard order={ item } />
        </div>)) }
    </div>
  );
}

export default Orders;
