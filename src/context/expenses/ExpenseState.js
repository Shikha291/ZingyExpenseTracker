import expenseContext from "./expenseContext";
import { useState } from "react";

const ExpenseState = (props) => {
    const inittialExpense = [];
    const [expenses, setexpenses] = useState(inittialExpense);
    //1. add new expense
    const addExpense = async (expense) => {
        const response = await fetch('http://localhost:5000/api/expenses/addexpense', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }, 
            body: JSON.stringify({
                title: expense.title,
                description: expense.description,
                amount: expense.amount
            })
        })
        const json = response.json();
        setexpenses(expenses.concat(json));
    }
    //2. fetch expenses
    const getExpense = async () => {
        const response = await fetch('http://localhost:5000/api/expenses/fetchexpense', {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setexpenses(json);
        console.log(expenses);
    }
    //3. update expense
    const updateExpense = async (id, title, description, amount) => {
        const response = await fetch(`http://localhost:5000/api/expenses/updateexpense/${id}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({
                title, 
                description,
                amount
            })
        })
        const json = await response.json();
        console.log(json);
        let newExpenses = JSON.parse(JSON.stringify(expenses));
        for(let i=0; i<expenses.length; i++) {
            if(newExpenses[i]._id === id) {
                newExpenses[i].title = title;
                newExpenses[i].description = description;
                newExpenses[i].amount = amount;
            }
        }
        setexpenses(newExpenses);
    }
    //4. delete expense
    const deleteExpense = async (id) => {
        const response = await fetch(`http://localhost:5000/api/expenses/deleteexpense/${id}`,{
            method: "DELETE",
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        console.log(json);
        const newExpenses = expenses.filter((expense) => {return expense._id !== id});
        setexpenses(newExpenses);
    }
    return(
        <expenseContext.Provider value={{expenses, getExpense, addExpense, deleteExpense, updateExpense}}>
            {props.children}
        </expenseContext.Provider>
    )
}

export default ExpenseState;