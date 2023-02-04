import { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { requestDelete, requestGet, setToken } from '../services/request';
import GenericTable from './GenericTable';
import Loading from './Loading';

function UsersTable() {
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
    getUsers();
    setToken(adminData.token);
  }, []);

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

export default UsersTable;
