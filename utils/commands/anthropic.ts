import { getMessage } from '@utils/anthropicClient';
import { ShortcutsResponse } from '../types';
import { dbOperations } from '@utils/db';

export async function anthropicCommand(
  parameters: Record<string, string> | undefined
): Promise<ShortcutsResponse> {
  let question = '';
  let response = '';
  let success = false;
  let errorMessage: string | undefined;
  let tokensUsed: number | undefined;

  try {
    if (!parameters || !parameters['question']) {
      errorMessage = 'Need to provide a question.';
      return {
        success: false,
        message: 'Sorry. Need to provide a question.'
      };
    }

    question = parameters['question'];
    const prompt =
      'I want to know ' +
      question +
      '. Structure the response in a manner suitable for spoken communication.';

    const anthropicResponse = await getMessage(prompt);
    response = anthropicResponse.text;
    tokensUsed = anthropicResponse.tokensUsed;
    success = true;

    return {
      success: true,
      message: response,
      data: {
        tokensUsed
      }
    };
  } catch (error) {
    console.error('Anthropic command error:', error);
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
        await dbOperations.saveAnthropicQuery({
          question,
          response,
          success,
          errorMessage,
          tokensUsed
        });
      } catch (error) {
        console.error('Failed to log query to database:', error);
      }
    }
  }
}
