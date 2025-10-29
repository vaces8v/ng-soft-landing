import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { notifyJobApplication } from '@/lib/telegram';

export async function GET(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const vacancyId = searchParams.get('vacancyId');
    const status = searchParams.get('status');
    
    const where: any = {};
    if (vacancyId) where.vacancyId = vacancyId;
    if (status) where.status = status;
    
    const applications = await prisma.jobApplication.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        vacancy: {
          select: {
            title: true,
          },
        },
      },
    });
    
    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Проверяем существование вакансии
    const vacancy = await prisma.vacancy.findUnique({
      where: { id: body.vacancyId },
    });
    
    if (!vacancy) {
      return NextResponse.json({ error: 'Vacancy not found' }, { status: 404 });
    }
    
    if (vacancy.status !== 'active') {
      return NextResponse.json({ error: 'Vacancy is not active' }, { status: 400 });
    }
    
    const application = await prisma.jobApplication.create({
      data: {
        vacancyId: body.vacancyId,
        name: body.name,
        email: body.email,
        phone: body.phone,
        resume: body.resume,
        coverLetter: body.coverLetter,
        status: 'new',
      },
    });
    
    try {
      await notifyJobApplication(application);
    } catch (e) {
      console.error('Telegram notify error:', e);
    }

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
