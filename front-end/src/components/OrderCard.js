import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { CardButtons, DateDiv, PriceDateDiv } from '../styles/Order';

function OrderCard({ order }) {
  const { id, status, saleDate, totalPrice, deliveryAddress } = order;
  const [user] = useLocalStorage('user');
  const navigate = useNavigate();

  const handleButton = (event) => {
    event.preventDefault();
    navigate(`/${user.role}/orders/${id}`);
  };

  return (
    <CardButtons
      data-testid={ `${user.role}_orders__element-order-id-${id}` }
      type="button"
      onClick={ (event) => handleButton(event) }
    >
      <PriceDateDiv>
        <DateDiv>
          <p>
            Pedido
            <span>{id}</span>
          </p>
          <p data-testid={ `${user.role}_orders__element-order-date-${id}` }>
            {(new Date(saleDate)).toLocaleDateString('en-GB')}
          </p>
        </DateDiv>
        <div>
          <p data-testid={ `${user.role}_orders__element-card-price-${id}` }>
            {totalPrice.replace('.', ',')}
          </p>
        </div>
      </PriceDateDiv>
      { user.role === 'seller'
          && (
            <div data-testid={ `seller_orders__element-card-address-${id}` }>
              <p>{deliveryAddress}</p>
            </div>
          )}
      <p data-testid={ `${user.role}_orders__element-delivery-status-${id}` }>
        {status}
      </p>
    </CardButtons>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.number,
    deliveryAddress: PropTypes.string,
  }).isRequired,
};

export default OrderCard;
