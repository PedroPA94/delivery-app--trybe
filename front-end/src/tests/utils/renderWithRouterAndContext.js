import { render } from '@testing-library/react';
<<<<<<< HEAD
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import Provider from '../../AppContext/Provider';

const renderWithRouterAndContext = (component, AppProvider, historyEntries = ['/']) => {
  const history = createMemoryHistory({ initialEntries: historyEntries });
  return {
    ...render(
      <Provider value={ AppProvider }>
        <Router history={ history }>
          {component}
        </Router>
      </Provider>,
    ),
    history,
  };
};
=======
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Provider from '../../AppContext/Provider';

const renderWithRouterAndContext = (component, AppProvider, historyEntries = ['/']) => ({
  ...render(
    <Provider value={ AppProvider }>
      <MemoryRouter initialEntries={ historyEntries }>
        {component}
      </MemoryRouter>
    </Provider>,
  ),
});
>>>>>>> 7d036658d2f48f2d4e5fbacb4a7f0e3402add467

export default renderWithRouterAndContext;
