import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Получаем статистику
    const [
      totalApplications,
      newApplications,
      inProgressApplications,
      completedApplications,
      recentApplications,
      applicationsThisMonth,
      applicationsLastMonth,
    ] = await Promise.all([
      prisma.application.count(),
      prisma.application.count({ where: { status: 'new' } }),
      prisma.application.count({ where: { status: 'in_progress' } }),
      prisma.application.count({ where: { status: 'completed' } }),
      prisma.application.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.application.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
      prisma.application.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
            lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
    ]);

    // Генерируем данные за последние 6 месяцев для графиков
    const monthlyData = [];
    const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
    const currentDate = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 1);
      
      const [monthTotal, monthCompleted] = await Promise.all([
        prisma.application.count({
          where: {
            createdAt: {
              gte: monthDate,
              lt: nextMonthDate,
            },
          },
        }),
        prisma.application.count({
          where: {
            status: 'completed',
            createdAt: {
              gte: monthDate,
              lt: nextMonthDate,
            },
          },
        }),
      ]);
      
      monthlyData.push({
        month: monthNames[monthDate.getMonth()],
        заявки: monthTotal,
        завершено: monthCompleted,
      });
    }

    // Данные для круговой диаграммы распределения по статусам
    const statusDistribution = [
      {
        name: 'Новые',
        value: newApplications,
        color: '#eab308',
      },
      {
        name: 'В работе',
        value: inProgressApplications,
        color: '#f97316',
      },
      {
        name: 'Завершены',
        value: completedApplications,
        color: '#10b981',
      },
    ];

    // Рассчитываем процент изменения
    const percentChange = applicationsLastMonth > 0
      ? ((applicationsThisMonth - applicationsLastMonth) / applicationsLastMonth) * 100
      : 0;

    return NextResponse.json({
      total: totalApplications,
      new: newApplications,
      inProgress: inProgressApplications,
      completed: completedApplications,
      recent: recentApplications,
      thisMonth: applicationsThisMonth,
      lastMonth: applicationsLastMonth,
      percentChange: Math.round(percentChange),
      monthlyData,
      statusDistribution,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
