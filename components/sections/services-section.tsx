"use client";

import { Icon } from "@iconify/react";
import { Carousel, Card, type Card as CardType } from "@/components/ui/shadcn-io/apple-cards-carousel/apple-cards-carousel";

const services: CardType[] = [
  {
    category: "Веб-технологии",
    title: "Веб-разработка",
    src: "",
    icon: <Icon icon="lucide:code-2" className="h-7 w-7 text-neutral-700 dark:text-neutral-300" />,
    description: "Создаем ориентированные на пользователя и адаптивные веб-решения, которые соответствуют требованиям вашего бизнеса",
    link: "#web-development",
    content: (
      <div className="space-y-6 text-neutral-600 dark:text-neutral-400">
        <p className="text-lg">
          Создаем современные веб-приложения с использованием передовых технологий и фреймворков.
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Icon icon="lucide:check-circle" className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Корпоративные порталы</h4>
              <p className="text-sm">Масштабируемые решения для крупного бизнеса</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon icon="lucide:check-circle" className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">SaaS-платформы</h4>
              <p className="text-sm">Высоконагруженные системы с подписочной моделью</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon icon="lucide:check-circle" className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">E-commerce</h4>
              <p className="text-sm">Интернет-магазины с полной интеграцией платежей</p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-sm font-medium text-neutral-900 dark:text-white mb-3">Технологии:</p>
          <div className="flex flex-wrap gap-2">
            {["React", "Next.js", "Vue.js", "TypeScript", "Node.js"].map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    category: "Мобильная разработка",
    title: "Мобильные приложения",
    src: "",
    icon: <Icon icon="lucide:smartphone" className="h-7 w-7 text-neutral-700 dark:text-neutral-300" />,
    description: "Разработка нативных и кроссплатформенных мобильных приложений для iOS и Android с современным дизайном",
    link: "#mobile-development",
    content: (
      <div className="space-y-6 text-neutral-600 dark:text-neutral-400">
        <p className="text-lg">
          Разработка нативных и кроссплатформенных мобильных приложений для iOS и Android.
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Icon icon="lucide:smartphone" className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Нативная разработка</h4>
              <p className="text-sm">Swift для iOS и Kotlin для Android</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon icon="lucide:smartphone" className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Кроссплатформенная разработка</h4>
              <p className="text-sm">React Native и Flutter для быстрого запуска</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon icon="lucide:smartphone" className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">UI/UX оптимизация</h4>
              <p className="text-sm">Интуитивный интерфейс под каждую платформу</p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-sm font-medium text-neutral-900 dark:text-white mb-3">Платформы:</p>
          <div className="flex flex-wrap gap-2">
            {["iOS", "Android", "React Native", "Flutter", "Swift"].map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    category: "Облачная инфраструктура",
    title: "Облачные решения",
    src: "",
    icon: <Icon icon="lucide:cloud" className="h-7 w-7 text-neutral-700 dark:text-neutral-300" />,
    description: "Миграция, развертывание и поддержка облачной инфраструктуры с круглосуточным мониторингом",
    link: "#cloud-solutions",
    content: (
      <div className="space-y-6 text-neutral-600 dark:text-neutral-400">
        <p className="text-lg">
          Миграция, развертывание и поддержка облачной инфраструктуры для вашего бизнеса.
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Icon icon="lucide:cloud" className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Миграция в облако</h4>
              <p className="text-sm">Безопасный переход инфраструктуры в облачную среду</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon icon="lucide:cloud" className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">DevOps и CI/CD</h4>
              <p className="text-sm">Автоматизация развертывания и обновлений</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon icon="lucide:cloud" className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Мониторинг 24/7</h4>
              <p className="text-sm">Круглосуточный контроль работы системы</p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-sm font-medium text-neutral-900 dark:text-white mb-3">Провайдеры:</p>
          <div className="flex flex-wrap gap-2">
            {["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"].map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    category: "Дизайн",
    title: "UI/UX Дизайн",
    src: "",
    icon: <Icon icon="lucide:palette" className="h-7 w-7 text-neutral-700 dark:text-neutral-300" />,
    description: "Создание современного, интуитивного и привлекательного дизайна с фокусом на пользовательский опыт",
    link: "#ui-design",
    content: (
      <div className="space-y-6 text-neutral-600 dark:text-neutral-400">
        <p className="text-lg">
          Создание современного, интуитивного и привлекательного дизайна для ваших продуктов.
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Icon icon="lucide:palette" className="h-6 w-6 text-pink-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">UX исследования</h4>
              <p className="text-sm">Анализ пользовательского опыта и поведения</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon icon="lucide:palette" className="h-6 w-6 text-pink-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">UI разработка</h4>
              <p className="text-sm">Современные интерфейсы с компонентным подходом</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon icon="lucide:palette" className="h-6 w-6 text-pink-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Дизайн системы</h4>
              <p className="text-sm">Создание единого языка для всех продуктов</p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-sm font-medium text-neutral-900 dark:text-white mb-3">Инструменты:</p>
          <div className="flex flex-wrap gap-2">
            {["Figma", "Adobe XD", "Sketch", "Principle", "Framer"].map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    category: "Корпоративные системы",
    title: "Корпоративное ПО",
    src: "",
    icon: <Icon icon="lucide:briefcase" className="h-7 w-7 text-neutral-700 dark:text-neutral-300" />,
    description: "Разработка корпоративного программного обеспечения для автоматизации бизнес-процессов",
    link: "#enterprise-software",
    content: (
      <div className="space-y-6 text-neutral-600 dark:text-neutral-400">
        <p className="text-lg">
          Разработка корпоративного программного обеспечения для автоматизации бизнес-процессов.
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Icon icon="lucide:briefcase" className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">ERP системы</h4>
              <p className="text-sm">Управление ресурсами предприятия</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon icon="lucide:briefcase" className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">CRM системы</h4>
              <p className="text-sm">Управление взаимоотношениями с клиентами</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon icon="lucide:briefcase" className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Интеграции</h4>
              <p className="text-sm">Связь с существующими системами и API</p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-sm font-medium text-neutral-900 dark:text-white mb-3">Решения:</p>
          <div className="flex flex-wrap gap-2">
            {["1C", "SAP", "Битрикс24", "Custom ERP", "API Integration"].map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    category: "Искусственный интеллект",
    title: "AI Чат-боты",
    src: "",
    icon: <Icon icon="lucide:bot" className="h-7 w-7 text-neutral-700 dark:text-neutral-300" />,
    description: "Разработка умных чат-ботов с использованием искусственного интеллекта для автоматизации поддержки",
    link: "#chatbot",
    content: (
      <div className="space-y-6 text-neutral-600 dark:text-neutral-400">
        <p className="text-lg">
          Разработка умных чат-ботов с использованием искусственного интеллекта и машинного обучения.
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Icon icon="lucide:bot" className="h-6 w-6 text-cyan-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Поддержка клиентов</h4>
              <p className="text-sm">Автоматизация ответов на частые вопросы 24/7</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon icon="lucide:bot" className="h-6 w-6 text-cyan-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Обработка заказов</h4>
              <p className="text-sm">Прием и обработка заказов в мессенджерах</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon icon="lucide:bot" className="h-6 w-6 text-cyan-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Интеграция с CRM</h4>
              <p className="text-sm">Синхронизация данных с вашими системами</p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-sm font-medium text-neutral-900 dark:text-white mb-3">Платформы:</p>
          <div className="flex flex-wrap gap-2">
            {["Telegram", "WhatsApp", "VK", "OpenAI", "Custom AI"].map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

export function ServicesSection() {
  const cards = services.map((service, index) => (
    <Card key={index} card={service} index={index} />
  ));

  return (
    <section id="services" className="relative pb-20 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <div className="mx-auto">
        <Carousel items={cards} />
      </div>
    </section>
  );
}
