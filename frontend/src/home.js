import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";

// Banner Component
const Banner = ({ currentImage, images, onPrev, onNext, onDotClick }) => (
  <div className="banner-container">
    {images.map((image, index) => (
      <img
        key={index}
        className={`main-banner ${index === currentImage ? "active" : ""}`}
        src={image}
        alt={`Banner ${index + 1}`}
      />
    ))}
    <BannerControls
      currentImage={currentImage}
      images={images}
      onPrev={onPrev}
      onNext={onNext}
      onDotClick={onDotClick}
    />
  </div>
);

// Banner Controls Component
const BannerControls = ({
  currentImage,
  images,
  onPrev,
  onNext,
  onDotClick,
}) => (
  <div className="banner-navigation">
    <div className="banner-arrows">
      <button
        className="banner-arrow prev"
        onClick={onPrev}
        aria-label="Previous slide"
      >
        ←
      </button>
      <div className="banner-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`banner-dot ${index === currentImage ? "active" : ""}`}
            onClick={() => onDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <button
        className="banner-arrow next"
        onClick={onNext}
        S
        aria-label="Next slide"
      >
        →
      </button>
    </div>
  </div>
);

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="left-section">
        <div className="nav-menu">
          <img src="./img/icon2.png" alt="Cineblue" className="icon2" />
          <Link to={"/movies"} className="movies">
            Movies
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
      </div>

      <div className="center-section">
        <div className="search-box">
          <input type="text" placeholder="Search movies or theater.." />
          <button>🔍</button>
        </div>
      </div>

      <div className="right-section">
        <div className="location-selector">
          <span>📍</span>
          <span>Bandung</span>
        </div>
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
  );
};

// Search Component
const SearchBar = () => (
  <div className="search-container">
    <div className="search-box">
      <input type="text" placeholder="Search Movie, Cinema, And City.." />
      <button>🔍</button>
    </div>
  </div>
);

// Movie Section Component
const MovieSection = () => (
  <div className="movie-section">
    <h2>Choose Your Movie</h2>
    <div className="tabs">
      <span className="active">Now Showing</span>
      <span>Upcoming</span>
    </div>
    <MovieCarousel />
  </div>
);

// Movie Carousel Component
const MovieCarousel = () => (
  <div className="carousel">
    <img src="./img/it.jpg" alt="IT" />
    <img src="./img/lalaland.jpg" alt="La La Land" />
    <img src="./img/marnie.jpg" alt="When Marnie Was There" />
    <img src="./img/miracle.jpg" alt="Miracle in Cell No 7" />
  </div>
);

// Footer Component
const Footer = () => (
  <div className="footer">
    <div className="footer-section">
      <h4>About CineBlue</h4>
      <a href="/about">Cinema class</a>
      <a href="/membership">Membership</a>
    </div>
    <div className="footer-section">
      <h4>Support</h4>
      <a href="/faq">FAQ</a>
      <a href="/contact">Contact Us</a>
    </div>
    <div className="footer-section">
      <h4>Advertisement</h4>
      <a href="/partnership">Advertisement & Partnership</a>
    </div>
    <div className="social-links">
      <a href="#" aria-label="WhatsApp">
        <i className="fab fa-whatsapp"></i>
      </a>
      <a href="#" aria-label="Twitter">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="#" aria-label="Instagram">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="#" aria-label="Facebook">
        <i className="fab fa-facebook"></i>
      </a>
      <a href="#" aria-label="YouTube">
        <i className="fab fa-youtube"></i>
      </a>
    </div>
    <div className="footer-bottom">
      COPYRIGHT © CINEBLUE 2023. ALL RIGHT RESERVED
    </div>
  </div>
);

// ScrollToTop Component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

// Main HomePage Component
const HomePage = () => {
  const navigate = useNavigate();
  const bannerImages = [
    "./img/tintin.jpg",
    "./img/interstellar.jpg",
    "./img/longleg.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []); // Add dependency array

  const nextSlide = () => {
    setCurrentImage((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentImage((prev) =>
      prev === 0 ? bannerImages.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className="main-container">
      <Header />
      <Banner
        currentImage={currentImage}
        images={bannerImages}
        onPrev={prevSlide}
        onNext={nextSlide}
        onDotClick={goToSlide}
      />
      <SearchBar />
      <MovieSection />
      <div className="theater-preview">
        <img src="./img/bioskophd2.jpg" alt="Theater Preview" />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default HomePage;
