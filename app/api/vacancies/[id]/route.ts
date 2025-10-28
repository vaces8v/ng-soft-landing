import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const vacancy = await prisma.vacancy.findUnique({
      where: { id },
      include: {
        _count: {
          select: { jobApplications: true },
        },
      },
    });
    
    if (!vacancy) {
      return NextResponse.json({ error: 'Vacancy not found' }, { status: 404 });
    }
    
    return NextResponse.json(vacancy);
  } catch (error) {
    console.error('Error fetching vacancy:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = await params;
    const body = await request.json();
    
    const vacancy = await prisma.vacancy.update({
      where: { id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.type && { type: body.type }),
        ...(body.location && { location: body.location }),
        ...(body.icon && { icon: body.icon }),
        ...(body.description && { description: body.description }),
        ...(body.requirements && { requirements: body.requirements }),
        ...(body.status && { status: body.status }),
      },
    });
    
    return NextResponse.json(vacancy);
  } catch (error) {
    console.error('Error updating vacancy:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = await params;
    
    await prisma.vacancy.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting vacancy:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
