import Anthropic from '@anthropic-ai/sdk';

export async function getMessage(text: string) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  });

  console.info('Anthropic request with text: ', text);

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2048,
    messages: [{ role: 'user', content: text }]
  });

  console.info('Anthropic response: ', response);

  try {
    const data = response.content as [{ type: string; text: string }];

    return data[0].text;
  } catch (error) {
    throw new Error(`Anthropic client error: ${JSON.stringify(error)}.`);
  }
}
