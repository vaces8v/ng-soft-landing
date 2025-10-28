import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const dynamic = 'force-static';

const cookieTypes = [
  {
    name: 'Необходимые cookie',
    icon: 'lucide:shield-check',
    description: 'Эти cookie необходимы для работы сайта и не могут быть отключены.',
    examples: [
      'Сессионные cookie для аутентификации',
      'Cookie предпочтений пользователя',
      'Cookie безопасности',
    ],
    required: true,
  },
  {
    name: 'Функциональные cookie',
    icon: 'lucide:settings',
    description: 'Позволяют сайту запоминать ваши предпочтения и выборы.',
    examples: [
      'Языковые настройки',
      'Выбор региона',
      'Настройки темы оформления',
    ],
    required: false,
  },
  {
    name: 'Аналитические cookie',
    icon: 'lucide:bar-chart',
    description: 'Помогают нам понять, как посетители взаимодействуют с сайтом.',
    examples: [
      'Google Analytics',
      'Статистика посещений',
      'Анализ поведения пользователей',
    ],
    required: false,
  },
  {
    name: 'Маркетинговые cookie',
    icon: 'lucide:megaphone',
    description: 'Используются для отслеживания посетителей на разных сайтах.',
    examples: [
      'Рекламные сети',
      'Социальные сети',
      'Ретаргетинг',
    ],
    required: false,
  },
];

export default function CookiesPage() {
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
                  Политика использования cookie
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
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                      Веб-сайт NG-Soft использует файлы cookie для улучшения пользовательского опыта, 
                      анализа трафика и персонализации контента. Настоящая Политика объясняет, 
                      что такое cookie, как мы их используем и как вы можете ими управлять.
                    </p>
                  </div>

                  {/* What are cookies */}
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                      Что такое cookie?
                    </h2>
                    <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                      <p>
                        Cookie (куки) — это небольшие текстовые файлы, которые размещаются на вашем 
                        устройстве (компьютере, планшете или телефоне) при посещении веб-сайта. 
                        Они широко используются для работы сайтов или повышения эффективности их работы, 
                        а также для предоставления информации владельцам сайта.
                      </p>
                    </div>
                  </div>

                  {/* Cookie Types */}
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                      Типы используемых cookie
                    </h2>
                    <div className="space-y-6">
                      {cookieTypes.map((type, index) => (
                        <div
                          key={index}
                          className="rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6"
                        >
                          <div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                  {type.name}
                                </h3>
                                {type.required && (
                                  <span className="text-xs px-2 py-1 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium">
                                    Обязательные
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                                {type.description}
                              </p>
                              <div>
                                <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                  Примеры:
                                </p>
                                <ul className="space-y-1 ml-4 list-disc">
                                  {type.examples.map((example, idx) => (
                                    <li key={idx} className="text-xs text-neutral-600 dark:text-neutral-400">
                                      {example}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* How we use cookies */}
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                      Как мы используем cookie
                    </h2>
                    <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                      <p>Мы используем cookie для следующих целей:</p>
                      <ul className="space-y-2 ml-6 list-disc">
                        <li><strong>Функционирование сайта:</strong> обеспечение основных функций, таких как навигация и доступ к защищенным областям</li>
                        <li><strong>Аналитика:</strong> понимание того, как посетители используют сайт, для улучшения пользовательского опыта</li>
                        <li><strong>Персонализация:</strong> запоминание ваших предпочтений и настроек</li>
                        <li><strong>Безопасность:</strong> защита от мошенничества и злоупотреблений</li>
                      </ul>
                    </div>
                  </div>

                  {/* Third party cookies */}
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                      Cookie третьих сторон
                    </h2>
                    <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                      <p>
                        Некоторые cookie на нашем сайте размещаются третьими сторонами. 
                        Мы используем следующие сторонние сервисы:
                      </p>
                      <ul className="space-y-2 ml-6 list-disc">
                        <li><strong>Google Analytics:</strong> для анализа трафика и поведения пользователей</li>
                        <li><strong>Социальные сети:</strong> для интеграции с социальными платформами</li>
                      </ul>
                    </div>
                  </div>

                  {/* Managing cookies */}
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                      Управление cookie
                    </h2>
                    <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                      <p>
                        Вы можете управлять cookie через настройки вашего браузера. 
                        Большинство браузеров позволяют:
                      </p>
                      <ul className="space-y-2 ml-6 list-disc">
                        <li>Просматривать и удалять существующие cookie</li>
                        <li>Блокировать cookie от определенных сайтов</li>
                        <li>Блокировать cookie третьих сторон</li>
                        <li>Удалять все cookie при закрытии браузера</li>
                      </ul>
                      <p className="mt-4">
                        Обратите внимание, что отключение cookie может повлиять на функциональность 
                        нашего сайта и других веб-сайтов.
                      </p>
                    </div>
                  </div>

                  {/* Browser instructions */}
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                      Инструкции для популярных браузеров
                    </h2>
                    <div className="space-y-3 text-neutral-600 dark:text-neutral-400">
                      <ul className="space-y-2 ml-6 list-disc">
                        <li><strong>Google Chrome:</strong> Настройки → Конфиденциальность и безопасность → Cookie и другие данные сайтов</li>
                        <li><strong>Mozilla Firefox:</strong> Настройки → Приватность и защита → Cookie и данные сайтов</li>
                        <li><strong>Safari:</strong> Настройки → Конфиденциальность → Управление данными веб-сайтов</li>
                        <li><strong>Microsoft Edge:</strong> Настройки → Cookie и разрешения сайтов → Cookie и данные сайтов</li>
                      </ul>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                        Вопросы о cookie
                      </h2>
                      <div>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          Если у вас есть вопросы о нашем использовании cookie, свяжитесь с нами:{' '}
                          <a href="mailto:privacy@ng-soft.ru" className="text-neutral-900 dark:text-white underline hover:no-underline">
                            privacy@ng-soft.ru
                          </a>
                        </p>
                        <p className="text-neutral-600 dark:text-neutral-400 mt-4">
                          Дополнительная информация о защите данных доступна в нашей{' '}
                          <Link href="/privacy" className="text-neutral-900 dark:text-white underline hover:no-underline">
                            Политике конфиденциальности
                          </Link>.
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
