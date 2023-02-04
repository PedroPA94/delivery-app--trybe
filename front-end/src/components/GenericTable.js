import { IoTrashSharp } from 'react-icons/io5';
import PropTypes from 'prop-types';
import { Table } from '../styles/OderTable';

function GenericTable({ data, userType, page, handleRemove }) {
  const category = userType === 'admin' ? 'user' : 'order';

  return (
    <Table>
      <tbody>
        { data.map((item, index) => (
          <tr key={ item.id }>
            <td
              data-testid={
                `${userType}_${page}__element-${category}-table-item-number-${index}`
              }
            >
              {(index + 1)}
            </td>
            <td>
              <p
                data-testid={
                  `${userType}_${page}__element-${category}-table-name-${index}`
                }
              >
                {item.name}
              </p>
              { userType === 'admin'
                ? (
                  <p
                    data-testid={ `admin_manage__element-user-table-email-${index}` }
                  >
                    {item.email}
                  </p>
                )
                : (
                  <p
                    data-testid={
                      `${userType}_${page}__element-${category}-table-unit-price-${index}`
                    }
                  >
                    {item.price.replace('.', ',')}
                  </p>
                )}
            </td>
            { userType === 'admin'
              ? (
                <td
                  data-testid={ `admin_manage__element-user-table-role-${index}` }
                >
                  {item.role}
                </td>
              )
              : (
                <>
                  <td
                    data-testid={
                      `${userType}_${page}__element-${category}-table-quantity-${index}`
                    }
                  >
                    x
                    {item.quantity}
                  </td>
                  <td
                    data-testid={
                      `${userType}_${page}__element-${category}-table-sub-total-${index}`
                    }
                  >
                    R$
                    {' '}
                    {(item.quantity * item.price)
                      .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </>
              )}
            {(page !== 'order_details') && (
              <td>
                <button
                  data-testid={
                    `${userType}_${page}__element-${category}-table-remove-${index}`
                  }
                  type="button"
                  onClick={ () => handleRemove(item) }
                >
                  <IoTrashSharp />
                </button>
              </td>
            )}
          </tr>))}
      </tbody>
    </Table>
  );
}

GenericTable.propTypes = {
  data: PropTypes.arrayOf.isRequired,
  userType: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default GenericTable;
