import React from "react";
import "./CinemaPage.css";

export default function CinemaPage() {
  return (
    <div className="cinema-page">
      <header className="header">
        <nav className="main-nav">
          <a href="./home" className="nav-link">
            Home
          </a>
          <a href="./movies" className="nav-link">
            Movies
          </a>
          <a href="./food" className="nav-link">
            F&B
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
          <button className="join-button">Join us</button>
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

        {/* Search box */}
        <div className="search-box2">
          <select className="dropdown">
            <option>Bandung</option>
          </select>
          <select className="dropdown">
            <option>All screen class</option>
          </select>
          <button className="search-button">🔍</button>
        </div>
      </section>
      {/* Cinema Info */}
      <section className="cinema-info">
        <div className="cinema-card">
          <img
            src="https://cdn-2.tstatic.net/tribunnews/foto/bank/images/cgv-23_20180102_163148.jpg"
            alt="Tenth Avenue"
            className="cinema-image"
          />
          <div>
            <h2 className="cinema-title">Tenth Avenue</h2>
            <p className="cinema-text">
              📍 Jl. Soekarno-Hatta No.526, Cijawura, Kec. Buahbatu, Kota
              Bandung, Jawa Barat 40286
            </p>
            <p className="cinema-text">🕒 Open 09.00 AM - 22.00 PM</p>
            <p className="cinema-text">📞 0878-0002-1010</p>
          </div>
        </div>
      </section>
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
