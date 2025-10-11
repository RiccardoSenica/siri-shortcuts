import { queryAiGateway } from '@utils/aiGatewayClient';
import { ShortcutsResponse } from '../types';
import { dbOperations } from '@utils/db';

export async function anthropicCommand(
  parameters: Record<string, string> | undefined
): Promise<ShortcutsResponse> {
  const commandId = Math.random().toString(36).substring(7);
  const startTime = Date.now();

  let question = '';
  let response = '';
  let success = false;
  let errorMessage: string | undefined;
  let tokensUsed: number | undefined;

  console.info(`[CMD-${commandId}] Anthropic command started`, {
    hasParameters: !!parameters,
    timestamp: new Date().toISOString()
  });

  try {
    if (!parameters || !parameters['question']) {
      console.warn(`[CMD-${commandId}] Missing question parameter`);
      errorMessage = 'Need to provide a question.';
      return {
        success: false,
        message: 'Sorry. Need to provide a question.'
      };
    }

    question = parameters['question'];
    console.info(`[CMD-${commandId}] Processing question`, {
      questionLength: question.length,
      question:
        question.substring(0, 100) + (question.length > 100 ? '...' : '')
    });

    const prompt =
      'I want to know ' +
      question +
      '. Structure the response in a manner suitable for spoken communication.';

    const anthropicResponse = await queryAiGateway(
      prompt,
      'anthropic/claude-sonnet-4.5'
    );
    response = anthropicResponse.text;
    tokensUsed = anthropicResponse.tokensUsed;
    success = true;

    const duration = Date.now() - startTime;
    console.info(
      `[CMD-${commandId}] Anthropic command completed in ${duration}ms`,
      {
        responseLength: response.length,
        tokensUsed,
        success: true
      }
    );

    return {
      success: true,
      message: response,
      data: {
        tokensUsed
      }
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(
      `[CMD-${commandId}] Anthropic command failed after ${duration}ms:`,
      error
    );
    success = false;
    errorMessage = error instanceof Error ? error.message : 'Unknown error';
    response = 'Sorry. There was a problem with Anthropic.';

    return {
      success: false,
      message: response
    };
  } finally {
    if (question) {
      try {
        console.info(`[CMD-${commandId}] Saving query to database`);
        await dbOperations.saveAnthropicQuery({
          question,
          response,
          success,
          errorMessage,
          tokensUsed
        });
        console.info(`[CMD-${commandId}] Query saved to database successfully`);
      } catch (error) {
        console.error(
          `[CMD-${commandId}] Failed to log query to database:`,
          error
        );
      }
    }
  }
}
