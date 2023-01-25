import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { requestGet } from '../services/request';

function Products() {
  // buscar produtos no back
  // renderizar produtos
  // renderizar valor carrinho

  const [products, setProducts] = useState();

  useEffect(() => {
    async function fetchProducts() {
      const productsFromDB = await requestGet('/products');
      setProducts(productsFromDB);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      { products.map((product) => (
        <ProductCard product={ product } key={ product.id } />
      ))}
    </div>
  );
}

export default Products;
