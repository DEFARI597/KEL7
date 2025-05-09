import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./login";
import ForgotPasswordPage from "./forgotpw";
import SignUpPage from "./register";
import HomePage from "./home";
import Loading from "./loading/loading";
import MoviePage from "./movies";

function App() {
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/login/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the data to see the response
      })
      .catch((error) => console.error("Error fetching data:", error));

    const timer = setTimeout(() => {
      setIsloading(false);
    }, 2000); // Simulate a loading time of 3 second

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgotpw" element={<ForgotPasswordPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/movies" element={<MoviePage />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
