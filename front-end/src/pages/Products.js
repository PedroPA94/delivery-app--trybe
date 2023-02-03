import { useContext, useEffect, useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import useLocalStorage from '../hooks/useLocalStorage';
import { requestGet, setToken } from '../services/request';
import { ProductsContainer, Cart } from '../styles/Products';

function Products() {
  const [products, setProducts] = useState([]);
  const { getTotalValue } = useContext(AppContext);
  const navigate = useNavigate();
  const [user] = useLocalStorage('user');
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setToken(user.token);
        const productsFromDB = await requestGet('/products');
        setProducts(productsFromDB.data);
        setIsFetching(false);
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
      { isFetching
        ? <Loading />
        : (
          <>
            <ProductsContainer>
              { products.map((product) => (
                <ProductCard product={ product } key={ product.id } />
              ))}
            </ProductsContainer>
            <Cart
              data-testid="customer_products__button-cart"
              type="button"
              onClick={ () => navigate('/customer/checkout') }
              disabled={ getTotalValue() === 0 }
            >
              <IoCartOutline />
            </Cart>
          </>
        )}
    </div>
  );
}

export default Products;
