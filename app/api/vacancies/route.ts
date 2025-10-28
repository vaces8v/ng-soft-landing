import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    const where = status ? { status } : {};
    
    const vacancies = await prisma.vacancy.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { jobApplications: true },
        },
      },
    });
    
    return NextResponse.json(vacancies);
  } catch (error: any) {
    console.error('Error fetching vacancies:', error);
    console.error('Error code:', error?.code);
    console.error('Error message:', error?.message);
    
    return NextResponse.json({ error: 'Internal server error', details: error?.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    
    const vacancy = await prisma.vacancy.create({
      data: {
        title: body.title,
        type: body.type,
        location: body.location,
        icon: body.icon || 'lucide:briefcase',
        description: body.description,
        requirements: body.requirements,
        status: 'active',
      },
    });
    
    return NextResponse.json(vacancy, { status: 201 });
  } catch (error) {
    console.error('Error creating vacancy:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
