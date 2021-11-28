import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import alertContext from "../context/alert/alertContext";

const Home = () => {
  const [login, setlogin] = useState(true);
  const aContext = useContext(alertContext);
  const {showAlert} = aContext;
  const handleLogout = () => {
    localStorage.removeItem("token");
    setlogin(false);
    showAlert({type: "success", msg: "Logged out"})
  };
  return (
    <div>
      <h1 className="main-heading">Welcome to Zingy Expense Tracker</h1>
      <hr
        style={{
          width: "100vmin",
          color: "white",
          height: "1vmin",
          marginLeft: "90vmin",
        }}
      />
      <h2 className="mb-4" style={{ color: "white" }}>
        All your expenses stored at one place
      </h2>
      {!localStorage.getItem("token") ? (
        <div className="btns">
          <Link className="btn" to="/signup" role="button" id="signup">
            Signup
          </Link>
          <Link className="btn" to="/login" role="button" id="login">
            Login
          </Link>
        </div>
      ) : (
        <div className="btns" style={{marginLeft: "105vmin"}}>
          <Link className="btn" to="/expense" role="button" id="expense">
            Your expenses
          </Link>
          <Link
            className="btn"
            to="/"
            role="button"
            id="logout"
            onClick={handleLogout}
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
