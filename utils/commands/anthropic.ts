import { getMessage } from '@utils/anthropicClient';
import { ShortcutsResponse } from '../types';

export async function anthropicCommand(
  parameters: Record<string, string> | undefined
): Promise<ShortcutsResponse> {
  try {
    if (!parameters || !parameters['question']) {
      return {
        success: false,
        message: 'Sorry. Need to provide a question.'
      };
    }

    const response = await getMessage(
      'I want to know ' +
        parameters['question'] +
        '. Structure the response in a manner suitable for spoken communication.'
    );

    return {
      success: true,
      message: response
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Sorry. There was a problem with Anthropic.'
    };
  }
}
