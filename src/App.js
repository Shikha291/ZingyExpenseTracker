import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AlertState from "./context/alert/AlertState";
import ExpenseState from "./context/expenses/ExpenseState";

function App() {
  return (
    <ExpenseState>
      <AlertState>
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/expense" element={<ExpenseList />} />
              <Route path="/addExpense" element={<AddExpense />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AlertState>
    </ExpenseState>
  );
}

export default App;
