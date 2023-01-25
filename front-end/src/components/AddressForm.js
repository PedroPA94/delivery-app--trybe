import { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext/AppContext';
import { requestSimpleGet } from '../services/request';

function AddressForm() {
  const { cart } = useContext(AppContext);

  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(0);
  const [orderNumber, setOrderNumber] = useState('');

  const fetchSellers = async () => {
    const { data } = await requestSimpleGet('/seller');
    setSelectedSeller(data[0].id);
    return setSellers(data);
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleSubmitButton = async (event) => {
    event.preventDefault();

    try {
      const { data } = await requestPost(
        '/order',
        { cart, selectedSeller, address, addressNumber },
      );
      setOrderNumber(data.id);
      return navigate(`/customer/orders/${orderNumber}`);
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
          onChange={ ({ target }) => setSelectedSeller(target.value) }
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
          value={ address }
          onChange={ ({ target }) => setAddress(target.value) }
          required
        />
      </label>
      <label htmlFor="address-number">
        Número
        <input
          type="text"
          id="address-number"
          data-testid="customer_checkout__input-address-number"
          value={ addressNumber }
          onChange={ ({ target }) => setAddressNumber(target.value) }
          required
        />
      </label>
      <button type="submit" onClick={ (event) => handleSubmitButton(event) }>
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}

export default AddressForm;
