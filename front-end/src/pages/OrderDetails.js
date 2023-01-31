import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import Navbar from '../components/Navbar';
import OrderTable from '../components/OrderTable';
import StatusSales from '../components/StatusSales';
import { requestGet } from '../services/request';

function OrderDetails() {
  const { setOrder, order } = useContext(AppContext);
  const { id } = useParams();
  const [sellerName, setSellerName] = useState();

  const getOrders = async () => {
    const { data } = await requestGet(`/sale/${id}`);
    const result = data.map((item) => ({
      ...item.product, ...item.sale, ...item,
    }));
    setOrder(result);
  };

  const getUsers = async () => {
    const sellers = await requestGet('/seller');
    const result = sellers.data.find((e) => e.id === order[0].sellerId);
    setSellerName(result.name);
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    getUsers();
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
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            Pedido
            00
            {id}
            ;
          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {sellerName}

          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            {(new Date(order[0].saleDate)).toLocaleDateString('en-GB')}
          </p>
          <StatusSales saleId={ id } status={ order[0].status } />
          {/* <p
            data-testid={ testid }
          >
            {order[0].status}
          </p>
          <button
            data-testid="customer_order_details__button-delivery-check"
            type="button"
          >
            MARCAR COMO ENTREGUE

          </button> */}
        </>
      )}
      <OrderTable page="order_details" />
    </div>
  );
}

export default OrderDetails;
