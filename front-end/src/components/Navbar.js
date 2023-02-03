import { IoBeerOutline, IoLogOutOutline, IoReceiptOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { Header, MenuButton, MenuButtonContainer } from '../styles/Navbar';

function Navbar() {
  const [user] = useLocalStorage('user');

  const navigate = useNavigate();

  const handleExit = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Header>
      { user && (
        <>
          <p data-testid="customer_products__element-navbar-user-full-name">
            {user.name}
          </p>
          <MenuButtonContainer>
            {user.role === 'customer'
              && (
                <MenuButton
                  data-testid="customer_products__element-navbar-link-products"
                  type="button"
                  onClick={ () => navigate('/customer/products') }
                >
                  <IoBeerOutline />
                </MenuButton>
              )}
            { user.role !== 'administrator'
              && (
                <MenuButton
                  data-testid="customer_products__element-navbar-link-orders"
                  type="button"
                  onClick={ () => navigate(`/${user.role}/orders`) }
                >
                  <IoReceiptOutline />
                </MenuButton>
              )}
            <MenuButton
              type="button"
              data-testid="customer_products__element-navbar-link-logout"
              onClick={ () => handleExit() }
            >
              <IoLogOutOutline />
            </MenuButton>
          </MenuButtonContainer>
        </>)}
    </Header>
  );
}
export default Navbar;
