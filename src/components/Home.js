// components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <main>
      <section className="banner" aria-label="Promotional banner">
        <img src="/img/pasta.png" alt="" aria-hidden="true" />
        <div className="overlay" aria-hidden="true"></div>
        <h2>30% Off This Weekend</h2>
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et congue massa, eu fringilla
          mauris. Fusce dapibus vehicula ex at ultrices. Duis at varius ligula. Integer pulvinar tempus quam, et
          consequat nulla viverra in. Nullam ut tortor magna. Nulla eget placerat leo. Nunc eu finibus magna, sed
          vulputate magna.</p>
      </section>
      <section className="content" aria-label="Featured content">
        <article>
          <img src="/images/pasta3.jpeg" alt="New Menu" />
          <h3>Our New Menu</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et congue massa, eu fringilla
            mauris. Fusce dapibus vehicula ex at ultrices. Duis at varius ligula. Integer pulvinar tempus quam,
            et consequat nulla viverra in. Nullam ut tortor magna. Nulla eget placerat leo. Nunc eu finibus
            magna, sed vulputate magna.</p>
          <Link to="/menu">See our new menu</Link>
        </article>
        <article>
          <img src="/images/book-a-table.jpeg" alt="Book a Table" />
          <h3>Book a Table</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et congue massa, eu fringilla
            mauris. Fusce dapibus vehicula ex at ultrices. Duis at varius ligula. Integer pulvinar tempus quam,
            et consequat nulla viverra in. Nullam ut tortor magna. Nulla eget placerat leo. Nunc eu finibus
            magna, sed vulputate magna.</p>
          <Link to="/book">Book your table now</Link>
        </article>
        <article>
          <img src="/images/chef.jpeg" alt="Opening Hours" />
          <h3>Opening Hours</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et congue massa, eu fringilla
            mauris. Fusce dapibus vehicula ex at ultrices.</p>
          <p>Mon-Fri: 2pm-10pm<br />Sat: 2pm-11pm<br />Sun: 2pm-9pm</p>
        </article>
      </section>
    </main>
  );
}

export default Home;