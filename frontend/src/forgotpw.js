import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ...existing code...

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields!");
      return; // Add return to prevent further execution
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return; // Add return to prevent further execution
    }

    const resetData = {
      email: email,
      password: password, // Changed from newPassword to match backend expectations
    };

    // Changed method to PUT and updated endpoint
    fetch("http://localhost:5000/login/reset-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Password reset successfully!");
        } else {
          alert("Error resetting password: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while resetting the password.");
      });
  };
  // Lakukan proses reset password di sini

  return (
    <div className="forgot-container">
      <div className="forgot-panel">
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <p className="text">Email</p>
          <input
            type="email"
            className="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <p className="text">New Password</p>
          <div className="password-field">
            <input
              type={showNewPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? "🙈" : "👁"}
            </span>
          </div>
          <p className="text">Confirm Password</p>
          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "🙈" : "👁"}
            </span>
          </div>

          <button type="submit">Reset</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
