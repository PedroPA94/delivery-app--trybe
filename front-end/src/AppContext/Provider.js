import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [cart, setCart] = useState([]);

  const changeQuantity = (product) => {
    if (product.quantity === 0) {
      const updatedCart = cart.filter((prod) => prod.id !== product.id);
      setCart(updatedCart);
      return;
    }
    const productInCart = cart.some(({ id }) => id === product.id);
    if (productInCart) {
      const updatedCart = cart.map((prod) => {
        if (prod.id === product.id) {
          prod.quantity = product.quantity;
        }
        return prod;
      });
      setCart(updatedCart);
    } else {
      setCart(cart.concat(product));
    }
    console.log(cart);
  };

  const getTotalValue = () => {
    const totalValue = cart.reduce((acc, cur) => {
      const productPrice = Number(cur.price);
      const value = cur.quantity * productPrice;
      return acc + value;
    }, 0);
    return totalValue;
  };

  const providerValue = useMemo(() => ({
    cart,
    changeQuantity,
    getTotalValue,
  }), [cart]);

  return (
    <AppContext.Provider value={ providerValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
