import { POST } from './route';

describe('Shortcuts API Route', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    process.env.USER_KEY = 'test-key-123';
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should handle valid ping request', async () => {
    const request = new Request('http://localhost:3000/api/shortcuts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        command: 'ping',
        apiKey: 'test-key-123'
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toContain('operational');
  });

  it('should reject invalid API key', async () => {
    const request = new Request('http://localhost:3000/api/shortcuts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        command: 'ping',
        apiKey: 'wrong-key'
      })
    });

    const response = await POST(request);
    expect(response.status).toBe(401);
  });

  it('should handle invalid request format', async () => {
    const request = new Request('http://localhost:3000/api/shortcuts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        command: 'ping'
      })
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
