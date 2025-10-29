import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if ((session.user as any).role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const userId = (session.user as any).id as string;
  const body = await req.json();

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { telegramChatId: true } });
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (!user.telegramChatId) return NextResponse.json({ error: 'Telegram не привязан' }, { status: 400 });

  const data: any = {};
  if (typeof body.apps === 'boolean') data.notifyNewApplications = body.apps;
  if (typeof body.jobs === 'boolean') data.notifyJobApplications = body.jobs;
  if (!('notifyNewApplications' in data) && !('notifyJobApplications' in data)) {
    return NextResponse.json({ error: 'Нет изменений' }, { status: 400 });
  }

  const updated = await prisma.user.update({ where: { id: userId }, data });
  return NextResponse.json({
    notifyNewApplications: updated.notifyNewApplications,
    notifyJobApplications: updated.notifyJobApplications,
  });
}
