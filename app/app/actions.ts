'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { raceOptions } from './race-data';

export interface RegistrationState {
  ok: boolean;
  message: string;
}

type RegistrationValues = Record<(typeof requiredFields)[number], string>;

type RegistrationRecord = Omit<RegistrationValues, 'age'> & {
  age: number;
  updates: boolean;
  submittedAt: string;
};

const initialState: RegistrationState = {
  ok: false,
  message: '',
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

export { initialState };

async function saveRegistration(registration: RegistrationRecord) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const registrations = (env as CloudflareEnv).REGISTRATIONS;

    if (registrations) {
      const key = `registration:${registration.submittedAt}:${crypto.randomUUID()}`;
      await registrations.put(key, JSON.stringify(registration));
      return;
    }
  } catch (error) {
    console.warn('Cloudflare registration storage is unavailable.', error);
  }

  console.info('Registration submitted without persistent storage.', registration);
}

export async function registerParticipant(
  _previousState: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const values = Object.fromEntries(
    requiredFields.map((field) => [field, String(formData.get(field) ?? '').trim()]),
  ) as RegistrationValues;

  const missingField = requiredFields.find((field) => values[field].length === 0);
  if (missingField) {
    return { ok: false, message: 'Please complete every required field.' };
  }

  if (!formData.get('agree')) {
    return { ok: false, message: 'Please accept the event waiver before registering.' };
  }

  if (!raceOptions.some((race) => race.name === values.distance)) {
    return { ok: false, message: 'Please choose a valid race distance.' };
  }

  const age = Number(values.age);
  if (!Number.isInteger(age) || age < 12 || age > 99) {
    return { ok: false, message: 'Participants must be between 12 and 99 years old.' };
  }

  const registration: RegistrationRecord = {
    ...values,
    age,
    updates: formData.get('updates') === 'on',
    submittedAt: new Date().toISOString(),
  };

  await saveRegistration(registration);

  return {
    ok: true,
    message: `Thanks, ${values.firstName}. Your ${values.distance} registration is in.`,
  };
}
