import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import AppContext from './AppContext';
import mock from './mock';

function Provider({ children }) {
  const [cart, setCart] = useState(mock);

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
