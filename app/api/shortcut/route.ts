import { NextResponse } from 'next/server';
import { ShortcutsHandler } from '@utils/handler';
import { RequestSchema } from '@utils/types';

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).substring(7);
  const startTime = Date.now();

  console.info(
    `[${requestId}] Incoming request at ${new Date().toISOString()}`
  );

  try {
    const body = await req.json();
    console.info(`[${requestId}] Request body:`, {
      command: body.command,
      hasParameters: !!body.parameters,
      parametersCount: body.parameters
        ? Object.keys(body.parameters).length
        : 0,
      hasApiKey: !!body.apiKey
    });

    const result = RequestSchema.safeParse(body);
    if (!result.success) {
      console.warn(
        `[${requestId}] Invalid request format:`,
        result.error.issues
      );
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request format.',
          errors: result.error.issues
        },
        { status: 400 }
      );
    }

    const shortcutsHandler = new ShortcutsHandler();
    const isValid = shortcutsHandler.validateRequest(result.data);

    if (!isValid) {
      console.warn(
        `[${requestId}] Unauthorized request for command: ${result.data.command}`
      );
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized.'
        },
        { status: 401 }
      );
    }

    console.info(`[${requestId}] Processing command: ${result.data.command}`);
    const response = await shortcutsHandler.processCommand(
      result.data.command,
      result.data.parameters
    );

    const duration = Date.now() - startTime;
    console.info(`[${requestId}] Request completed in ${duration}ms`, {
      success: response.success,
      hasData: !!response.data
    });

    return NextResponse.json(response);
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(
      `[${requestId}] Error processing request after ${duration}ms:`,
      error
    );
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your request.'
      },
      { status: 500 }
    );
  }
}
