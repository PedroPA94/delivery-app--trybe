import { useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { requestPut } from '../services/request';

function StatusSales({ saleId, status }) {
  const [user] = useLocalStorage('user');
  const [isCustomer, setIsCustomer] = useState(false);

  useEffect(() => {
    const checkRole = (data) => data.role === 'customer';
    setIsCustomer(checkRole(user));
  }, [user]);

  const updateStatus = async (newStatus) => {
    await requestPut('/', { saleId, status: newStatus });
  };

  return (
    <div>
      { (isCustomer)
        ? (
          <div>
            <h1
              data-testid="customer_order_details__
                            element-order-details-label-delivery-status"
            >
              Status:
              {' '}
              {status}
            </h1>
            <button
              data-testid="customer_order_details__button-delivery-check"
              type="button"
              disabled={ status === 'Em transito' }
              onClick={ () => updateStatus('Entregue') }
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
              onClick={ () => updateStatus('Preparando') }
            >
              Preparar Pedido
            </button>
            <button
              data-testid="seller_order_details__button-dispatch-check"
              type="button"
              disabled={ status !== 'Preparando' }
              onClick={ () => updateStatus('Em transito') }
            >
              Saiu para entrega
            </button>
          </div>
        )}
      ;

    </div>
  );
}

StatusSales.propTypes = {
  saleId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default StatusSales;
