import CheckoutForm from '../components/CheckoutForm';
import Navbar from '../components/Navbar';
import OrderTable from '../components/OrderTable';
import { CheckoutContainer, FormContainer } from '../styles/Checkout';

function Checkout() {
  return (
    <div>
      <Navbar />
      <CheckoutContainer>
        <section>
          <h2>Finalizar Pedido</h2>
          <OrderTable page="checkout" />
        </section>
        <FormContainer>
          <h2>Detalhes da Entrega</h2>
          <div>
            <CheckoutForm />
          </div>
        </FormContainer>
      </CheckoutContainer>
    </div>
  );
}

export default Checkout;
