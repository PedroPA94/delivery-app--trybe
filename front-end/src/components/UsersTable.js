import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import { requestDelete, requestGet, setToken } from '../services/request';
import GenericTable from './GenericTable';
import Loading from './Loading';

function UsersTable({ shouldFetchUsers, setShouldFetchUsers }) {
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [adminData] = useLocalStorage('user');

  const getUsers = async () => {
    setIsFetching(true);
    try {
      const { data: usersInDB } = await requestGet('/admin');
      setUsers(usersInDB);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (shouldFetchUsers) {
      getUsers();
      setToken(adminData.token);
      setShouldFetchUsers(false);
    }
  }, [shouldFetchUsers]);

  const handleRemoveUser = async (user) => {
    await requestDelete(`/admin/${user.id}`);
    await getUsers();
  };

  if (isFetching) return <Loading />;

  return (
    <>
      <h2>Lista de usuários</h2>
      <GenericTable
        data={ users }
        userType="admin"
        page="manage"
        handleRemove={ handleRemoveUser }
      />
    </>
  );
}

UsersTable.propTypes = {
  shouldFetchUsers: PropTypes.bool.isRequired,
  setShouldFetchUsers: PropTypes.func.isRequired,
};

export default UsersTable;
