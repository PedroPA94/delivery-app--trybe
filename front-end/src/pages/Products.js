import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import useLocalStorage from '../hooks/useLocalStorage';
import { requestGet, setToken } from '../services/request';
import { ProductsContainer } from '../styles/Products';

function Products() {
  const [products, setProducts] = useState([]);
  const { getTotalValue } = useContext(AppContext);
  const navigate = useNavigate();
  const [user] = useLocalStorage('user');

  useEffect(() => {
    async function fetchProducts() {
      try {
        setToken(user.token);
        const productsFromDB = await requestGet('/products');
        setProducts(productsFromDB.data);
      } catch (error) {
        console.log(error);
        localStorage.clear();
        navigate('/login');
      }
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <ProductsContainer>
        { products.map((product) => (
          <ProductCard product={ product } key={ product.id } />
        ))}
      </ProductsContainer>
      <button
        data-testid="customer_products__button-cart"
        type="button"
        onClick={ () => navigate('/customer/checkout') }
        disabled={ getTotalValue() === 0 }
      >
        Ver carrinho: R$
        {' '}
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { getTotalValue().toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }

        </span>
      </button>
    </div>
  );
}

export default Products;
