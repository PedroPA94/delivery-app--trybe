import { useEffect, useState } from 'react';

function useLocalStorage(storageName) {
  const setData = (data) => {
    localStorage.setItem(storageName, JSON.stringify(data));
  };

  const getData = () => {
    const data = localStorage.getItem(storageName);
    return JSON.parse(data);
  };

  const [value, setValue] = useState(getData());

  useEffect(() => setValue(getData()), []);

  return [value, setData];
}

export default useLocalStorage;
