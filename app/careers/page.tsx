import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const openPositions = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    type: 'Полная занятость',
    location: 'Удаленно / Офис',
    icon: 'lucide:code-2',
    description: 'Ищем опытного frontend разработчика для работы над сложными веб-приложениями.',
    requirements: [
      'Опыт с React/Next.js 3+ года',
      'TypeScript, современные практики',
      'Понимание производительности',
    ],
  },
  {
    id: 2,
    title: 'Backend Developer (Node.js)',
    type: 'Полная занятость',
    location: 'Удаленно',
    icon: 'lucide:server',
    description: 'Разработка и поддержка серверной части приложений на Node.js.',
    requirements: [
      'Node.js, Express/Fastify',
      'PostgreSQL, MongoDB',
      'Опыт с микросервисами',
    ],
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    type: 'Полная занятость',
    location: 'Гибрид',
    icon: 'lucide:palette',
    description: 'Создание интуитивных и красивых интерфейсов для веб и мобильных приложений.',
    requirements: [
      'Figma, Adobe Creative Suite',
      'Портфолио с реальными кейсами',
      'Понимание UX принципов',
    ],
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    type: 'Полная занятость',
    location: 'Удаленно',
    icon: 'lucide:git-branch',
    description: 'Автоматизация процессов разработки и развертывания приложений.',
    requirements: [
      'Docker, Kubernetes',
      'CI/CD (GitHub Actions, GitLab)',
      'AWS/Azure опыт',
    ],
  },
];

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

export default function CareersPage() {
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

            <div className="max-w-4xl mx-auto space-y-6">
              {openPositions.map((position) => (
                <article
                  key={position.id}
                  className="group rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 overflow-hidden hover:shadow-xl dark:hover:shadow-2xl"
                >
                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon icon={position.icon} className="h-7 w-7" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
                              {position.title}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                                <Icon icon="lucide:briefcase" className="h-3.5 w-3.5" />
                                {position.type}
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                                <Icon icon="lucide:map-pin" className="h-3.5 w-3.5" />
                                {position.location}
                              </span>
                            </div>
                          </div>
                          <Button
                            size="lg"
                            className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900"
                          >
                            Откликнуться
                          </Button>
                        </div>

                        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                          {position.description}
                        </p>

                        <div>
                          <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">
                            Требования:
                          </h4>
                          <ul className="space-y-2">
                            {position.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                <Icon icon="lucide:check" className="h-4 w-4 mt-0.5 flex-shrink-0 text-neutral-900 dark:text-white" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-12 md:p-16">
              <Icon icon="lucide:mail" className="h-12 w-12 mx-auto mb-6 text-neutral-700 dark:text-neutral-300" />
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                  Не нашли подходящую вакансию?
                </span>
              </h2>
              
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
                Отправьте нам свое резюме, и мы свяжемся с вами, когда появится подходящая позиция
              </p>

              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 px-8 py-6 text-base"
              >
                <Link href="#contact">
                  Отправить резюме
                  <Icon icon="lucide:arrow-right" className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
