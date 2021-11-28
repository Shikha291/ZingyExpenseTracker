import React, { useContext, useEffect, useRef, useState } from "react";
import expenseContext from "../context/expenses/expenseContext";
import ExpenseItem from "./ExpenseItem";
import { Link } from "react-router-dom";
import alertContext from "../context/alert/alertContext";
import { useNavigate } from "react-router";

const ExpenseList = () => {
  console.log(localStorage.getItem("token"));
  const context = useContext(expenseContext);
  const { expenses, getExpense, updateExpense } = context;
  const aContext = useContext(alertContext);
  const { showAlert } = aContext;
  const navigate = useNavigate();
  let totalExpense = 0;

  useEffect(() => {
    if (localStorage.getItem("token")) getExpense();
    else {
      navigate("/");
      showAlert({ type: "danger", msg: "Kindly login or signup" });
    }
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    showAlert({ type: "success", msg: "Logged out" });
  };

  const ref = useRef(null);
  const closeref = useRef(null);
  const [expense, setexpense] = useState({
    id: "",
    title: "",
    description: "",
    amount: "",
  });

  const editExpense = (currentExpense) => {
    ref.current.click();
    setexpense({
      id: currentExpense._id,
      title: currentExpense.title,
      description: currentExpense.description,
      amount: currentExpense.amount,
    });
  };

  const handleChange = (e) => {
    setexpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateExpense(
      expense.id,
      expense.title,
      expense.description,
      expense.amount
    );
    closeref.current.click();
    showAlert({ type: "success", msg: "Expense updated" });
  };

  return (
    <>
      <div style={{ marginTop: "12vmin" }}>
        <h1
          className="eh1"
          style={{
            color: "white",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            marginLeft: "100vmin",
          }}
        >
          Your expenses
        </h1>
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="exampleModalLabel"
                  style={{ fontWeight: "bold", fontSize: "4vmin" }}
                >
                  Edit Expense
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form
                  style={{ marginLeft: 0, color: "black" }}
                  onSubmit={handleSubmit}
                >
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Expense title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
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
                      value={expense.amount}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      ref={closeref}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Edit expense
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {expenses.length === 0 && (
          <div className="card">
            <div className="card-body">
              <h5
                className="card-title"
                style={{ fontWeight: "bold", fontSize: "4vmin" }}
              >
                No expense to display
              </h5>
            </div>
          </div>
        )}
        {expenses.map((expense) => {
          totalExpense += expense.amount;
          return (
            <ExpenseItem
              key={expense._id}
              expense={expense}
              editExpense={editExpense}
            />
          );
        })}
        <div className="card">
          <div className="card-body">
            <h5
              className="card-title"
              style={{ fontWeight: "bold", fontSize: "4vmin" }}
            >
              <div className="d-flex justify-content-between">
                <div>Total Expense:</div>
                <div>{totalExpense}</div>
              </div>
            </h5>
          </div>
        </div>
        <div className="ebtns">
          <Link className="btn formbtn my-3" to="/addExpense">
            Add new Expense
          </Link>
          <Link
            className="btn formbtn my-3"
            to="/"
            onClick={handleLogout}
            id="logout"
          >
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default ExpenseList;
