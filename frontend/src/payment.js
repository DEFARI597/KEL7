import React, { useState } from "react";
import "./PaymentPage.css";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "no_hp":
        setNo_hp(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, no_hp }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Payment successful");
        navigate("/succespay");
      } else {
        setError("Payment failed");
      }
    } catch (err) {
      setError("An error occurred during payment");
    }
  };

  return (
    <div className="payment-page">
      <div className="navbar">
        <div className="navbar-left">
          <nav>
            <a href="/home" className="nav-link">
              Home
            </a>
            <a href="/movies" className="nav-link">
              Movies
            </a>
            <a href="/cinema" className="nav-link">
              Cinema
            </a>
            <a href="/food" className="nav-link">
              F&B
            </a>
            <a href="/news" className="nav-link">
              News
            </a>
          </nav>
        </div>
        <div className="navbar-right">
          <img src="./img/icon2.png" alt="Cineblue" className="icon2" />
          <input
            type="text"
            placeholder="Search movies or theater.."
            className="search-box1"
          />
          <button
            className="join-btn"
            onClick={() => {
              navigate("/");
            }}
          >
            Join us
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="left-panel1">
          <h2>Contact</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Enter your email *"
              required
            />

            <h2>Billing Details</h2>
            <div className="payment-methods">
              <button type="button" className="card-btn">
                💳
              </button>
              <button type="button" className="bank-btn">
                🏦
              </button>
            </div>

            <input
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
              placeholder="Username *"
              required
              autoComplete="off"
            />

            <input
              type="text"
              name="no_hp"
              value={no_hp}
              onChange={handleInputChange}
              placeholder="Phone number *"
              required
            />

            <button type="submit" className="pay-btn">
              Pay
            </button>
          </form>

          <div className="policy-links">
            <a href="#">Privacy Policy</a> | <a href="#">Term And Conditions</a>
          </div>
        </div>

        <div className="right-panel1">
          <h2>Order Summary</h2>

          <div className="order-item">
            <img src="https://i.imgur.com/BQ3eMXS.png" alt="Jumbo" />
            <div>
              <h3>Jumbo</h3>
              <p>Final Price</p>
              <strong>IDR 35.000</strong>
              <p>1x</p>
            </div>
          </div>

          <div className="order-item">
            <img src="https://i.imgur.com/Xb3N5M0.png" alt="Combo" />
            <div>
              <h3>Salty Combo Cola</h3>
              <p>Final Price</p>
              <strong>IDR 50.000</strong>
              <p>1x</p>
            </div>
          </div>

          <div className="total">
            <h3>Total Due</h3>
            <strong>IDR 85.000</strong>
          </div>
        </div>
      </div>

      <footer>
        <div>
          <h4>CineBlue</h4>
          <a href="#">About cineblue</a>
          <a href="#">Cinema class</a>
          <a href="#">Membership</a>
        </div>
        <div>
          <a href="#">FAQ</a>
          <a href="#">Contact Us</a>
          <a href="#">Advertisement & Partnership</a>
        </div>
        <div className="footer-bottom">
          <span>© CINEBLUE 2022 ALL RIGHTS RESERVED</span>
          <div className="social-icons">🔒 📄 📘 📱</div>
        </div>
      </footer>
    </div>
  );
};

export default PaymentPage;
