import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { requestGet, requestPost } from '../services/request';
import Loading from './Loading';

function CheckoutForm() {
  const { cart, getTotalValue } = useContext(AppContext);

  const [user] = useLocalStorage('user');
  const { email: userEmail } = user;

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState(0);
  const [isFetching, setIsFetching] = useState(true);

  const navigate = useNavigate();

  const fetchSellers = async () => {
    const { data } = await requestGet('/seller');
    setSellerId(data[0].id);
    setSellers(data);
    setIsFetching();
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleSubmitButton = async (event) => {
    event.preventDefault();

    const totalPrice = getTotalValue();

    try {
      const { data } = await requestPost(
        '/sale',
        { cart,
          totalPrice,
          sellerId,
          deliveryAddress,
          deliveryNumber,
          userEmail },
      );
      return navigate(`/customer/orders/${data.saleId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    isFetching
      ? <Loading />
      : (
        <form>
          <label htmlFor="select-seller">
            P. Vendedora Responsável:
            <select
              type="text"
              id="select-seller"
              data-testid="customer_checkout__select-seller"
              onChange={ ({ target }) => setSellerId(target.value) }
              required
            >
              {(sellers.length > 0) && sellers.map((item) => (
                <option key={ item.id } value={ item.id }>{item.name}</option>
              ))}
            </select>
          </label>
          <label htmlFor="address">
            Endereço
            <input
              type="text"
              id="address"
              data-testid="customer_checkout__input-address"
              value={ deliveryAddress }
              onChange={ ({ target }) => setDeliveryAddress(target.value) }
              required
            />
          </label>
          <label htmlFor="address-number">
            Número
            <input
              type="text"
              id="address-number"
              data-testid="customer_checkout__input-address-number"
              value={ deliveryNumber }
              onChange={ ({ target }) => setDeliveryNumber(target.value) }
              required
            />
          </label>
          <button
            type="submit"
            data-testid="customer_checkout__button-submit-order"
            onClick={ (event) => handleSubmitButton(event) }
          >
            FINALIZAR PEDIDO
          </button>
        </form>
      )

  );
}

export default CheckoutForm;
