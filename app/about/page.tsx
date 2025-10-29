import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BreadcrumbStructuredData } from '@/components/seo/structured-data';

export const metadata: Metadata = {
  title: 'О компании',
  description: 'NG-Soft - команда профессионалов с более чем 5-летним опытом разработки программного обеспечения. 50+ успешных проектов, 30+ довольных клиентов, 15+ специалистов.',
  openGraph: {
    title: 'О компании NG-Soft - Профессиональная разработка ПО',
    description: 'Узнайте больше о нашей команде, миссии и ценностях. Мы создаем инновационные программные решения для бизнеса любого масштаба.',
    images: ['/og-about.jpg'],
  },
  twitter: {
    title: 'О компании NG-Soft',
    description: 'Команда профессионалов с 5+ летним опытом разработки ПО',
  },
};

const values = [
  {
    icon: 'lucide:target',
    title: 'Качество',
    description: 'Создаем надежные и масштабируемые решения, проверенные временем. Каждый проект проходит строгий контроль качества',
  },
  {
    icon: 'lucide:users',
    title: 'Клиенто-ориентированность',
    description: 'Ваш успех — наша главная цель. Работаем как единая команда и всегда на связи',
  },
  {
    icon: 'lucide:lightbulb',
    title: 'Инновации',
    description: 'Используем передовые технологии и современные подходы в разработке программных решений',
  },
  {
    icon: 'lucide:shield-check',
    title: 'Надежность',
    description: 'Гарантируем безопасность данных, стабильность систем и долгосрочную поддержку',
  },
  {
    icon: 'lucide:zap',
    title: 'Эффективность',
    description: 'Оптимизируем процессы разработки для быстрого результата без потери качества',
  },
  {
    icon: 'lucide:headphones',
    title: 'Поддержка',
    description: 'Обеспечиваем круглосуточную техническую поддержку и сопровождение проектов',
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbStructuredData 
        items={[
          { name: 'Главная', url: '/' },
          { name: 'О компании', url: '/about' },
        ]}
      />
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
                  <Icon icon="lucide:info" className="h-4 w-4" />
                  <span className="text-sm font-medium">О нас</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                  Мы создаем технологии
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-500 dark:from-neutral-200 dark:via-neutral-300 dark:to-neutral-500">
                  для вашего успеха
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                NG-Soft — команда опытных разработчиков, дизайнеров и инженеров, создающая 
                инновационные программные решения для бизнеса любого масштаба
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-20 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { number: '50+', label: 'Реализованных проектов' },
                { number: '30+', label: 'Довольных клиентов' },
                { number: '5+', label: 'Лет на рынке' },
                { number: '15+', label: 'Специалистов в команде' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="relative py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-12 md:p-16">
                <Icon icon="lucide:rocket" className="h-12 w-12 mb-6 text-neutral-700 dark:text-neutral-300" />
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                    Наша миссия
                  </span>
                </h2>
                
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  Мы стремимся сделать современные технологии доступными для каждого бизнеса. 
                  Наша цель — помочь компаниям достичь цифровой трансформации и повысить 
                  эффективность через инновационные программные решения.
                </p>
                
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Мы верим, что технологии должны упрощать процессы, а не усложнять их. 
                  Поэтому создаем интуитивно понятные, надежные и масштабируемые решения, 
                  которые растут вместе с вашим бизнесом.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative py-24 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                  Наши ценности
                </span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
                Принципы, которыми мы руководствуемся в работе
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon icon={value.icon} className="h-7 w-7 text-neutral-700 dark:text-neutral-300" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3 leading-tight">
                    {value.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
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
                  Готовы работать с нами?
                </span>
              </h2>
              
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
                Свяжитесь с нами, и мы обсудим ваш проект
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="group relative overflow-hidden bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 px-8 py-6 text-base"
                >
                  <Link href="#contact">
                    Связаться с нами
                    <Icon icon="lucide:arrow-right" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 px-8 py-6 text-base"
                >
                  <Link href="/projects">
                    Посмотреть проекты
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
