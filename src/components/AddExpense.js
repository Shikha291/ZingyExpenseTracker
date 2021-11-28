import React, { useState } from 'react'
import { useContext } from 'react'
import expenseContext from '../context/expenses/expenseContext'
import { useNavigate } from "react-router";
import alertContext from '../context/alert/alertContext';

const AddExpense = () => {
  const context = useContext(expenseContext);
  const {addExpense} = context;
  const aContext = useContext(alertContext);
  const {showAlert} = aContext;
  const navigate = useNavigate();

  const [expense, setexpense] = useState({title: "", description: "", amount: ""})

  const handleChange = (e) => {
    setexpense({...expense, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(localStorage.getItem('token'))
    {
      addExpense(expense);
    }
    navigate('/expense');
    showAlert({type: "success", msg: "Expense added"})
  }
    return (
        <div  style={{marginTop: "10vmin"}}>
       <h1
        className="formh1"
        style={{ color: "white", fontFamily: "sans-serif", fontWeight: "bold", marginLeft: "100vmin" }}
      >
        Add an expense to your expense list
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Expense title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            style={{
              width: "80vmin",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              fontWeight: "bold",
              fontFamily: "sans-serif"
            }}
            value={expense.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Expense description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            style={{
              width: "80vmin",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              fontWeight: "bold",
              fontFamily: "sans-serif"
            }}
            value={expense.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Expense amount
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            style={{
              width: "80vmin",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              fontWeight: "bold",
              fontFamily: "sans-serif"
            }}
            value={expense.amount}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn formbtn mt-3">
          Add
        </button>
      </form>
    </div>

    )
}

export default AddExpense
