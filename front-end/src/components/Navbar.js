import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleExit = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <div
        data-testid="customer_products__element-navbar-link-products"
      >
        <button
          type="button"
          onClick={ () => navigate('/products') }
        >
          Produtos
        </button>

      </div>

      <div
        data-testid="customer_products__element-navbar-link-orders"
      >
        <button
          type="button"
          onClick={ () => navigate('/pedidos') }
        >
          Pedidos
        </button>
      </div>

      <div
        data-testid="customer_products__element-navbar-user-full-name"
      >
        <h1>
          User
        </h1>

      </div>

      <div
        data-testid="customer_products__element-navbar-link-logout"

      >
        <button
          type="button"
          onClick={ () => handleExit() }
        >
          Sair
        </button>

      </div>

    </div>
  );
}
export default Navbar;
