// Highlights.js
import React from 'react';
import '../styles/Highlights.css';

function Highlights() {
  return (
    <section className="highlights">
      <div className="highlights-header">
        <h2>This week's specials!</h2>
        <button className="menu-button">Online Menu</button>
      </div>
      <div className="specials">
        <article className="special">
          <img src="/images/greek salad.jpg" alt="Greek Salad" />
          <div className="special-title">
            <h3>Greek salad</h3>
            <span className="price">$12.99</span>
          </div>
          <p>
            The famous greek salad of crispy lettuce, peppers, olives and our
            Chicago style feta cheese, garnished with crunchy garlic and rosemary
            croutons.
          </p>
          <button className="order-button">Order a delivery 🛵</button>
        </article>
        <article className="special">
          <img src="/images/bruchetta.svg" alt="Bruchetta" />
          <div className="special-title">
            <h3>Bruschetta</h3>
            <span className="price">$5.99</span>
          </div>
          <p>
            Our Bruschetta is made from grilled bread that has been smeared with
            garlic and seasoned with salt and olive oil.
          </p>
          <button className="order-button">Order a delivery 🛵</button>
        </article>
        <article className="special">
          <img src="/images/lemon dessert.jpg" alt="Lemon Dessert" />
          <div className="special-title">
            <h3>Lemon Dessert</h3>
            <span className="price">$5.00</span>
          </div>
          <p>
            This comes straight from grandma's recipe book, every last ingredient
            has been sourced and is as authentic as can be imagined.
          </p>
          <button className="order-button">Order a delivery 🛵</button>
        </article>
      </div>
    </section>
  );
}

export default Highlights;
