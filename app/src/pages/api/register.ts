import type { APIRoute } from 'astro';
import { raceOptions } from '../../data/raceData';

interface RegistrationState {
  ok: boolean;
  message: string;
}

type RegistrationValues = Record<(typeof requiredFields)[number], string>;

type RegistrationRecord = Omit<RegistrationValues, 'age'> & {
  age: number;
  updates: boolean;
  submittedAt: string;
};

const requiredFields = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'age',
  'distance',
  'tshirt',
  'pace',
  'emergencyName',
  'emergencyPhone',
] as const;

function jsonResponse(state: RegistrationState, status = state.ok ? 200 : 400) {
  return new Response(JSON.stringify(state), {
    status,
    headers: {
      'content-type': 'application/json',
    },
  });
}

async function saveRegistration(
  registration: RegistrationRecord,
  runtime: App.Locals['runtime'] | undefined,
) {
  const registrations = runtime?.env.REGISTRATIONS;

  if (registrations) {
    const key = `registration:${registration.submittedAt}:${crypto.randomUUID()}`;
    await registrations.put(key, JSON.stringify(registration));
    return;
  }

  console.info('Registration submitted without persistent storage.', registration);
}

export const POST: APIRoute = async ({ request, locals }) => {
  const formData = await request.formData();
  const values = Object.fromEntries(
    requiredFields.map((field) => [field, String(formData.get(field) ?? '').trim()]),
  ) as RegistrationValues;

  const missingField = requiredFields.find((field) => values[field].length === 0);
  if (missingField) {
    return jsonResponse({ ok: false, message: 'Please complete every required field.' });
  }

  if (!formData.get('agree')) {
    return jsonResponse({ ok: false, message: 'Please accept the event waiver before registering.' });
  }

  if (!raceOptions.some((race) => race.name === values.distance)) {
    return jsonResponse({ ok: false, message: 'Please choose a valid race distance.' });
  }

  const age = Number(values.age);
  if (!Number.isInteger(age) || age < 12 || age > 99) {
    return jsonResponse({ ok: false, message: 'Participants must be between 12 and 99 years old.' });
  }

  const registration: RegistrationRecord = {
    ...values,
    age,
    updates: formData.get('updates') === 'on',
    submittedAt: new Date().toISOString(),
  };

  await saveRegistration(registration, locals.runtime);

  return jsonResponse({
    ok: true,
    message: `Thanks, ${values.firstName}. Your ${values.distance} registration is in.`,
  });
};
