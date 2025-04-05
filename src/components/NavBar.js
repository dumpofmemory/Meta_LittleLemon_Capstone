// NavBar.js
import React from 'react';
import Header from './Header';
import Nav from './Nav';
import '../styles/NavBar.css';

function NavBar() {
  return (
    <div className="navbar-container">
      <Header />
      <Nav />
    </div>
  );
}

export default NavBar;
