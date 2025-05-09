import React from "react";
import "./MoviePage.css";
import { Link } from "react-router-dom";

const movies = [
  {
    title: "IT",
    genre: "Thriller",
    duration: "2h 50m",
    image: "it.jpg",
  },
  {
    title: "La La Land",
    genre: "Romance",
    duration: "2j 8m",
    image: "lalaland.jpg",
  },
  {
    title: "When Marnie Was There",
    genre: "Mystery",
    duration: "1j 43m",
    image: "marnie.jpg",
  },
  {
    title: "Miracle in Cell No. 7",
    genre: "Comedy",
    duration: "2j 25m",
    image: "miracle.jpg",
  },
  {
    title: "Jumbo",
    genre: "Animation",
    duration: "1j 42m",
    image: "jumbo.jpg",
  },
  {
    title: "Pengepungan di Bukit Duri",
    genre: "Thriller",
    duration: "1j 58m",
    image: "bukit.jpg",
  },
];

function MoviePage() {
  return (
    <div className="container">
      <header className="header">
        <div className="nav-menu">
          <img src="./img/icon2.png" alt="Cineblue" className="icon2" />
          <Link to={"/home"} className="movies">
            Home
          </Link>
          <a href="/cinema" className="nav-link">
            Cinema
          </a>
          <a href="/fnb" className="nav-link">
            F&B
          </a>
          <a href="/news" className="nav-link">
            News
          </a>
        </div>

        <input
          type="text"
          placeholder="Search movies or theater..."
          className="search-box"
        />
        <button className="join-button">Join us</button>
      </header>
      <nav className="nav">
        <div className="nav-tabs">
          <button className="active-tab">Now Showing</button>
          <button>Upcoming</button>
        </div>
        <div className="filters">
          <select>
            <option>All Cinema</option>
          </select>
          <select>
            <option>All Movie</option>
          </select>
        </div>
      </nav>
      <main className="movie-grid">
        {movies.map((movie, index) => (
          <div key={index} className="movie-card">
            <img
              src={`/img/${movie.image}`}
              alt={movie.title}
              className="movie-image"
            />
            <div className="movie-info">
              <p className="movie-genre">{movie.genre}</p>
              <h2 className="movie-title">{movie.title}</h2>
              <p className="movie-duration">{movie.duration}</p>
            </div>
          </div>
        ))}
      </main>
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h3>About cineblue</h3>
            <ul>
              <li>Cinema class</li>
              <li>Membership</li>
            </ul>
          </div>
          <div>
            <h3>Help</h3>
            <ul>
              <li>FAQ</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h3>Business</h3>
            <ul>
              <li>Advertisement & Partnership</li>
            </ul>
          </div>
          <div>
            <h3>Legal</h3>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>
        <p className="copyright">
          COPYRIGHT © CINEBLUE 2025. ALL RIGHT RESERVED.
        </p>
      </footer>
         
    </div>
  );
}

export default MoviePage;
