import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Perlowitz Marathon Registration',
  description: 'Register for the Perlowitz Marathon race weekend.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
