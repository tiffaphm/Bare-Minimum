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


// responstable {
//     margin: 1em 0;
//     width: 100%;
//     overflow: hidden;
//     background: #FFF;
//     color: #024457;
//     border-radius: 10px;
//     border: 1px solid #167F92;
// }

// <div class="tbl-content">
//   <table cellpadding="0" cellspacing="0" border="0">
//     <tbody>
//       <tr>
//         <td>1</td>
//         <td>$50</td>
//         <td>Food</td>
//         <td>Neha, Tiffany</td>
//         <td>Neha</td>
//       </tr>
//     </tbody>
//   </table>
// </div>

// <div className="ExpenseEntry">{props.expense.description} - ${props.expense.amount}, paid for by {props.payer}</div>
