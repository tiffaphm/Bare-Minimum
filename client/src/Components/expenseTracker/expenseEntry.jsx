import React from 'react';

const ExpenseEntry = (props) => (
  <div className="tbl-content">
    <table cellPadding="0" cellSpacing="0" border="0">
      <tbody>
        <tr>
          <td>1</td>
          <td>$50</td>
          <td>Food</td>
          <td>Neha, Tiffany</td>
          <td>Neha</td>
        </tr>
      </tbody>
    </table>
  </div>
);

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
