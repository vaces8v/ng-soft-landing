import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const dynamic = 'force-static';

export default function PrivacyPage() {
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
                  <span className="text-sm font-medium">Юридическая информация</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                  Политика конфиденциальности
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
                      NG-Soft уважает вашу конфиденциальность и обязуется защищать ваши персональные данные. 
                      Настоящая Политика конфиденциальности описывает, как мы собираем, используем и защищаем 
                      информацию при использовании наших услуг.
                    </p>
                  </div>

                  {/* Section 1 */}
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                      1. Какую информацию мы собираем
                    </h2>
                    <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                      <p>Мы можем собирать следующие виды информации:</p>
                      <ul className="space-y-2 ml-6 list-disc">
                        <li><strong>Личная информация:</strong> имя, адрес электронной почты, номер телефона, должность</li>
                        <li><strong>Информация о компании:</strong> название компании, адрес, сфера деятельности</li>
                        <li><strong>Техническая информация:</strong> IP-адрес, тип браузера, операционная система</li>
                        <li><strong>Информация об использовании:</strong> данные о взаимодействии с нашим сайтом</li>
                      </ul>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                      2. Как мы используем вашу информацию
                    </h2>
                    <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                      <p>Мы используем собранную информацию для:</p>
                      <ul className="space-y-2 ml-6 list-disc">
                        <li>Предоставления и улучшения наших услуг</li>
                        <li>Связи с вами по поводу проектов и запросов</li>
                        <li>Отправки информационных рассылок (с вашего согласия)</li>
                        <li>Анализа использования сайта и улучшения пользовательского опыта</li>
                        <li>Соблюдения законодательных требований</li>
                      </ul>
                    </div>
                  </div>

                  {/* Section 3 */}
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                      3. Защита данных
                    </h2>
                    <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                      <p>
                        Мы применяем современные технические и организационные меры для защиты 
                        ваших персональных данных от несанкционированного доступа, изменения, 
                        раскрытия или уничтожения:
                      </p>
                      <ul className="space-y-2 ml-6 list-disc">
                        <li>Шифрование данных при передаче (SSL/TLS)</li>
                        <li>Регулярные аудиты безопасности</li>
                        <li>Ограниченный доступ к персональным данным</li>
                        <li>Резервное копирование данных</li>
                      </ul>
                    </div>
                  </div>

                  {/* Section 4 */}
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                      4. Передача данных третьим лицам
                    </h2>
                    <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                      <p>
                        Мы не продаем и не передаем ваши персональные данные третьим лицам, 
                        за исключением случаев:
                      </p>
                      <ul className="space-y-2 ml-6 list-disc">
                        <li>С вашего явного согласия</li>
                        <li>Необходимости для выполнения наших услуг (сервис-провайдеры)</li>
                        <li>По требованию законодательства</li>
                      </ul>
                    </div>
                  </div>

                  {/* Section 5 */}
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                      5. Ваши права
                    </h2>
                    <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                      <p>Вы имеете право:</p>
                      <ul className="space-y-2 ml-6 list-disc">
                        <li>Получить доступ к своим персональным данным</li>
                        <li>Запросить исправление неточных данных</li>
                        <li>Запросить удаление своих данных</li>
                        <li>Отозвать согласие на обработку данных</li>
                        <li>Подать жалобу в надзорный орган</li>
                      </ul>
                    </div>
                  </div>

                  {/* Section 6 */}
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                      6. Файлы cookie
                    </h2>
                    <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                      <p>
                        Наш сайт использует файлы cookie для улучшения пользовательского опыта. 
                        Подробнее о типах используемых cookie и способах управления ими читайте в нашей{' '}
                        <Link href="/cookies" className="text-neutral-900 dark:text-white underline hover:no-underline">
                          Политике использования cookie
                        </Link>.
                      </p>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                        Контактная информация
                      </h2>
                      <div>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          По вопросам, связанным с обработкой персональных данных, обращайтесь:{' '}
                          <a href="mailto:privacy@ng-soft.ru" className="text-neutral-900 dark:text-white underline hover:no-underline">
                            privacy@ng-soft.ru
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
