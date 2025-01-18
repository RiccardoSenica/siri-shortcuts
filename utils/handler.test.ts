import { ShortcutsHandler } from './handler';

describe('ShortcutsHandler', () => {
  let handler: ShortcutsHandler;
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    process.env.USER_KEY = 'test-key-123';
    handler = new ShortcutsHandler();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('validateRequest', () => {
    it('should validate correct API key', () => {
      const isValid = handler.validateRequest({
        command: 'test',
        apiKey: 'test-key-123'
      });
      expect(isValid).toBe(true);
    });

    it('should reject invalid API key', () => {
      const isValid = handler.validateRequest({
        command: 'test',
        apiKey: 'wrong-key'
      });
      expect(isValid).toBe(false);
    });
  });

  describe('processCommand', () => {
    it('should handle ping command', async () => {
      const response = await handler.processCommand('ping');
      expect(response.success).toBe(true);
      expect(response.message).toContain('operational');
    });

    it('should handle time command', async () => {
      const response = await handler.processCommand('time');
      expect(response.success).toBe(true);
      expect(response.message).toMatch(/currently/);
    });

    it('should handle unknown command', async () => {
      const response = await handler.processCommand('unknown');
      expect(response.success).toBe(false);
      expect(response.message).toContain('Unknown command');
    });
  });
});
