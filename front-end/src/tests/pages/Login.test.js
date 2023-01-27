import Provider from '../../AppContext/Provider';
import Login from '../../pages/Login';
import renderWithRouterAndContext from '../utils/renderWithRouterAndContext';

describe('Login page', () => {
  it('should have a login form with input elements', () => {
    const loginPage = renderWithRouterAndContext(<Login />, Provider, ['/login']);
  });
});
