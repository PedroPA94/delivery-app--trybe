// import PropTypes from 'prop-types';
// import { useContext, useEffect, useState } from 'react';
// import AppContext from '../AppContext/AppContext';
// import useLocalStorage from '../hooks/useLocalStorage';
// import { requestGet, requestPut } from '../services/request';

// function StatusSales({ saleId, status }) {
//   const [user] = useLocalStorage('user');
//   const [isCustomer, setIsCustomer] = useState(false);
//   const { setOrder, order } = useContext(AppContext);

//   const getOrders = async () => {
//     const { data } = await requestGet(`/sale/${id}`);
//     const result = data.map((item) => ({
//       ...item.product, ...item.sale, ...item,
//     }));
//     setOrder(result);
//   };

//   useEffect(() => {
//     getOrders();
//   }, [order]);

//   useEffect(() => {
//     const checkRole = (data) => data.role === 'customer';
//     setIsCustomer(checkRole(user));
//   }, [user]);

//   const updateStatus = async (newStatus) => {
//     await requestPut('/sale/orders', { saleId, status: newStatus });
//     getOrders();
//     window.location.reload();
//   };

//   return (

//   );
// }

// StatusSales.propTypes = {
//   saleId: PropTypes.number.isRequired,
//   status: PropTypes.string.isRequired,
// };

// export default StatusSales;
