import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const projects = [
  {
    id: 1,
    title: 'Корпоративный портал',
    category: 'Веб-разработка',
    description: 'Интранет-платформа для крупной компании с системой управления документами и коммуникацией сотрудников.',
    technologies: ['React', 'Next.js', 'TypeScript', 'PostgreSQL'],
    icon: 'lucide:building-2',
    year: '2024',
    stats: [
      { label: 'Пользователей', value: '5000+' },
      { label: 'Документов', value: '50K+' },
    ]
  },
  {
    id: 2,
    title: 'Мобильное приложение для логистики',
    category: 'Мобильная разработка',
    description: 'Приложение для отслеживания грузов и управления доставками в реальном времени.',
    technologies: ['React Native', 'Node.js', 'MongoDB'],
    icon: 'lucide:truck',
    year: '2024',
    stats: [
      { label: 'Доставок в день', value: '1000+' },
      { label: 'Рейтинг', value: '4.8/5' },
    ]
  },
  {
    id: 3,
    title: 'SaaS платформа для аналитики',
    category: 'Облачные решения',
    description: 'Платформа для сбора, обработки и визуализации бизнес-метрик с интеграцией различных источников данных.',
    technologies: ['Vue.js', 'Python', 'AWS', 'Docker'],
    icon: 'lucide:bar-chart-3',
    year: '2023',
    stats: [
      { label: 'Обработка данных', value: '1TB+' },
      { label: 'Клиентов', value: '200+' },
    ]
  },
  {
    id: 4,
    title: 'Система управления производством',
    category: 'Корпоративное ПО',
    description: 'ERP-система для автоматизации производственных процессов и управления запасами.',
    technologies: ['Angular', '.NET', 'SQL Server'],
    icon: 'lucide:factory',
    year: '2023',
    stats: [
      { label: 'Производительность', value: '+45%' },
      { label: 'Экономия', value: '€2M' },
    ]
  },
  {
    id: 5,
    title: 'E-commerce платформа',
    category: 'Веб-разработка',
    description: 'Маркетплейс с поддержкой множества продавцов, системой оплаты и управления заказами.',
    technologies: ['Next.js', 'Stripe', 'Vercel', 'Prisma'],
    icon: 'lucide:shopping-bag',
    year: '2023',
    stats: [
      { label: 'Товаров', value: '10K+' },
      { label: 'Заказов в месяц', value: '5K+' },
    ]
  },
  {
    id: 6,
    title: 'Чат-бот для поддержки',
    category: 'AI & Автоматизация',
    description: 'Интеллектуальный чат-бот с обработкой естественного языка для автоматизации клиентской поддержки.',
    technologies: ['Python', 'OpenAI API', 'FastAPI'],
    icon: 'lucide:bot',
    year: '2024',
    stats: [
      { label: 'Обращений в день', value: '2000+' },
      { label: 'Точность', value: '94%' },
    ]
  },
];

const categories = [
  'Все проекты',
  'Веб-разработка',
  'Мобильная разработка',
  'Облачные решения',
  'Корпоративное ПО',
  'AI & Автоматизация',
];

export default function PortfolioPage() {
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
                  <span className="text-sm font-medium">Наши проекты</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                  Портфолио
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Реализованные проекты и успешные решения для бизнеса различных масштабов
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8">
                {[
                  { number: '50+', label: 'Проектов' },
                  { number: '30+', label: 'Клиентов' },
                  { number: '5+', label: 'Лет опыта' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400">
                      {stat.number}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="relative py-12 border-y border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    index === 0
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="relative py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <article
                  key={project.id}
                  className="group relative rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 overflow-hidden hover:shadow-xl dark:hover:shadow-2xl"
                >
                  {/* Project Header */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon icon={project.icon} className="h-7 w-7" />
                      </div>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                        {project.year}
                      </span>
                    </div>

                    {/* Category */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-4">
                      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
                      {project.stats.map((stat, idx) => (
                        <div key={idx}>
                          <div className="text-lg font-bold text-neutral-900 dark:text-white">
                            {stat.value}
                          </div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/5 to-transparent dark:from-neutral-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="relative py-24 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                    Процесс работы
                  </span>
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                  От идеи до запуска продукта
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-6">
                {[
                  {
                    number: '01',
                    title: 'Анализ и планирование',
                    description: 'Изучаем ваш бизнес, определяем цели и составляем план реализации проекта.',
                    icon: 'lucide:search',
                  },
                  {
                    number: '02',
                    title: 'Дизайн и прототипирование',
                    description: 'Разрабатываем UX/UI дизайн и создаем интерактивные прототипы.',
                    icon: 'lucide:palette',
                  },
                  {
                    number: '03',
                    title: 'Разработка',
                    description: 'Пишем чистый, масштабируемый код с использованием современных технологий.',
                    icon: 'lucide:code-2',
                  },
                  {
                    number: '04',
                    title: 'Тестирование и запуск',
                    description: 'Проводим всестороннее тестирование и запускаем продукт в работу.',
                    icon: 'lucide:rocket',
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-6 p-6 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                        <Icon icon={step.icon} className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-neutral-400 dark:text-neutral-600">
                          {step.number}
                        </span>
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-12 md:p-16">
              <Icon icon="lucide:sparkles" className="h-12 w-12 mx-auto mb-6 text-neutral-700 dark:text-neutral-300" />
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                  Готовы начать свой проект?
                </span>
              </h2>
              
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
                Свяжитесь с нами, и мы обсудим, как можем помочь реализовать ваши идеи
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="group relative overflow-hidden bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 px-8 py-6 text-base"
                >
                  <Link href="#contact">
                    Обсудить проект
                    <Icon icon="lucide:arrow-right" className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 px-8 py-6 text-base"
                >
                  <Link href="#services">
                    Наши услуги
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
