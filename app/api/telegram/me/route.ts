import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { botDeepLink } from '@/lib/telegram';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userId = (session.user as any).id as string;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        telegramChatId: true,
        telegramUsername: true,
        telegramLinkedAt: true,
        telegramAuthCode: true,
        telegramAuthCodeExpiresAt: true,
      },
    });

    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const linked = Boolean(user.telegramChatId);
    const deepLink = user.telegramAuthCode ? botDeepLink(user.telegramAuthCode) : null;

    return NextResponse.json({
      linked,
      username: user.telegramUsername,
      chatId: user.telegramChatId,
      linkedAt: user.telegramLinkedAt,
      code: user.telegramAuthCode,
      expiresAt: user.telegramAuthCodeExpiresAt,
      deepLink,
    });
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
