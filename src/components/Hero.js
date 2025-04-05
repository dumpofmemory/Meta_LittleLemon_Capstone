// Hero.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          We are a family-owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </p>
        <Link className="reserve-button" to="/reservations">Reserve a Table</Link>
      </div>
      <div className="hero-image">
        <img src="/images/hero-image.jpg" alt="Little Lemon Dishes" />
      </div>
    </section>
  );
}

export default Hero;
