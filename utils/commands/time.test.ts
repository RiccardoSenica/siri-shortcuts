import { timeCommand } from './time';

describe('Time Command', () => {
  it('should return current time', async () => {
    const response = await timeCommand();

    expect(response.success).toBe(true);
    expect(response.message).toMatch(/It's currently \d{1,2}:\d{2} [AP]M/);
    expect(response.data).toHaveProperty('timestamp');
    expect(response.data).toHaveProperty('formattedTime');
  });
});
