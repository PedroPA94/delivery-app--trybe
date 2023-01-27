import { render } from '@testing-library/react';
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

export default renderWithRouterAndContext;
