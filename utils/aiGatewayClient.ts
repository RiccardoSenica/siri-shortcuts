import { generateText } from 'ai';

interface AiGatewayResponse {
  text: string;
  tokensUsed: number;
}

export async function queryAiGateway(
  text: string,
  model: string
): Promise<AiGatewayResponse> {
  const requestId = Math.random().toString(36).substring(7);
  const startTime = Date.now();

  console.info(`[AI-${requestId}] Starting Vercel Gateway AI request`, {
    promptLength: text.length,
    model,
    timestamp: new Date().toISOString()
  });

  try {
    const response = await generateText({
      model,
      prompt: text
    });

    const duration = Date.now() - startTime;
    const tokensUsed = response.usage?.totalTokens || 0;

    console.info(
      `[AI-${requestId}] Vercel Gateway AI response received in ${duration}ms`,
      {
        responseLength: response.text.length,
        tokensUsed,
        usage: response.usage
      }
    );

    return {
      text: response.text,
      tokensUsed
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(
      `[AI-${requestId}] Vercel Gateway AI error after ${duration}ms:`,
      {
        error: error instanceof Error ? error.message : String(error),
        promptLength: text.length
      }
    );
    throw new Error(`Vercel Gateway AI error: ${JSON.stringify(error)}.`);
  }
}
