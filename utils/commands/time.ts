import { ShortcutsResponse } from '../types';

export async function timeCommand(): Promise<ShortcutsResponse> {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return {
    success: true,
    message: `It's currently ${timeString}`,
    data: {
      timestamp: now.toISOString(),
      formattedTime: timeString
    }
  };
}
