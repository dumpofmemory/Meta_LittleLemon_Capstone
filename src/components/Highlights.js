// Highlights.js
import React from 'react';
import '../styles/Highlights.css'; // Create Highlights.css

function Highlights() {
  return (
    <section className="highlights">
      <div className="highlights-header">
        <h2>This week's specials!</h2>
        <button className="menu-button">Online Menu</button>
      </div>
      <div className="specials">
        <article className="special">
          <img src="/images/greek-salad.jpg" alt="Greek Salad" />
          <h3>Greek salad</h3>
          <p>
            The famous greek salad of crispy lettuce, peppers, olives and our
            Chicago style feta cheese, garnished with crunchy garlic and rosemary
            croutons.
          </p>
          <button className="order-button">Order a delivery 🛵</button>
        </article>
        <article className="special">
          <img src="/images/bruchetta.jpg" alt="Bruchetta" />
          <h3>Bruchetta</h3>
          <p>
            Our Bruschetta is made from grilled bread that has been smeared with
            garlic and seasoned with salt and olive oil.
          </p>
          <button className="order-button">Order a delivery 🛵</button>
        </article>
        <article className="special">
          <img src="/images/lemon-dessert.jpg" alt="Lemon Dessert" />
          <h3>Lemon Dessert</h3>
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
