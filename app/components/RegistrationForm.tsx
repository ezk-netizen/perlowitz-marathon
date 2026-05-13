'use client';

import { useActionState, useMemo, useState } from 'react';
import { initialState, registerParticipant } from '../actions';
import { raceOptions, type RaceName } from '../race-data';

export function RegistrationForm() {
  const [selectedDistance, setSelectedDistance] = useState<RaceName>('Marathon');
  const [state, formAction, pending] = useActionState(registerParticipant, initialState);

  const selectedRace = useMemo(
    () => raceOptions.find((race) => race.name === selectedDistance) ?? raceOptions[0],
    [selectedDistance],
  );

  return (
    <section className="registration-layout" id="register">
      <aside className="registration-summary" aria-label="Selected race summary">
        <p className="eyebrow">Your Race</p>
        <h2>{selectedRace.name}</h2>
        <dl>
          <div>
            <dt>Distance</dt>
            <dd>{selectedRace.distance}</dd>
          </div>
          <div>
            <dt>Start time</dt>
            <dd>{selectedRace.start}</dd>
          </div>
          <div>
            <dt>Registration</dt>
            <dd>{selectedRace.fee}</dd>
          </div>
        </dl>
      </aside>

      <div className="form-panel">
        <div className="form-heading">
          <p className="eyebrow">Participant Registration</p>
          <h2>Reserve your bib</h2>
          <p>Complete the form to join the starting corral and receive race updates.</p>
        </div>

        <form action={formAction}>
          <div className="field-grid">
            <label>
              First name
              <input name="firstName" type="text" placeholder="Jane" autoComplete="given-name" required />
            </label>

            <label>
              Last name
              <input name="lastName" type="text" placeholder="Doe" autoComplete="family-name" required />
            </label>
          </div>

          <div className="field-grid">
            <label>
              Email address
              <input name="email" type="email" placeholder="jane@example.com" autoComplete="email" required />
            </label>

            <label>
              Phone number
              <input name="phone" type="tel" placeholder="(555) 014-2620" autoComplete="tel" required />
            </label>
          </div>

          <div className="field-grid">
            <label>
              Age
              <input name="age" type="number" min="12" max="99" placeholder="24" required />
            </label>

            <label>
              T-shirt size
              <select name="tshirt" defaultValue="M">
                <option value="XS">X-Small</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">X-Large</option>
                <option value="XXL">XX-Large</option>
              </select>
            </label>
          </div>

          <label>
            Race distance
            <select
              name="distance"
              value={selectedDistance}
              onChange={(event) => setSelectedDistance(event.target.value as RaceName)}
            >
              {raceOptions.map((race) => (
                <option value={race.name} key={race.name}>
                  {race.name} - {race.distance}
                </option>
              ))}
            </select>
          </label>

          <label>
            Expected pace
            <select name="pace" defaultValue="" required>
              <option value="">Select a pace range</option>
              <option value="Under 7:00">Under 7:00 / mile</option>
              <option value="7:00-8:59">7:00-8:59 / mile</option>
              <option value="9:00-10:59">9:00-10:59 / mile</option>
              <option value="11:00-12:59">11:00-12:59 / mile</option>
              <option value="13:00+">13:00+ / mile</option>
            </select>
          </label>

          <div className="field-grid">
            <label>
              Emergency contact
              <input name="emergencyName" type="text" placeholder="Alex Doe" required />
            </label>

            <label>
              Emergency phone
              <input name="emergencyPhone" type="tel" placeholder="(555) 018-1310" required />
            </label>
          </div>

          <label className="checkbox-label">
            <input name="updates" type="checkbox" defaultChecked />
            Send me race-week reminders and packet pickup details.
          </label>

          <label className="checkbox-label">
            <input name="agree" type="checkbox" required />
            I agree to the event waiver and confirm I can safely participate.
          </label>

          <button type="submit" className="primary-button" disabled={pending}>
            {pending ? 'Registering...' : 'Register now'}
          </button>
        </form>

        {state.message && (
          <div className={state.ok ? 'success-box' : 'error-box'} role="status">
            <h3>{state.ok ? 'Registration submitted!' : 'Registration needs attention'}</h3>
            <p>{state.message}</p>
          </div>
        )}
      </div>
    </section>
  );
}
