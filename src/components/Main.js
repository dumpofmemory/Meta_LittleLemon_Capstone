// components/Main.js
import React from 'react';
import Hero from './Hero';
import Highlights from './Highlights';
import '../styles/Hero.css';
import '../styles/Highlights.css';

function Main() {
  return (
    <main>
      <Hero />
      <Highlights />
    </main>
  );
}

export default Main;
