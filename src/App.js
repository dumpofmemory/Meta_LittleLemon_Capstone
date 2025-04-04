// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Menu from './components/Menu';
import Book from './components/Book';
import About from './components/About';

function App() {
  return (
    <Router>
      <header>
        <img id="logo" src="/images/little-lemon-logo-1.png" alt="Little Lemon Logo" />
      </header>
      <nav aria-label="Main navigation">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/book">Book</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/menu" component={<Menu />} />
        <Route path="/book" element={<Book />} />
        <Route path="/about" component={<About />} />
      </Routes>
      <footer>
        <div className="footer-logo">
          <img id="footer-logo" src="/images/footer-logo.png" alt="Little Lemon Footer Logo" />
        </div>
        <div className="copyright">
          <div className="footer-line"></div>
          <p>Copyright Little Lemon</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;