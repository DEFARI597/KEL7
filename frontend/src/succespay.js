import React from "react";
import "./SuccesPage.css";

function PaymentSuccess() {
  return (
    <div className="payment-success-page">
      <div className="navbar">
        <div className="navbar-left">
          <button className="language-btn">🌐 Language</button>
          <nav>
            <a href="#">Home</a>
            <a href="#">Movies</a>
            <a href="#">Cinema</a>
            <a href="#">F&B</a>
            <a href="#">News</a>
          </nav>
        </div>
        <div className="navbar-right">
          <span>📍 Bandung</span>
          <input type="text" placeholder="Search movies or theater.." />
          <button className="join-btn">Join us</button>
        </div>
      </div>

      <div className="main-content">
        <div className="left">
          <h1>Jumbo</h1>
          <hr />
          <p>
            <strong>Payment Code</strong>
            <br />
            JEST080125001 <button>📋</button>
          </p>
          <p>
            <strong>Code Movies</strong>
            <br />
            JEMV71798050
          </p>
          <p>
            <strong>Amount to Pay</strong>
            <br />
            IDR 35.000
          </p>
          <div className="barcode">
            <p>Scan/Show to cashier</p>
            <img
              src="https://barcode.tec-it.com/barcode.ashx?data=JEST080125001&code=Code128&dpi=96"
              alt="Barcode"
            />
            <p className="barcode-text">JEST080125001</p>
          </div>
        </div>

        <div className="right">
          <h2>Order Summary</h2>
          <p>Invoice: Checkout CineBlue - 171239867651</p>
          <div className="order-info">
            <p>
              <strong>📝 Description</strong>
              <br />
              Checkout CineBlue - Movies Jumbo
            </p>
            <p>
              <strong>🕒 Pay</strong>
              <br />
              January 01 2025, 08.50 AM
            </p>
          </div>
          <div className="summary-item">
            <p>
              Jumbo <span>IDR 35.000</span>
            </p>
            <p>1 × IDR 35.000</p>
          </div>
          <div className="summary-item">
            <p>
              Salty Combo Cola <span>IDR 50.000</span>
            </p>
            <p>1 × IDR 50.000</p>
          </div>
          <hr />
          <div className="total">
            <p>
              Subtotal <span>IDR 85.000</span>
            </p>
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
          <div className="social-icons">📄 🔒 📘 📱</div>
        </div>
      </footer>
    </div>
  );
}

export default PaymentSuccess;
