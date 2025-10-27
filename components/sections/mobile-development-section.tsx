import { Icon } from '@iconify/react';
import Iphone15Pro from '@/components/ui/shadcn-io/iphone-15-pro';
import { Android } from '@/components/ui/shadcn-io/android';

export function MobileDevelopmentSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-visible">
          {/* Left Content */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Badge */}
            <div
              className="inline-block"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-700">
                <Icon icon="lucide:smartphone" className="h-4 w-4" />
                <span className="text-sm font-medium">Мобильная разработка</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                Мобильные приложения
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-500 dark:from-neutral-200 dark:via-neutral-300 dark:to-neutral-500">
                под ваши нужды
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Разрабатываем нативные и кроссплатформенные мобильные приложения 
              для iOS и Android. Создаем интуитивные интерфейсы, оптимизируем 
              производительность и обеспечиваем бесшовный пользовательский опыт.
            </p>

            {/* Features */}
            <div className="space-y-4 pt-4">
              {[
                {
                  icon: 'lucide:layout',
                  title: 'Адаптивный дизайн',
                  description: 'Красивый UI для любого экрана',
                },
                {
                  icon: 'lucide:zap',
                  title: 'Высокая производительность',
                  description: 'Быстрая и плавная работа приложения',
                },
                {
                  icon: 'lucide:layers',
                  title: 'Кроссплатформенность',
                  description: 'Один код для iOS и Android',
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

          {/* Right - Devices Mockup */}
          <div
            className="relative order-1 lg:order-2 flex items-center justify-center lg:justify-end overflow-visible"
          >
            <div className="relative w-full max-w-[600px] pr-8 md:pr-16 lg:pr-0">
              {/* iPhone */}
              <div
                className="relative z-10 -mr-8 md:-mr-12"
                style={{ transform: 'rotate(-5deg)' }}
              >
                <Iphone15Pro width={260} height={530}>
                  <foreignObject
                    x="21.25"
                    y="19.25"
                    width="389.5"
                    height="843.5"
                    clipPath="url(#roundedCorners)"
                  >
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700">
                      <div className="flex flex-col items-center gap-6 px-8">
                        <Icon 
                          icon="simple-icons:ios" 
                          className="w-24 h-24 text-neutral-700 dark:text-white/90"
                        />
                        <div className="text-center">
                          <p className="text-neutral-800 dark:text-white/80 text-sm font-medium">
                            iOS Development
                          </p>
                          <p className="text-neutral-600 dark:text-white/60 text-xs mt-1">
                            Swift & SwiftUI
                          </p>
                        </div>
                      </div>
                    </div>
                  </foreignObject>
                </Iphone15Pro>
              </div>

              {/* Android */}
              <div
                className="absolute top-12 -right-8 md:-right-12 lg:right-4 z-20"
                style={{ transform: 'rotate(5deg)' }}
              >
                <Android width={240} height={490}>
                  <foreignObject
                    x="9"
                    y="14"
                    width="360"
                    height="800"
                    clipPath="url(#android-clip)"
                  >
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-600">
                      <div className="flex flex-col items-center gap-6 px-8">
                        <Icon 
                          icon="simple-icons:android" 
                          className="w-24 h-24 text-neutral-700 dark:text-white/90"
                        />
                        <div className="text-center">
                          <p className="text-neutral-800 dark:text-white/80 text-sm font-medium">
                            Android Development
                          </p>
                          <p className="text-neutral-600 dark:text-white/60 text-xs mt-1">
                            Kotlin & Jetpack
                          </p>
                        </div>
                      </div>
                    </div>
                  </foreignObject>
                </Android>
              </div>

              {/* Decorative elements */}
              <div
                className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 rounded-full blur-3xl opacity-50"
              />
              <div
                className="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-br from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-800 rounded-full blur-3xl opacity-40"
              />
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div
          className="mt-20 text-center"
        >
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
            Технологии, которые мы используем
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: 'simple-icons:react', name: 'React Native' },
              { icon: 'simple-icons:flutter', name: 'Flutter' },
              { icon: 'simple-icons:swift', name: 'Swift' },
              { icon: 'simple-icons:kotlin', name: 'Kotlin' },
              { icon: 'simple-icons:firebase', name: 'Firebase' },
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
