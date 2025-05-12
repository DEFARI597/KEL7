import React, { useState } from "react";
import "./MoviePage.css";
import { useNavigate } from "react-router-dom";

const movies = [
  {
    title: "IT",
    genre: "Horror",
    duration: "2h 50m",
    image: "it.jpg",
    price: 30000,
  },
  {
    title: "La La Land",
    genre: "Romance",
    duration: "2j 8m",
    image: "lalaland.jpg",
    price: 25000,
  },
  {
    title: "When Marnie Was There",
    genre: "Animation",
    duration: "1j 43m",
    image: "marnie.jpg",
    price: 31000,
  },
  {
    title: "Miracle in Cell No. 7",
    genre: "Comedy",
    duration: "2j 25m",
    image: "miracle.jpg",
    price: 35000,
  },
  {
    title: "Jumbo",
    genre: "Animation",
    duration: "1j 42m",
    image: "jumbo.jpg",
    price: 27000,
  },
  {
    title: "Pengepungan di Bukit Duri",
    genre: "Horror",
    duration: "1j 58m",
    image: "bukit.jpg",
    price: 32000,
  },
  {
    title: "COLORFUL STAGE! THE MOVIE: A MIKU WHO CAN`T SING",
    genre: "Animation",
    duration: "1j 30m",
    image: "miku.jpg",
    price: 28000,
  },
  {
    title: "Final Destination",
    genre: "Horror",
    duration: "1j 38m",
    image: "fd.jpg",
    price: 30000,
  },
];

// Simplified Modal Component
const MovieModal = ({ movie, onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-movie-details">
          <img
            src={`/img/${movie.image}`}
            alt={movie.title}
            className="modal-movie-image"
          />
          <div className="modal-movie-info">
            <h2>{movie.title}</h2>
            <p className="movie-genre">{movie.genre}</p>
            <p className="movie-duration">{movie.duration}</p>
            <p className="movie-price">Movie Price: {movie.price}</p>
          </div>
        </div>

        <div className="modal-footer">
          <div className="price-summary">
            <p>Ticket Price: Rp {movie.price.toLocaleString()}</p>
          </div>
          <div className="action-buttons">
            <button
              className="add-food-button"
              onClick={() => onConfirm("withFood")}
            >
              Add Food & Beverages
            </button>
            <button
              className="confirm-button"
              onClick={() => onConfirm("ticketOnly")}
            >
              Buy Ticket Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add Payment Modal Component
const PaymentModal = ({ movie, onClose, onProceed }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content payment-modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="payment-details">
          <h2>Payment Details</h2>
          <div className="ticket-summary">
            <h3>{movie.title}</h3>
            <p>Price: Rp {movie.price.toLocaleString()}</p>
          </div>
          <div className="payment-options">
            <button
              className="payment-button"
              onClick={() => onProceed("credit")}
            >
              Credit Card
            </button>
            <button
              className="payment-button"
              onClick={() => onProceed("debit")}
            >
              Debit Card
            </button>
            <button
              className="payment-button"
              onClick={() => onProceed("ewallet")}
            >
              E-Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function MoviePage() {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState("All Cinema");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add authentication state
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const handleAddMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleConfirmOrder = async (orderType) => {
    if (orderType === "withFood") {
      // Store movie selection in localStorage
      localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
      navigate("/food");
    } else {
      // Navigate to payment page with ticket details
      navigate(`/payment`, {
        state: {
          type: "ticket",
          movie: selectedMovie,
          totalAmount: selectedMovie.price,
          orderDetails: {
            title: selectedMovie.title,
            quantity: 1,
            unitPrice: selectedMovie.price,
          },
        },
      });
    }
    setSelectedMovie(null);
  };

  const handlePaymentProceed = (paymentMethod) => {
    // You can pass the payment method to the payment page
    navigate(
      `/payment?method=${paymentMethod}&movieId=${selectedMovie.id}&amount=${selectedMovie.price}`
    );
  };

  // Get unique genres from movies array
  const genres = ["All Cinema", ...new Set(movies.map((movie) => movie.genre))];

  // Filter movies based on selected genre
  const filteredMovies =
    selectedGenre === "All Cinema"
      ? movies
      : movies.filter((movie) => movie.genre === selectedGenre);

  // Calculate grid class based on number of filtered items
  const getGridClass = () => {
    const itemCount = filteredMovies.length;
    if (itemCount <= 3) return "movie-grid movie-grid-few";
    if (itemCount <= 6) return "movie-grid movie-grid-medium";
    return "movie-grid";
  };

  return (
    <div className="container">
      <header className="header">
        <div className="nav-menu">
          <img src="./img/icon2.png" alt="Cineblue" className="icon2" />
          <a href="./home" className="nav-link">
            Home
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
        </div>

        <input
          type="text"
          placeholder="Search movies or theater..."
          className="search-box1"
        />
        <button
          className="join-button"
          onClick={() => {
            navigate("/");
          }}
        >
          Join us
        </button>
      </header>
      <nav className="nav">
        <div className="nav-tabs">
          <button className="active-tab">Now Showing</button>
          <button>Upcoming</button>
        </div>
        <div className="filters">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select>
            <option>All Movie</option>
          </select>
        </div>
      </nav>
      <main className={getGridClass()}>
        {filteredMovies.map((movie, index) => (
          <div key={index} className="movie-card">
            <div
              className="movie-image-container"
              style={{ position: "relative" }}
            >
              <img
                src={`/img/${movie.image}`}
                alt={movie.title}
                className="movie-image"
                style={{
                  width: "100%",
                  height: filteredMovies.length <= 3 ? "400px" : "300px",
                  objectFit: "cover",
                }}
              />
              <button
                className="add-movie-btn"
                onClick={() => handleAddMovie(movie)}
                aria-label="Add to watchlist"
              >
                +
              </button>
            </div>
            <div className="movie-info">
              <p className="movie-genre">{movie.genre}</p>
              <h2 className="movie-title">{movie.title}</h2>
              <p className="movie-duration">{movie.duration}</p>
            </div>
          </div>
        ))}
      </main>
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onConfirm={handleConfirmOrder}
        />
      )}
      {showPayment && selectedMovie && (
        <PaymentModal
          movie={selectedMovie}
          onClose={() => setShowPayment(false)}
          onProceed={handlePaymentProceed}
        />
      )}
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
