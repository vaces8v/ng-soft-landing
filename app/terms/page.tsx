import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-neutral-950">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.05),_transparent_50%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_50%)]" />

        {/* Hero Section */}
        <section className="relative pt-32 pb-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              {/* Badge */}
              <div className="inline-block">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-700">
                  <Icon icon="lucide:file-text" className="h-4 w-4" />
                  <span className="text-sm font-medium">Юридическая информация</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                  Условия использования
                </span>
              </h1>

              {/* Last Updated */}
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Последнее обновление: 1 января 2025 года
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative py-12 pb-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 md:p-12">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  
                  {/* Introduction */}
                  <div className="mb-12">
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Настоящие Условия использования регулируют доступ и использование веб-сайта 
                      NG-Soft и предоставляемых нами услуг. Используя наш сайт или услуги, 
                      вы соглашаетесь с настоящими Условиями.
                    </p>
                  </div>

                  {/* Section 1 */}
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center flex-shrink-0">
                        <Icon icon="lucide:scale" className="h-5 w-5" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        1. Принятие условий
                      </h2>
                    </div>
                    <div className="space-y-4 ml-13 text-neutral-600 dark:text-neutral-400">
                      <p>
                        Получая доступ к нашему веб-сайту или используя наши услуги, вы подтверждаете, 
                        что прочитали, поняли и согласны соблюдать настоящие Условия использования. 
                        Если вы не согласны с какими-либо положениями, пожалуйста, не используйте наши услуги.
                      </p>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center flex-shrink-0">
                        <Icon icon="lucide:briefcase" className="h-5 w-5" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        2. Услуги
                      </h2>
                    </div>
                    <div className="space-y-4 ml-13 text-neutral-600 dark:text-neutral-400">
                      <p>NG-Soft предоставляет следующие услуги:</p>
                      <ul className="space-y-2 ml-6 list-disc">
                        <li>Разработка веб-приложений и сайтов</li>
                        <li>Разработка мобильных приложений</li>
                        <li>Облачные решения и DevOps</li>
                        <li>Техническое консультирование и поддержка</li>
                        <li>UI/UX дизайн</li>
                      </ul>
                      <p>
                        Конкретные условия предоставления услуг определяются индивидуальным договором 
                        с каждым клиентом.
                      </p>
                    </div>
                  </div>

                  {/* Section 3 */}
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center flex-shrink-0">
                        <Icon icon="lucide:copyright" className="h-5 w-5" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        3. Интеллектуальная собственность
                      </h2>
                    </div>
                    <div className="space-y-4 ml-13 text-neutral-600 dark:text-neutral-400">
                      <p>
                        Все материалы на нашем веб-сайте, включая, но не ограничиваясь, текст, 
                        графику, логотипы, изображения и программное обеспечение, являются 
                        собственностью NG-Soft и защищены законами об авторском праве.
                      </p>
                      <p>
                        Вы не имеете права копировать, воспроизводить, распространять или создавать 
                        производные работы без нашего письменного разрешения.
                      </p>
                    </div>
                  </div>

                  {/* Section 4 */}
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center flex-shrink-0">
                        <Icon icon="lucide:user-x" className="h-5 w-5" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        4. Ограничения использования
                      </h2>
                    </div>
                    <div className="space-y-4 ml-13 text-neutral-600 dark:text-neutral-400">
                      <p>При использовании наших услуг запрещается:</p>
                      <ul className="space-y-2 ml-6 list-disc">
                        <li>Нарушать применимые законы и нормативные акты</li>
                        <li>Загружать вредоносное программное обеспечение</li>
                        <li>Попытки несанкционированного доступа к системам</li>
                        <li>Использовать услуги для незаконной деятельности</li>
                        <li>Выдавать себя за другое лицо или организацию</li>
                      </ul>
                    </div>
                  </div>

                  {/* Section 5 */}
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center flex-shrink-0">
                        <Icon icon="lucide:shield-alert" className="h-5 w-5" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        5. Отказ от гарантий
                      </h2>
                    </div>
                    <div className="space-y-4 ml-13 text-neutral-600 dark:text-neutral-400">
                      <p>
                        Наш веб-сайт и услуги предоставляются "как есть" без каких-либо гарантий, 
                        явных или подразумеваемых. Мы не гарантируем, что:
                      </p>
                      <ul className="space-y-2 ml-6 list-disc">
                        <li>Сайт будет работать без перерывов и ошибок</li>
                        <li>Все дефекты будут исправлены</li>
                        <li>Сайт не содержит вирусов или вредоносного кода</li>
                      </ul>
                    </div>
                  </div>

                  {/* Section 6 */}
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center flex-shrink-0">
                        <Icon icon="lucide:alert-circle" className="h-5 w-5" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        6. Ограничение ответственности
                      </h2>
                    </div>
                    <div className="space-y-4 ml-13 text-neutral-600 dark:text-neutral-400">
                      <p>
                        NG-Soft не несет ответственности за любые прямые, косвенные, случайные 
                        или последующие убытки, возникшие в результате:
                      </p>
                      <ul className="space-y-2 ml-6 list-disc">
                        <li>Использования или невозможности использования наших услуг</li>
                        <li>Несанкционированного доступа к вашим данным</li>
                        <li>Ошибок или упущений в контенте</li>
                      </ul>
                    </div>
                  </div>

                  {/* Section 7 */}
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center flex-shrink-0">
                        <Icon icon="lucide:refresh-cw" className="h-5 w-5" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        7. Изменения условий
                      </h2>
                    </div>
                    <div className="space-y-4 ml-13 text-neutral-600 dark:text-neutral-400">
                      <p>
                        Мы оставляем за собой право изменять настоящие Условия в любое время. 
                        Изменения вступают в силу с момента публикации на сайте. Продолжая использовать 
                        наши услуги после внесения изменений, вы соглашаетесь с обновленными Условиями.
                      </p>
                    </div>
                  </div>

                  {/* Section 8 */}
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center flex-shrink-0">
                        <Icon icon="lucide:map-pin" className="h-5 w-5" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        8. Применимое право
                      </h2>
                    </div>
                    <div className="space-y-4 ml-13 text-neutral-600 dark:text-neutral-400">
                      <p>
                        Настоящие Условия регулируются и толкуются в соответствии с законодательством 
                        Российской Федерации. Все споры подлежат разрешению в судах по месту 
                        нахождения NG-Soft.
                      </p>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center flex-shrink-0">
                        <Icon icon="lucide:mail" className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                          Контактная информация
                        </h2>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          По вопросам, связанным с Условиями использования, обращайтесь:{' '}
                          <a href="mailto:legal@ng-soft.ru" className="text-neutral-900 dark:text-white underline hover:no-underline">
                            legal@ng-soft.ru
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
