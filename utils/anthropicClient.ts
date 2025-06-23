import Anthropic from '@anthropic-ai/sdk';

interface AnthropicResponse {
  text: string;
  tokensUsed: number;
}

export async function getMessage(text: string): Promise<AnthropicResponse> {
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

    const tokensUsed =
      (response.usage?.input_tokens || 0) +
      (response.usage?.output_tokens || 0);

    console.info('Token usage:', {
      input_tokens: response.usage?.input_tokens,
      output_tokens: response.usage?.output_tokens,
      total: tokensUsed
    });

    return {
      text: data[0].text,
      tokensUsed
    };
  } catch (error) {
    throw new Error(`Anthropic client error: ${JSON.stringify(error)}.`);
  }
}
