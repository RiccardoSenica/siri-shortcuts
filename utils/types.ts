import { z } from 'zod';

export const RequestSchema = z.object({
  command: z.string(),
  parameters: z.record(z.string()).optional(),
  apiKey: z.string()
});

export type ShortcutsRequest = z.infer<typeof RequestSchema>;

export interface ShortcutsResponse {
  success: boolean;
  message: string;
  data?: unknown;
  action?: {
    type: 'notification' | 'openUrl' | 'runShortcut' | 'wait';
    payload: unknown;
  };
}
