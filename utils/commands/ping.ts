import { ShortcutsResponse } from '../types';

export async function pingCommand(userId: string): Promise<ShortcutsResponse> {
  return {
    success: true,
    message: 'The system is operational.',
    data: {
      timestamp: new Date().toISOString(),
      userId
    }
  };
}
