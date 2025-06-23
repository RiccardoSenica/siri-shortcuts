import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const db = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  global.prisma = db;
}

export const dbOperations = {
  async saveAnthropicQuery({
    question,
    response,
    success,
    errorMessage,
    tokensUsed
  }: {
    question: string;
    response: string;
    success: boolean;
    errorMessage?: string;
    tokensUsed?: number;
  }) {
    try {
      return await db.anthropicQuery.create({
        data: {
          question,
          response,
          success,
          errorMessage,
          tokensUsed
        }
      });
    } catch (error) {
      console.error('Failed to save query:', error);
      return null;
    }
  }
};

export { db };
