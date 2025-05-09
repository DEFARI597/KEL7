import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [username, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const userData = {
      username: username,
      email: email,
      password: password,
    };

    //Send POST request to the backend
    fetch("http://localhost:5000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response from the server
        // Handle success or error messages here
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="signup-container">
      <div className="left-panel">
        <img src="/img/cineblue.png" alt="Movie Icon" className="icon" />
      </div>
      <div className="right-panel">
        <h1>Create Account</h1>
        <p>Create your account now</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>
          <button
            type="submit"
            onClick={() => {
              <Link to={"/"} className="LoginPage" />;
              alert("Account Created Successfully!");
            }}
          >
            Sign Up
          </button>
          <p className="signin-text">
            Already Have An Account?{" "}
            <Link to={"/"} className="LoginPage">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
