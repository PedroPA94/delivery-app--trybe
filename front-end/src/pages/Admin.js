import { useState } from 'react';
import Navbar from '../components/Navbar';
import NewUserForm from '../components/NewUserForm';
import UsersTable from '../components/UsersTable';
import { AdmContainer } from '../styles/AdmStyles';

function Admin() {
  const [shouldFetchUsers, setShouldFetchUsers] = useState(true);

  return (
    <AdmContainer>
      <Navbar />
      <NewUserForm setShouldFetchUsers={ setShouldFetchUsers } />
      <UsersTable
        shouldFetchUsers={ shouldFetchUsers }
        setShouldFetchUsers={ setShouldFetchUsers }
      />
    </AdmContainer>
  );
}

export default Admin;
