import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if ((session.user as any).role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const userId = (session.user as any).id as string;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      role: true,
      notifyNewApplications: true,
      notifyJobApplications: true,
      telegramChatId: true,
    },
  });
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({
    name: user.name,
    email: user.email,
    role: user.role,
    notifyNewApplications: user.notifyNewApplications,
    notifyJobApplications: user.notifyJobApplications,
    telegramLinked: Boolean(user.telegramChatId),
  });
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if ((session.user as any).role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const userId = (session.user as any).id as string;
  const body = await req.json();
  const data: any = {};
  if (typeof body.name === 'string') data.name = body.name.trim();
  if (typeof body.email === 'string') data.email = body.email.trim();
  if (!data.name && !data.email) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  try {
    const updated = await prisma.user.update({ where: { id: userId }, data });
    return NextResponse.json({ name: updated.name, email: updated.email });
  } catch (e: any) {
    if (e?.code === 'P2002') {
      return NextResponse.json({ error: 'Email уже используется' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
