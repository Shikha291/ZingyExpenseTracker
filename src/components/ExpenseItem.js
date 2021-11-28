import React, { useContext } from "react";
import alertContext from "../context/alert/alertContext";
import expenseContext from "../context/expenses/expenseContext";

const ExpenseItem = (props) => {
  const context = useContext(expenseContext);
  const aContext = useContext(alertContext);
  const {showAlert} = aContext;
  const {deleteExpense} = context;
  const { expense, editExpense } = props;

  const handleDelete = (id) => {
    deleteExpense(id);
    showAlert({type: "success", msg: "Expense deleted"})
  }
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            <div className="d-flex justify-content-between">
              <div>{expense.title}</div>
              <div>{expense.amount}</div>
            </div>
          </h5>
          {expense.description && (
            <p className="card-text">{expense.description}</p>
          )}
          <i className="far fa-trash-alt mx-2" onClick={() => {handleDelete(expense._id)}}></i>
          <i className="far fa-edit mx-2" onClick={() => {editExpense(expense)}}></i>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
