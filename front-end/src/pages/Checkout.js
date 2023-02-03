import CheckoutForm from '../components/CheckoutForm';
import Navbar from '../components/Navbar';
import OrderTable from '../components/OrderTable';
import { CheckoutContainer } from '../styles/Checkout';

function Checkout() {
  return (
    <div>
      <Navbar />
      <CheckoutContainer>
        <section>
          <h2>Finalizar Pedido</h2>
          <OrderTable page="checkout" />
        </section>
        <section>
          <h2>Detalhes e Endereço para Entrega</h2>
          <div>
            <CheckoutForm />
          </div>
        </section>
      </CheckoutContainer>
    </div>
  );
}

export default Checkout;
