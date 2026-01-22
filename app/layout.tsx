import type { Metadata } from 'next';
import Script from 'next/script';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'DiaryWhisper',
  description: 'Siri-enabled diary tracker for expenses and day logs'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
      <Script
        defer
        src='https://analytics.frompixels.com/script.js'
        data-website-id='af4f32d9-d524-44cc-ae9b-c88a0beec398'
      />
    </html>
  );
}
