import React from 'react';

const ExpenseEntry = (props) => {
  return (
    <tr>
      <th scope="row">{props.row}</th>
      <td>${props.expense.amount}</td>
      <td>{props.expense.description}</td>
      <td>{props.payer}</td>
    </tr>  
  );
};

export default ExpenseEntry;