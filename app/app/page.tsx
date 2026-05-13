import { RegistrationForm } from './components/RegistrationForm';
import { highlights, raceOptions } from './race-data';

export default function Home() {
  return (
    <div className="page-shell" id="top">
      <header className="hero">
        <nav className="topbar" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Perlowitz Marathon home">
            <span aria-hidden="true">PM</span>
            Perlowitz Marathon
          </a>
          <div className="nav-links">
            <a href="#races">Races</a>
            <a href="#register">Register</a>
          </div>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">June 14, 2026 - Perlowitz Riverfront</p>
          <h1>Perlowitz Marathon</h1>
          <p className="subtitle">
            A fast, welcoming city race for first-timers, goal chasers, relay crews, and
            everyone who loves a loud finish line.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#register">Register now</a>
            <a className="secondary-link" href="#races">View race options</a>
          </div>
        </div>

        <div className="race-card" aria-label="Race day summary">
          <p>Race day</p>
          <strong>Sunday - 7:00 AM</strong>
          <span>Expo opens Saturday at Central Hall</span>
        </div>
      </header>

      <main className="content">
        <section className="info-band" aria-label="Marathon highlights">
          {highlights.map((item) => (
            <div className="highlight" key={item}>
              <span aria-hidden="true" />
              {item}
            </div>
          ))}
        </section>

        <section className="race-grid" id="races">
          <div className="section-heading">
            <p className="eyebrow">Race Weekend</p>
            <h2>Choose your start line</h2>
          </div>

          <div className="race-options">
            {raceOptions.map((race) => (
              <article className="option-card" key={race.name}>
                <div>
                  <h3>{race.name}</h3>
                  <p>{race.distance}</p>
                </div>
                <dl>
                  <div>
                    <dt>Start</dt>
                    <dd>{race.start}</dd>
                  </div>
                  <div>
                    <dt>Entry</dt>
                    <dd>{race.fee}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <RegistrationForm />
      </main>
    </div>
  );
}
