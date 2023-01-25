import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

function OrderCard({ order }) {
  const { id, status, date, price, address } = order;
  const [user] = useLocalStorage('user');
  const navigate = useNavigate();

  const handleButton = (event) => {
    event.preventDefault();
    navigate(`/${user.role}/orders/${id}`);
  };

  return (
    <button type="button" onClick={ (event) => handleButton(event) }>
      <div data-testid={ `${user.role}_orders__element-order-id-${id}` }>
        <p>Pedido</p>
        <p>{id}</p>
      </div>
      <div data-testid={ `${user.role}_orders__element-delivery-status-${id}` }>
        <p>{status}</p>
      </div>
      <div data-testid={ `${user.role}_orders__element-order-date-${id}` }>
        <p>{date}</p>
      </div>
      <div data-testid={ `${user.role}_orders__element-card-price-${id}` }>
        <p>{price}</p>
      </div>
      { address
          && (
            <div data-testid={ `seller_orders__element-card-address-${id}` }>
              <p>{address}</p>
            </div>
          )}
    </button>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    date: PropTypes.string,
    price: PropTypes.number,
    address: PropTypes.string,
  }).isRequired,
};

export default OrderCard;
