import Navbar from '../components/Navbar';
import NewUserForm from '../components/NewUserForm';
import UsersTable from '../components/UsersTable';
import { AdmContainer } from '../styles/AdmStyles';

function Admin() {
  return (
    <AdmContainer>
      <Navbar />
      <NewUserForm />
      <UsersTable />
    </AdmContainer>
  );
}

export default Admin;
