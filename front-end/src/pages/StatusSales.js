import { useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

function StatusSales() {
  const [user] = useLocalStorage('user');
  const [status, setStatus] = useState('Pendente');
  const [isCustomer, setIsCustomer] = useState(false);

  useEffect(() => {
    const checkRole = (data) => data.role === 'customer';
    setIsCustomer(checkRole(user));
  }, [user]);

  const handlePrepareOrder = () => {
    setStatus('Preparando');
  };

  const handleDelivery = () => {
    setStatus('Em transito');
  };

  const handleDelivered = () => {
    setStatus('Entregue');
  };

  return (
    <div>
      { (isCustomer)
        ? (
          <div>
            <h1
              data-testid="customer_order_details__
                            element-order-details-label-delivery-status<index>"
            >
              Status:
              {' '}
              {status}
            </h1>
            <button
              data-testid="customer_order_details__button-delivery-check"
              type="button"
              disabled={ status === 'Em transito' }
              onClick={ handleDelivered }
            >
              MARCAR COMO ENTREGUE
            </button>
          </div>)
        : (
          <div>
            <h1
              data-testid="seller_order_details__
                            element-order-details-label-delivery-status"
            >
              Status:
              {' '}
              {status}
            </h1>
            <button
              data-testid="seller_order_details__button-preparing-check"
              type="button"
              disabled={ status !== 'Pendente' }
              onClick={ handlePrepareOrder }
            >
              Preparar Pedido
            </button>
            <button
              data-testid="seller_order_details__button-dispatch-check"
              type="button"
              disabled={ status !== 'Preparando' }
              onClick={ handleDelivery }
            >
              Saiu para entrega
            </button>
          </div>
        )}
      ;

    </div>
  );
}

export default StatusSales;
