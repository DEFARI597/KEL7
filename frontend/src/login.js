import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/login/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store the token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to dashboard or home page
        navigate("/home"); // Make sure to create this route
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <img src="./img/cineblue.png" alt="" className="icon" />
      </div>
      <div className="background-image">
        <img src="./img/background.jpg" alt="" className="background" />
      </div>
      <div className="right-panel">
        <h2>Hello, Welcome!</h2>
        <p>Sign In to your account</p>
        <br />
        <form onSubmit={handleSubmit}>
          <p className="text">Email</p>
          <input
            className="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <br />
          <div className="password-field">
            <p className="text">Password</p>
            <input
              className="password"
              type={showPassword ? "text" : "password"}
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
          <Link to={"./forgotpw"} className="forgot">
            Forgot Password?
          </Link>
          <br />
          <button
            type="submit"
            onClick={() => {
              navigate("/home");
            }}
          >
            Sign In
          </button>
          <p className="signup-text">
            Don't Have Account?{" "}
            <Link to={"./register"} className="SignUpPage">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
