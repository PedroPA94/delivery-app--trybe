import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { requestGet } from '../services/request';

function Products() {
  // buscar produtos no back
  // renderizar produtos
  // renderizar valor carrinho

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const productsFromDB = await requestGet('/products');
      setProducts(productsFromDB.data);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        { products.map((product) => (
          <ProductCard product={ product } key={ product.id } />
        ))}
      </div>
    </div>
  );
}

export default Products;
