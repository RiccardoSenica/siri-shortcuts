import { pingCommand } from './ping';

describe('Ping Command', () => {
  it('should return success response', async () => {
    const response = await pingCommand();

    expect(response.success).toBe(true);
    expect(response.message).toBe('The system is operational.');
    expect(response.data).toHaveProperty('timestamp');
  });
});
