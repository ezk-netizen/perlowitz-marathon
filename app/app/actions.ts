'use server';

import { mkdir, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { raceOptions } from './race-data';

export interface RegistrationState {
  ok: boolean;
  message: string;
}

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

export async function registerParticipant(
  _previousState: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const values = Object.fromEntries(
    requiredFields.map((field) => [field, String(formData.get(field) ?? '').trim()]),
  ) as Record<(typeof requiredFields)[number], string>;

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

  const registration = {
    ...values,
    age,
    updates: formData.get('updates') === 'on',
    submittedAt: new Date().toISOString(),
  };

  const dataDirectory = path.join(process.cwd(), 'data');
  await mkdir(dataDirectory, { recursive: true });
  await appendFile(
    path.join(dataDirectory, 'registrations.jsonl'),
    `${JSON.stringify(registration)}\n`,
    'utf8',
  );

  return {
    ok: true,
    message: `Thanks, ${values.firstName}. Your ${values.distance} registration is in.`,
  };
}
