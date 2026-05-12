import { FormEvent, useState } from 'react';

interface RegistrationData {
  name: string;
  email: string;
  age: string;
  category: string;
  tshirt: string;
  agree: boolean;
}

const initialData: RegistrationData = {
  name: '',
  email: '',
  age: '',
  category: '5K',
  tshirt: 'M',
  agree: false,
};

function App() {
  const [form, setForm] = useState<RegistrationData>(initialData);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof RegistrationData, value: string | boolean) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.agree) {
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">City Marathon</p>
          <h1>Run with purpose. Register today.</h1>
          <p className="subtitle">
            Join our marathon weekend with 5K, 10K, and half marathon distances. Secure your spot and get your runner kit.
          </p>
        </div>
      </header>

      <main className="content">
        <section className="form-section">
          <div className="form-card">
            <h2>Participant Registration</h2>
            <p>Complete the form below to reserve your race bib and meal voucher.</p>

            <form onSubmit={handleSubmit}>
              <label>
                Full name
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => handleChange('name', event.target.value)}
                  placeholder="Jane Doe"
                  required
                />
              </label>

              <label>
                Email address
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => handleChange('email', event.target.value)}
                  placeholder="jane@example.com"
                  required
                />
              </label>

              <label>
                Age
                <input
                  type="number"
                  min="12"
                  value={form.age}
                  onChange={(event) => handleChange('age', event.target.value)}
                  placeholder="24"
                  required
                />
              </label>

              <label>
                Race category
                <select
                  value={form.category}
                  onChange={(event) => handleChange('category', event.target.value)}
                >
                  <option value="5K">5K Fun Run</option>
                  <option value="10K">10K Challenge</option>
                  <option value="Half">Half Marathon</option>
                </select>
              </label>

              <label>
                T-shirt size
                <select
                  value={form.tshirt}
                  onChange={(event) => handleChange('tshirt', event.target.value)}
                >
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                  <option value="XL">X-Large</option>
                </select>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(event) => handleChange('agree', event.target.checked)}
                  required
                />
                I agree to the event terms and confirm my participation.
              </label>

              <button type="submit" className="primary-button">
                Register now
              </button>
            </form>

            {submitted && (
              <div className="success-box" role="status">
                <h3>Registration submitted!</h3>
                <p>
                  Thanks, {form.name}. We received your registration for the {form.category}.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
