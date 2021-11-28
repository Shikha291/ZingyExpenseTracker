import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import alertContext from "../context/alert/alertContext";

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const aContext = useContext(alertContext);
  const { showAlert } = aContext;

  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      showAlert({ type: "danger", msg: json.error });
    } else {
      localStorage.setItem("token", json.authtoken);
      setcredentials({ name: "", email: "", password: "" });
      navigate("/expense");
      showAlert({ type: "success", msg: "Signed up" });
    }
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
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            style={{
              width: "80vmin",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
            required
            minLength={3}
          />
        </div>
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
            onChange={handleChange}
            style={{
              width: "80vmin",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
            required
            minLength={3}
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
            onChange={handleChange}
            style={{
              width: "80vmin",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
            required
            minLength={5}
          />
        </div>
        <button type="submit" className="btn formbtn mt-3">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
