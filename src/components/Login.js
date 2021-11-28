import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import alertContext from "../context/alert/alertContext";
const Login = () => {
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const aContext = useContext(alertContext);
  const { showAlert } = aContext;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (!json.success) {
      showAlert({ type: "danger", msg: json.error });
    } else {
      setcredentials({ email: "", password: "" });

      localStorage.setItem("token", json.authtoken);
      navigate("/expense");
      showAlert({ type: "success", msg: "Logged in" });
    }
  };

  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ marginTop: "10vmin" }}>
      <h1
        className="formh1"
        style={{
          color: "white",
          fontFamily: "sans-serif",
          fontWeight: "bold",
          marginLeft: "100vmin",
        }}
      >
        Enter your details
      </h1>
      <form
        className="my-3"
        style={{ fontSize: "3vmin", fontFamily: "sans-serif" }}
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            style={{
              width: "80vmin",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            style={{
              width: "80vmin",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn formbtn mt-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
