
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { FloatingPaths } from '@/components/FloatingPaths';
import { Footer } from '@/components/footer';
// Все секции динамические для оптимизации

const WebDevelopmentSection = dynamic(
  () => import('@/components/sections/web-development-section').then(mod => ({ default: mod.WebDevelopmentSection })),
  { loading: () => <SectionLoader /> }
);

const EnterpriseSoftwareSection = dynamic(
  () => import('@/components/sections/enterprise-software-section').then(mod => ({ default: mod.EnterpriseSoftwareSection })),
  { loading: () => <SectionLoader /> }
);

const MobileDevelopmentSection = dynamic(
  () => import('@/components/sections/mobile-development-section').then(mod => ({ default: mod.MobileDevelopmentSection })),
  { loading: () => <SectionLoader /> }
);

const CloudSolutionsSection = dynamic(
  () => import('@/components/sections/cloud-solutions-section').then(mod => ({ default: mod.CloudSolutionsSection })),
  { loading: () => <SectionLoader /> }
);

const UIDesignSection = dynamic(
  () => import('@/components/sections/ui-design-section').then(mod => ({ default: mod.UIDesignSection })),
  { loading: () => <SectionLoader /> }
);

const ChatbotSection = dynamic(
  () => import('@/components/sections/chatbot-section').then(mod => ({ default: mod.ChatbotSection })),
  { loading: () => <SectionLoader /> }
);

const ContactSection = dynamic(
  () => import('@/components/sections/contact-section').then(mod => ({ default: mod.ContactSection })),
  { loading: () => <SectionLoader /> }
);

const ServicesSection = dynamic(
  () => import('@/components/sections/services-section').then(mod => ({ default: mod.ServicesSection })),
  { loading: () => <SectionLoader /> }
);

function SectionLoader() {
  return (
    <section className="py-24 bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-1/3 mx-auto" />
          <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-2/3 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



export default function Home() {
  return (
    <>
      {/* Header */}
      <Header />

      <main className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-neutral-950">

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-16">
          {/* Animated Background */}
          <div className="sm:block hidden absolute inset-0">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
            <div
              className="max-w-5xl mx-auto space-y-4 sm:space-y-6 md:space-y-8"
            >
              {/* Badge */}
              <div
                className="inline-block"
              >
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-700">
                  <Icon icon="lucide:sparkles" className="h-4 w-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">Инновационные решения для бизнеса</span>
                </div>
              </div>

              {/* Main Title - LCP Element */}
              <h1
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight"
              >
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                  Создаем будущее
                </span>
                <br />
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-500 dark:from-neutral-200 dark:via-neutral-300 dark:to-neutral-500">
                  вашего бизнеса
                </span>
              </h1>

              {/* Description */}
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
              >
                Разрабатываем высококачественные программные решения,
                которые помогают компаниям достигать своих целей
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                <Button
                  asChild
                  size="lg"
                  className="group relative overflow-hidden bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base"
                >
                  <Link href="#contact">
                    Начать проект
                    <Icon icon="lucide:arrow-right" className="ml-2 h-4 sm:h-5 w-4 sm:w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base"
                >
                  <Link href="#services">
                    Наши услуги
                    <Icon icon="lucide:chevron-down" className="ml-2 h-4 sm:h-5 w-4 sm:w-5 transition-transform group-hover:translate-y-1" />
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div
                className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto pt-8 sm:pt-12"
              >
                {[
                  { number: '50+', label: 'Проектов' },
                  { number: '30+', label: 'Клиентов' },
                  { number: '5+', label: 'Лет опыта' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div
              className="animate-bounce"
            >
              <Icon icon="lucide:chevron-down" className="h-6 w-6 text-neutral-400" />
            </div>
          </div>
        </section>

        {/* Web Development Section */}
        <div id="web-development">
          <WebDevelopmentSection />
        </div>

        {/* Mobile Development Section */}
        <div id="mobile-development">
          <MobileDevelopmentSection />
        </div>

        {/* Cloud Solutions Section */}
        <Suspense fallback={<SectionLoader />}>
          <div id="cloud-solutions">
            <CloudSolutionsSection />
          </div>
        </Suspense>

        {/* Enterprise Software Section */}
        <div id="enterprise-software">
          <EnterpriseSoftwareSection />
        </div>

        {/* UI Design Section */}
        <Suspense fallback={<SectionLoader />}>
          <div id="ui-design">
            <UIDesignSection />
          </div>
        </Suspense>

        {/* Chatbot Section */}
        <Suspense fallback={<SectionLoader />}>
          <div id="chatbot">
            <ChatbotSection />
          </div>
        </Suspense>

        {/* Contact Section */}
        <Suspense fallback={<SectionLoader />}>
          <div id="contact">
            <ContactSection />
          </div>
        </Suspense>

        {/* Services Section */}
        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
