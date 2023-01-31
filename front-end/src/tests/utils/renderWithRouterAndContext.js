import { render } from '@testing-library/react';
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

export default renderWithRouterAndContext;
