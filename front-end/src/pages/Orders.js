import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import { requestGet } from '../services/request';

function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const { data } = await requestGet('/sale');
    setOrders(data);
    console.log('o usuário consegue ver todos os pedidos existentes');
  };

  useEffect(() => {
    getOrders();
  }, []);

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
