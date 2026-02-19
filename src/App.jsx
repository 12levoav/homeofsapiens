import { useEffect, useState } from 'react';

const partnerLogos = [
  { name: 'Kave Home', src: '/assets/logos/kave-home.svg' },
  { name: 'ASA Germany', src: '/assets/logos/asa.svg' },
  { name: 'Ferm Living', src: '/assets/logos/ferm-living.svg' },
  { name: 'Bloomingville', src: '/assets/logos/bloomingville.svg' },
  { name: 'Serax', src: '/assets/logos/serax.svg' },
  { name: 'Aida', src: '/assets/logos/aida.svg' }
];

const categories = [
  { title: 'Plates', src: '/assets/images/category-plates.png' },
  { title: 'Glasses', src: '/assets/images/category-glasses.png' },
  { title: 'Cutlery', src: '/assets/images/category-cutlery.png' },
  { title: 'Textile', src: '/assets/images/category-textile.png' },
  { title: 'Mugs', src: '/assets/images/category-mugs.png' },
  { title: 'Serving', src: '/assets/images/category-serving.png' },
  { title: 'Vases', src: '/assets/images/category-vases.png' },
  { title: 'Accessories', src: '/assets/images/category-accessories.png' }
];

const featureItems = [
  {
    title: 'Free shipping',
    body: 'on orders within Yerevan'
  },
  {
    title: 'Fast delivery',
    body: 'within 24 hours'
  },
  {
    title: 'Thoughtful curation',
    body: 'authentic pieces from trusted European brands'
  }
];

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
    </svg>
  );
}

function Header() {
  return (
    <>
      <div className="announcement">Curated European home pieces, delivered in Yerevan.</div>
      <header className="header container" data-animate="fade-down">
        <a className="brand" href="#home">
          <img src="/assets/logos/home-of-sapiens.svg" alt="Home of Sapiens" />
        </a>
        <nav className="top-nav" aria-label="Primary">
          <a href="#brands">Brands</a>
          <a href="#categories">Categories</a>
          <a href="#story">Story</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section id="home" className="hero" aria-label="Hero image" data-animate="zoom">
      <img src="/assets/images/hero-sandy-cave-v4.png" alt="Aesthetic sandy cave-style house architecture" />
      <div className="hero-overlay container">
        <h1>Design a home that reflects who you are.</h1>
        <a href="#categories" className="hero-cta">
          Explore collections
        </a>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="intro" data-animate="up">
      <p>
        BRINGING SIMPLICITY, ELEGANCE, AND QUALITY THROUGH
        <br />
        THOUGHTFULLY CHOSEN PIECES
      </p>
    </section>
  );
}

function Partners() {
  return (
    <section id="brands" className="partners container" aria-label="Brand partners" data-animate="up">
      <header className="section-header">
        <h2>Trusted international partners</h2>
      </header>
      <div className="partner-grid">
        {partnerLogos.map((logo, index) => (
          <figure key={logo.name} className="partner-logo" data-animate="up" style={{ '--reveal-delay': `${index * 60}ms` }}>
            <img src={logo.src} alt={logo.name} loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section id="categories" className="categories container" aria-label="Product categories" data-animate="up">
      <header className="section-header">
        <h2>Product Categories</h2>
      </header>

      <div className="categories-grid">
        {categories.map((item, index) => (
          <article key={item.title} className="category-card" data-animate="up" style={{ '--reveal-delay': `${index * 65}ms` }}>
            <img src={item.src} alt={item.title} loading="lazy" />
            <h3>{item.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="features" aria-label="Service highlights">
      <div className="container">
        <header className="section-header" data-animate="up">
          <h2>Designed for effortless living</h2>
        </header>

        <div className="feature-grid">
          {featureItems.map((item, index) => (
            <article key={item.title} className="feature-item" data-animate="up" style={{ '--reveal-delay': `${index * 80}ms` }}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="story container" aria-label="Our story">
      <header className="section-header" data-animate="up">
        <h2>Creating homes with intention</h2>
      </header>

      <div className="story-row">
        <figure className="story-image left" data-animate="left">
          <img src="/assets/images/story-arched-living-nook-v2.png" alt="Warm architectural living nook with curved wall" loading="lazy" />
        </figure>

        <article className="story-copy" data-animate="right">
          <h3>Our story</h3>
          <p>
            Moving into our very first home was one of the most exciting journeys of our lives. It was driven by
            passion, energy, and a deep desire to make every corner a true reflection of who we are. We didn't want a
            space that simply looked nice-we wanted a home that felt personal, meaningful, and lived in.
          </p>
          <p>
            Very quickly, we faced a challenge many people know too well: the pieces we imagined for our home simply
            didn't exist in the local market. The quality, design, and thoughtfulness we were searching for led us
            beyond borders. We began discovering and sourcing items from European brands-carefully chosen pieces that
            allowed our ideas to come to life and our home to feel complete.
          </p>
          <p>
            After living with these objects for almost a year-experiencing their comfort, beauty, and durability every
            single day-we realized something important. This feeling shouldn't be rare. Creating a thoughtful, elegant
            home shouldn't require endless searching, compromises, or inaccessible prices.
          </p>
        </article>
      </div>

      <div className="story-row reverse">
        <article className="story-copy" data-animate="left">
          <p>
            That realization became the beginning of our journey. We founded Home of Sapiens to bring that experience
            closer to home. A multi-brand space where every piece is carefully selected, where design serves real
            living, and where quality is felt-not just seen. Our goal is to bring elegance, beauty, comfort, and
            lasting quality to Armenian homes by offering products from responsible international brands, at fair and
            reasonable prices.
          </p>
          <p>
            The name Home of Sapiens reflects our belief that a home is more than a space-it is a human expression. It
            evolves with us, carries our stories, and reflects our values, tastes, and way of living. We believe people
            deserve homes that feel intentional, warm, and deeply personal.
          </p>
          <p>
            This is not just a store.
            <br />
            It's a place for people who care about how they live.
          </p>
          <p>With love,</p>
          <p>LK</p>
        </article>

        <figure className="story-image right" data-animate="right">
          <img src="/assets/images/story-stone-bathroom-ritual-v2.png" alt="Minimal warm-toned bathroom interior" loading="lazy" />
        </figure>
      </div>
    </section>
  );
}

function ImpactBanner() {
  return (
    <section className="impact" data-animate="up">
      <p className="container">
        Each year, we dedicate 5% of our revenue to addressing Armenia's environmental challenges by supporting
        tree-planting initiatives in Yerevan.
      </p>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    website: ''
  });
  const [status, setStatus] = useState({ type: 'idle', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setStatus({ type: 'idle', text: '' });
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload?.error || 'Unable to send your inquiry right now.');
      }

      setStatus({ type: 'success', text: 'Thanks. Your inquiry has been sent successfully.' });
      setForm({
        name: '',
        email: '',
        message: '',
        website: ''
      });
    } catch (error) {
      setStatus({
        type: 'error',
        text: error?.message || 'Something went wrong while sending your inquiry.'
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="contact container" aria-label="Contact section">
      <header className="section-header" data-animate="up">
        <h2>Let's style your home together</h2>
      </header>

      <div className="contact-grid">
        <article className="contact-card" data-animate="left">
          <h3>Reach us</h3>
          <p>Home of Sapiens LLC</p>
          <p>Yerevan, Armenia</p>
          <a href="mailto:info@homeofsapiens.am">info@homeofsapiens.am</a>
          <a href="tel:+37455772022">+37455772022</a>
          <p className="contact-hours">Mon-Sat, 10:00-20:00</p>
        </article>

        <form className="contact-form" data-animate="right" onSubmit={handleSubmit}>
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={handleChange}
            className="contact-honeypot"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
          />

          <label htmlFor="name">Full name</label>
          <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Tell us what you are looking for"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send inquiry'}
          </button>

          {status.type !== 'idle' ? (
            <p className={`contact-form-status ${status.type}`} role="status" aria-live="polite">
              {status.text}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" data-animate="up">
      <div className="socials" aria-label="Social links">
        <span className="social-icon" role="img" aria-label="Instagram">
          <InstagramIcon />
        </span>
        <span className="social-icon" role="img" aria-label="Pinterest">
          <PinterestIcon />
        </span>
        <span className="social-icon" role="img" aria-label="TikTok">
          <TikTokIcon />
        </span>
        <span className="social-icon" role="img" aria-label="LinkedIn">
          <LinkedinIcon />
        </span>
      </div>

      <address>
        <p>Home of Sapiens LLC</p>
        <a href="mailto:info@homeofsapiens.am">info@homeofsapiens.am</a>
      </address>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const animatedNodes = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    animatedNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <Intro />
      <Partners />
      <Categories />
      <Features />
      <Story />
      <ImpactBanner />
      <Contact />
      <Footer />
    </>
  );
}
