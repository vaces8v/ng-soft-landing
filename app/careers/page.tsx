import { Icon } from '@iconify/react';
import { unstable_noStore as noStore } from 'next/cache';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CareersClient } from '@/components/careers/careers-client';
import type { Vacancy } from '@/lib/vacancies-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function getVacancies(): Promise<Vacancy[]> {
  noStore();
  try {
    // Используем прямой импорт prisma для SSR
    const { prisma } = await import('@/lib/prisma');
    
    const vacancies = await prisma.vacancy.findMany({
      where: { status: 'active' },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { jobApplications: true },
        },
      },
    });
    
    return vacancies as any;
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    return [];
  }
}

const benefits = [
  {
    icon: 'lucide:home',
    title: 'Удаленная работа',
    description: 'Работайте откуда удобно',
  },
  {
    icon: 'lucide:clock',
    title: 'Гибкий график',
    description: 'Управляйте своим временем',
  },
  {
    icon: 'lucide:trending-up',
    title: 'Рост и развитие',
    description: 'Обучение за счет компании',
  },
  {
    icon: 'lucide:heart',
    title: 'Медицинская страховка',
    description: 'ДМС для вас и семьи',
  },
  {
    icon: 'lucide:coffee',
    title: 'Комфортный офис',
    description: 'Современное пространство',
  },
  {
    icon: 'lucide:users',
    title: 'Классная команда',
    description: 'Дружелюбная атмосфера',
  },
];

export default async function CareersPage() {
  const openPositions = await getVacancies();

  return (
    <>
      <Header />

      <main className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-neutral-950">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.05),_transparent_50%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_50%)]" />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              {/* Badge */}
              <div className="inline-block">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-700">
                  <Icon icon="lucide:briefcase" className="h-4 w-4" />
                  <span className="text-sm font-medium">Карьера</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                  Присоединяйтесь
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-500 dark:from-neutral-200 dark:via-neutral-300 dark:to-neutral-500">
                  к нашей команде
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Создавайте инновационные продукты вместе с профессионалами в комфортной и дружелюбной атмосфере
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="relative py-24 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                  Почему NG-Soft
                </span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
                Мы заботимся о наших сотрудниках
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon icon={benefit.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section className="relative py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                  Открытые вакансии
                </span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
                Найдите свою роль в нашей команде
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {openPositions.length > 0 ? (
                <CareersClient vacancies={openPositions} />
              ) : (
                <div className="text-center py-12">
                  <Icon icon="lucide:inbox" className="h-16 w-16 mx-auto mb-4 text-neutral-400" />
                  <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                    В данный момент нет открытых вакансий
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
