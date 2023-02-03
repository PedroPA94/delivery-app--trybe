import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { requestGet, requestPost } from '../services/request';
import { Form, InputForm, SelectForm, SendOrderButton } from '../styles/CheckoutForm';
import Loading from './Loading';

function CheckoutForm() {
  const { cart, setCart, getTotalValue } = useContext(AppContext);

  const [user] = useLocalStorage('user');
  const { email: userEmail } = user;

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSellerSelected, setIsSellerSelected] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const navigate = useNavigate();

  const fetchSellers = async () => {
    const { data } = await requestGet('/seller');
    setSellers(data);
    setIsFetching();
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  useEffect(() => {
    const length = 5;
    const address = (deliveryAddress.length > length);
    const number = (deliveryNumber.length > 0);
    const seller = (sellerId !== 0);
    const typeOfNumber = (/^\d+$/.test(deliveryNumber));
    if (address && number && typeOfNumber && seller) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [deliveryAddress, deliveryNumber, sellerId]);

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
    isFetching
      ? <Loading />
      : (
        <Form>
          <SelectForm
            type="text"
            id="select-seller"
            data-testid="customer_checkout__select-seller"
            onChange={ ({ target }) => {
              setSellerId(target.value);
              setIsSellerSelected(true);
            } }
            required
          >
            <option value="" disabled={ isSellerSelected }>
              Pessoa Vendedora Responsável
            </option>
            {(sellers.length > 0) && sellers.map((item) => (
              <option key={ item.id } value={ item.id }>{item.name}</option>
            ))}
          </SelectForm>
          <InputForm
            type="text"
            id="address"
            data-testid="customer_checkout__input-address"
            value={ deliveryAddress }
            onChange={ ({ target }) => setDeliveryAddress(target.value) }
            placeholder="Endereço"
            required
          />
          <InputForm
            type="text"
            id="address-number"
            data-testid="customer_checkout__input-address-number"
            value={ deliveryNumber }
            onChange={ ({ target }) => setDeliveryNumber(target.value) }
            placeholder="Número"
            required
          />
          <SendOrderButton
            type="submit"
            data-testid="customer_checkout__button-submit-order"
            onClick={ (event) => handleSubmitButton(event) }
            disabled={ isDisabled }
          >
            Finalizar Pedido
          </SendOrderButton>
        </Form>
      )
  );
}

export default CheckoutForm;
