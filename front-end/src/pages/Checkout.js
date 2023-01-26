import CheckoutForm from '../components/CheckoutForm';
import Navbar from '../components/Navbar';
import OrderTable from '../components/OrderTable';

function Checkout() {
  return (
    <>
      <Navbar />
      <main>
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
      </main>
    </>
  );
}

export default Checkout;
