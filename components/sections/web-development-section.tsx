import { Icon } from '@iconify/react';
import { Safari } from '@/components/ui/shadcn-io/safari';

export function WebDevelopmentSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left - Browser Mockup */}
          <div className="relative order-2 lg:order-1 flex items-center justify-center lg:justify-start">
            <div className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[650px]">
              <div className="relative z-10">
                <Safari className="w-full h-auto" mode="simple" url="ng-soft.ru">
                  <foreignObject
                    x="1"
                    y="52"
                    width="1200"
                    height="701"
                    clipPath="url(#roundedBottom)"
                  >
                    <div className="w-full h-full flex flex-col bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
                      {/* Header */}
                      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 border-b border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center justify-between">
                          {/* Decorative logo */}
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-neutral-400 dark:bg-neutral-600"></div>
                            <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
                          </div>
                          {/* Decorative navigation skeleton */}
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="h-2 bg-neutral-300 dark:bg-neutral-700 rounded w-12 sm:w-16"></div>
                            <div className="h-2 bg-neutral-300 dark:bg-neutral-700 rounded w-12 sm:w-16"></div>
                            <div className="h-2 bg-neutral-300 dark:bg-neutral-700 rounded w-12 sm:w-16"></div>
                          </div>
                        </div>
                      </div>

                      {/* Main content */}
                      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 md:px-12 py-16 sm:py-16 md:py-20">
                        <div className="flex flex-col items-center gap-8 sm:gap-8 md:gap-10 w-full">
                          {/* Browser icons */}
                          <div className="flex items-center justify-center gap-10 sm:gap-10 md:gap-14">
                            <Icon 
                              icon="simple-icons:googlechrome" 
                              className="w-24 h-24 sm:w-20 sm:h-20 md:w-28 md:h-28 text-neutral-700 dark:text-neutral-300"
                            />
                            <Icon 
                              icon="mdi:firefox" 
                              className="w-32 h-32 sm:w-24 sm:h-24 md:w-34 md:h-34 text-neutral-700 dark:text-neutral-300"
                            />
                            <Icon 
                              icon="simple-icons:safari" 
                              className="w-24 h-24 sm:w-20 sm:h-20 md:w-28 md:h-28 text-neutral-700 dark:text-neutral-300"
                            />
                          </div>
                          <div className="text-center space-y-2 sm:space-y-2">
                            <p className="text-neutral-800 dark:text-neutral-200 text-xl sm:text-xl md:text-3xl font-semibold">
                              Кроссплатформенные веб-приложения
                            </p>
                            <p className="text-neutral-600 dark:text-neutral-400 text-lg sm:text-2xl md:text-2xl">
                              Надежность и качество в любых браузерах
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50">
                        <div className="flex items-center justify-between">
                          {/* Decorative footer elements */}
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
                            <div className="h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded w-20 sm:w-24"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded w-16 sm:w-20"></div>
                            <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </foreignObject>
                </Safari>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 rounded-full blur-3xl opacity-50"
              />
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-gradient-to-br from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-800 rounded-full blur-3xl opacity-40"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6 order-1 lg:order-2"
          >
            {/* Badge */}
            <div className="inline-block">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-700">
                <Icon icon="lucide:code-2" className="h-4 w-4" />
                <span className="text-sm font-medium">Веб-разработка</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                Веб-приложения
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-500 dark:from-neutral-200 dark:via-neutral-300 dark:to-neutral-500">
                нового поколения
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Создаем масштабируемые веб-приложения с использованием современных 
              технологий и фреймворков. От корпоративных порталов до 
              высоконагруженных SaaS-платформ.
            </p>

            {/* Features */}
            <div className="space-y-4 pt-4">
              {[
                {
                  icon: 'lucide:layout',
                  title: 'Адаптивный дизайн',
                  description: 'Идеальный вид на всех устройствах',
                },
                {
                  icon: 'lucide:zap',
                  title: 'Высокая производительность',
                  description: 'Оптимизация скорости загрузки',
                },
                {
                  icon: 'lucide:shield-check',
                  title: 'Безопасность',
                  description: 'Защита данных и соответствие стандартам',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                    <Icon icon={feature.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-20 text-center"
        >
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
            Технологии, которые мы используем
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
              {[
              { icon: 'simple-icons:react', name: 'React' },
              { icon: 'simple-icons:nextdotjs', name: 'Next.js' },
              { icon: 'simple-icons:vuedotjs', name: 'Vue.js' },
              { icon: 'simple-icons:nuxtdotjs', name: 'Nuxt.js' },
              { icon: 'simple-icons:typescript', name: 'TypeScript' },
              { icon: 'simple-icons:tailwindcss', name: 'Tailwind' },
              { icon: 'simple-icons:sass', name: 'SCSS' },
              { icon: 'simple-icons:nodedotjs', name: 'Node.js' },
            ].map((tech, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center transition-transform group-hover:scale-110">
                  <Icon icon={tech.icon} className="h-6 w-6" />
                </div>
                <span className="text-xs text-neutral-600 dark:text-neutral-400">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
