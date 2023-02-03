import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { requestGet, requestPost } from '../services/request';

function CheckoutForm() {
  const { cart, setCart, getTotalValue } = useContext(AppContext);

  const [user] = useLocalStorage('user');
  const { email: userEmail } = user;

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();

  const fetchSellers = async () => {
    const { data } = await requestGet('/seller');
    setSellerId(data[0].id);
    return setSellers(data);
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  useEffect(() => {
    const length = 5;
    const address = (deliveryAddress.length > length);
    const number = (deliveryNumber.length > 0);
    const typeOfNumber = (/^\d+$/.test(deliveryNumber));
    if (address && number && typeOfNumber) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [deliveryAddress, deliveryNumber]);

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
      setCart([]);
      return navigate(`/customer/orders/${data.saleId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
        disabled={ isDisabled }
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}

export default CheckoutForm;
