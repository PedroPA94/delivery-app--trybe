import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [cart, setCart] = useState([]);

  const providerValue = useMemo(() => ({
    cart,
    setCart,
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
