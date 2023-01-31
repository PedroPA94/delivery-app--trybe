import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, createMemoryRouter } from 'react-router-dom';
import Provider from '../../AppContext/Provider';

const renderWithRouterAndContext = (component, AppProvider, historyEntries = ['/']) => {
  const history = createMemoryRouter(historyEntries);

  return ({
    ...render(
      <Provider value={ AppProvider }>
        <MemoryRouter initialEntries={ historyEntries }>
          {component}
        </MemoryRouter>
      </Provider>,
    ),
    history,
  });
};

export default renderWithRouterAndContext;
