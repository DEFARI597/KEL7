import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FoodPage.css";

export default function FoodPage() {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const movieData = localStorage.getItem("selectedMovie");
    if (movieData) {
      setSelectedMovie(JSON.parse(movieData));
    }
  }, []);

  const handleComboSelect = (combo) => {
    setSelectedCombo(combo);
    setShowConfirmModal(true);
  };

  const handleConfirmPurchase = () => {
    const totalAmount =
      (selectedMovie?.price || 0) + (selectedCombo?.price || 0);
    navigate(
      `/payment?type=combo&movieId=${selectedMovie?.id}&comboId=${selectedCombo?.id}&amount=${totalAmount}`
    );
    localStorage.removeItem("selectedMovie"); // Clean up
  };

  const combos = [
    {
      name: "Combo Popcorn",
      price: 40000,
      image: "./img/popcorn.png",
    },
    {
      name: "Salty Combo Cola",
      price: 50000,
      image: "./img/cola-combo.jpg",
    },
  ];

  return (
    <div className="food-page">
      <header className="header">
        <nav className="main-nav">
          <a href="./home" className="nav-link">
            Home
          </a>
          <a href="./movies" className="nav-link">
            Movies
          </a>
          <a href="./cinema" className="nav-link">
            Cinema
          </a>
          <a href="./news" className="nav-link">
            News
          </a>
        </nav>
        <div className="logo">
          <img src="./img/icon2.png" alt="Cine Blue" />
        </div>
        <div className="header-right">
          <div className="location-wrapper">
            <span className="location-icon">📍</span>
            <span className="location-text">Bandung</span>
          </div>
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search movies or theater.."
              className="search-input"
            />
          </div>
          <button
            className="join-button"
            onClick={() => {
              navigate("/");
            }}
          >
            Join us
          </button>
        </div>
      </header>
      {/* Hero */}
      <section className="hero-section">
        <img
          src="./img/bioskop3.jpg"
          alt="Cinema Screen"
          className="hero-image"
        />
        <div className="hero-text">
          Selamat Datang
          <br />
          Di Cineblue Cinemas
        </div>
      </section>
      {/* F&B Menu Section */}
      <section className="fnb-section">
        <h1 className="section-title">Exclusive Combo</h1>
        {selectedMovie && (
          <div className="selected-movie-banner">
            Selected Movie: {selectedMovie.title} - Rp{" "}
            {selectedMovie.price.toLocaleString()}
          </div>
        )}
        <div className="combo-container">
          {combos.map((combo, index) => (
            <div key={index} className="combo-card">
              <img src={combo.image} alt={combo.name} className="combo-image" />
              <div className="combo-info">
                <h3>{combo.name}</h3>
                <p className="price">Rp {combo.price.toLocaleString()}</p>
                <button
                  className="add-button"
                  onClick={() => handleComboSelect(combo)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Purchase</h2>
            <div className="purchase-summary">
              {selectedMovie && (
                <div className="movie-summary">
                  <p>Movie: {selectedMovie.title}</p>
                  <p>Ticket: Rp {selectedMovie.price.toLocaleString()}</p>
                </div>
              )}
              <div className="combo-summary">
                <p>Combo: {selectedCombo.name}</p>
                <p>Food: Rp {selectedCombo.price.toLocaleString()}</p>
              </div>
              <div className="total">
                <p>
                  Total: Rp{" "}
                  {(
                    selectedMovie?.price + selectedCombo.price
                  ).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowConfirmModal(false)}>Cancel</button>
              <button onClick={handleConfirmPurchase}>
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="footer">
        <div>
          <h3 className="footer-title">CineBlue</h3>
          <p className="footer-text">© CINEBLUE 2022. ALL RIGHTS RESERVED</p>
        </div>
        <div className="footer-links">
          <a href="#">About cineblue</a>
          <a href="#">Cinema class</a>
          <a href="#">Membership</a>
        </div>
        <div className="footer-links">
          <a href="#">FAQ</a>
          <a href="#">Contact Us</a>
          <a href="#">Advertisement & Partnership</a>
        </div>
      </footer>
         
    </div>
  );
}
