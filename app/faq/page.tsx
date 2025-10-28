import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FAQStructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Часто задаваемые вопросы',
  description: 'Ответы на популярные вопросы о разработке ПО, веб-приложений, стоимости проектов, сроках разработки, технической поддержке и технологиях, которые мы используем.',
  openGraph: {
    title: 'FAQ - Часто задаваемые вопросы | NG-Soft',
    description: 'Ответы на вопросы о разработке, дизайне, безопасности и стоимости проектов',
  },
};

const faqs = [
  {
    category: 'Общие вопросы',
    icon: 'lucide:help-circle',
    questions: [
      {
        question: 'Сколько времени занимает разработка проекта?',
        answer: 'Сроки зависят от сложности проекта. Простой веб-сайт может быть готов за 2-4 недели, сложное веб-приложение — от 3 до 6 месяцев. После первичного анализа мы предоставляем детальный план с точными сроками.',
      },
      {
        question: 'Какова стоимость разработки?',
        answer: 'Стоимость рассчитывается индивидуально в зависимости от объема работ, используемых технологий и сложности проекта. Мы предоставляем бесплатную консультацию и оценку проекта.',
      },
      {
        question: 'Предоставляете ли вы техподдержку после запуска?',
        answer: 'Да, мы предлагаем различные пакеты технической поддержки и обслуживания. Включает мониторинг, обновления, исправление ошибок и консультации.',
      },
    ],
  },
  {
    category: 'Разработка',
    icon: 'lucide:code-2',
    questions: [
      {
        question: 'Какие технологии вы используете?',
        answer: 'Мы работаем с современным стеком: React, Next.js, Vue.js, Node.js, TypeScript, PostgreSQL, MongoDB. Выбор технологий зависит от требований проекта.',
      },
      {
        question: 'Можете ли вы доработать существующий проект?',
        answer: 'Да, мы проводим аудит существующего кода, определяем точки улучшения и можем взять проект на доработку или полностью его переписать при необходимости.',
      },
      {
        question: 'Как организован процесс разработки?',
        answer: 'Мы используем Agile методологию с итеративной разработкой. Регулярные встречи, демонстрации прогресса и возможность корректировки на каждом этапе.',
      },
    ],
  },
  {
    category: 'Дизайн',
    icon: 'lucide:palette',
    questions: [
      {
        question: 'Создаете ли вы дизайн с нуля?',
        answer: 'Да, наша команда дизайнеров создает уникальный дизайн на основе вашего брендбука и требований. Также можем работать с готовым дизайном.',
      },
      {
        question: 'Будет ли сайт адаптивным?',
        answer: 'Абсолютно все наши проекты адаптированы для мобильных устройств, планшетов и десктопов. Мы следуем принципам mobile-first дизайна.',
      },
    ],
  },
  {
    category: 'Безопасность',
    icon: 'lucide:shield',
    questions: [
      {
        question: 'Как вы обеспечиваете безопасность данных?',
        answer: 'Мы применяем индустриальные стандарты безопасности: шифрование данных, защиту от SQL-инъекций и XSS атак, регулярные аудиты безопасности, соответствие GDPR.',
      },
      {
        question: 'Подписываете ли вы NDA?',
        answer: 'Да, мы готовы подписать соглашение о неразглашении до начала обсуждения деталей вашего проекта.',
      },
    ],
  },
] as const;

export default function FAQPage() {
  const allFAQs = faqs.flatMap(category => 
    category.questions.map(q => ({
      question: q.question,
      answer: q.answer
    }))
  );

  return (
    <>
      <FAQStructuredData items={allFAQs} />
      <BreadcrumbStructuredData 
        items={[
          { name: 'Главная', url: '/' },
          { name: 'FAQ', url: '/faq' },
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
              <Badge variant="outline" className="px-4 py-2 bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border-neutral-300 dark:border-neutral-700">
                FAQ
              </Badge>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                  Часто задаваемые
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-500 dark:from-neutral-200 dark:via-neutral-300 dark:to-neutral-500">
                  вопросы
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Ответы на популярные вопросы о наших услугах и процессе работы
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="relative py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-12">
              {faqs.map((category, catIndex) => (
                <Card key={catIndex} className="border-neutral-200 dark:border-neutral-800">
                  <CardHeader>
                    <CardTitle className="text-2xl">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, qIndex) => (
                        <AccordionItem key={qIndex} value={`item-${catIndex}-${qIndex}`}>
                          <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-4 md:px-6">
            <Card className="max-w-4xl mx-auto text-center border-neutral-200 dark:border-neutral-700">
              <CardContent className="p-12 md:p-16">
                <CardTitle className="text-3xl md:text-4xl mb-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                    Не нашли ответ?
                  </span>
                </CardTitle>
                
                <CardDescription className="text-lg mb-8 max-w-2xl mx-auto">
                  Свяжитесь с нами, и мы с радостью ответим на все ваши вопросы
                </CardDescription>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="group relative overflow-hidden bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900"
                  >
                    <Link href="#contact">
                      Связаться с нами
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                  >
                    <Link href="/projects">
                      Посмотреть проекты
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
