import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Provider from '../../AppContext/Provider';

const renderWithRouterAndContext = (component, AppProvider, historyEntries = ['/']) => {
  const navigate = useNavigate;
  return (
    { ...render(
      <Provider value={ AppProvider }>
        <MemoryRouter initialEntries={ historyEntries }>
          {component}
        </MemoryRouter>
      </Provider>,
    ),
    navigate,
    });
};

export default renderWithRouterAndContext;
