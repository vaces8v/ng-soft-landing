"use client"

import { Icon } from '@iconify/react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart';
import Link from 'next/link';

const chartData = [
  { month: 'Янв 5', inbound: 245, outbound: 189 },
  { month: 'Янв 12', inbound: 312, outbound: 267 },
  { month: 'Янв 19', inbound: 189, outbound: 223 },
  { month: 'Янв 26', inbound: 278, outbound: 245 },
  { month: 'Фев 2', inbound: 356, outbound: 312 },
  { month: 'Фев 9', inbound: 289, outbound: 267 },
  { month: 'Фев 16', inbound: 423, outbound: 378 },
  { month: 'Фев 23', inbound: 378, outbound: 334 },
  { month: 'Мар 2', inbound: 445, outbound: 389 },
  { month: 'Мар 9', inbound: 389, outbound: 356 },
  { month: 'Мар 16', inbound: 467, outbound: 423 },
  { month: 'Мар 23', inbound: 412, outbound: 378 },
];

const chartConfig = {
  inbound: {
    label: 'Приход',
    color: 'hsl(217, 91%, 60%)',
  },
  outbound: {
    label: 'Расход',
    color: 'hsl(217, 91%, 45%)',
  },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-3 shadow-xl">
        <div className="mb-2 text-sm font-medium text-muted-foreground">
          Дата: {label}
        </div>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <Icon 
                icon={entry.dataKey === 'inbound' ? 'lucide:arrow-down-to-line' : 'lucide:arrow-up-from-line'} 
                className="h-4 w-4" 
                style={{ color: entry.color }}
              />
              <span className="text-muted-foreground">
                {entry.dataKey === 'inbound' ? 'Приход' : 'Расход'}:
              </span>
              <span className="font-bold">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const InteractiveChart = () => {
  const totalInbound = chartData.reduce((sum, d) => sum + d.inbound, 0);
  const totalOutbound = chartData.reduce((sum, d) => sum + d.outbound, 0);

  return (
    <div className="relative h-full">
      <div className="relative p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-2xl">
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
              Складской учет
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Движение товаров за последние 3 месяца
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
              <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                Приход
              </div>
              <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                {totalInbound}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
              <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                Расход
              </div>
              <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                {totalOutbound}
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <ChartContainer id="enterprise-chart" config={chartConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 6)}
              />
              <ChartTooltip cursor={false} content={<CustomTooltip />} />
              <Bar dataKey="inbound" fill="var(--color-inbound)" radius={4} />
              <Bar dataKey="outbound" fill="var(--color-outbound)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

const SoftwareCard = ({ 
  icon, 
  title, 
  description, 
  features, 
  delay 
}: { 
  icon: string; 
  title: string; 
  description: string; 
  features: string[]; 
  delay: number;
}) => {
  return (
    <div className="group relative">
      <div className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900/50 dark:to-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50 backdrop-blur-xl hover:shadow-2xl transition-all duration-500">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neutral-100/50 via-transparent to-neutral-100/50 dark:from-neutral-800/30 dark:via-transparent dark:to-neutral-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        <div className="relative z-10">
          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
            <Icon icon={icon} className="h-7 w-7 text-neutral-700 dark:text-neutral-300" />
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            {description}
          </p>
          
          {/* Features */}
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <Icon icon="lucide:check" className="h-4 w-4 text-neutral-700 dark:text-neutral-300 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export function EnterpriseSoftwareSection() {
  const solutions = [
    {
      icon: 'lucide:users',
      title: 'CRM системы',
      description: 'Управление взаимоотношениями с клиентами',
      features: [
        'База клиентов и контактов',
        'Воронка продаж',
        'Аналитика и отчетность',
        'Интеграция с почтой',
      ],
    },
    {
      icon: 'lucide:package',
      title: 'ERP решения',
      description: 'Планирование ресурсов предприятия',
      features: [
        'Управление складом',
        'Финансовый учет',
        'HR менеджмент',
        'Производственный учет',
      ],
    },
    {
      icon: 'lucide:clipboard-list',
      title: 'Управление проектами',
      description: 'Планирование и контроль проектов',
      features: [
        'Канбан и Gantt диаграммы',
        'Трекинг времени',
        'Управление задачами',
        'Командная работа',
      ],
    },
    {
      icon: 'lucide:file-text',
      title: 'Документооборот',
      description: 'Электронный документооборот',
      features: [
        'Электронная подпись',
        'Версионность документов',
        'Маршруты согласования',
        'Архив документов',
      ],
    },
    {
      icon: 'lucide:bar-chart',
      title: 'BI и аналитика',
      description: 'Бизнес-аналитика и визуализация',
      features: [
        'Интерактивные дашборды',
        'Отчеты в реальном времени',
        'Предиктивная аналитика',
        'KPI мониторинг',
      ],
    },
    {
      icon: 'lucide:shopping-cart',
      title: 'E-commerce платформы',
      description: 'Решения для электронной коммерции',
      features: [
        'Каталог товаров',
        'Корзина и оплата',
        'Личный кабинет',
        'Интеграция с доставкой',
      ],
    },
  ];

  const benefits = [
    {
      icon: 'lucide:zap',
      title: 'Автоматизация',
      description: 'Сокращение рутинных операций до 80%',
    },
    {
      icon: 'lucide:trending-up',
      title: 'Рост эффективности',
      description: 'Увеличение производительности на 40-60%',
    },
    {
      icon: 'lucide:shield',
      title: 'Безопасность',
      description: 'Защита данных по современным стандартам',
    },
    {
      icon: 'lucide:settings',
      title: 'Гибкость',
      description: 'Адаптация под специфику вашего бизнеса',
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 overflow-x-clip">
      {/* Interactive Chart Section - Goes beyond left edge */}
      <div className="relative mb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Chart (extends beyond container) */}
            <div className="relative lg:-ml-12 xl:-ml-16">
              <InteractiveChart />
            </div>

            {/* Right - Description */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-700">
                <Icon icon="lucide:trending-up" className="h-4 w-4" />
                <span className="text-sm font-medium">Результаты внедрения</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                  Измеримые результаты
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-500 dark:from-neutral-200 dark:via-neutral-300 dark:to-neutral-500">
                  для вашего бизнеса
                </span>
              </h2>

              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Наши клиенты отмечают значительный рост эффективности после внедрения
                корпоративных решений. Автоматизация процессов позволяет сократить
                время на рутинные операции и сфокусироваться на развитии бизнеса.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                      <Icon icon={benefit.icon} className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-700">
              <Icon icon="lucide:briefcase" className="h-4 w-4" />
              <span className="text-sm font-medium">Корпоративное ПО</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
              Корпоративные решения
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-500 dark:from-neutral-200 dark:via-neutral-300 dark:to-neutral-500">
              для вашего бизнеса
            </span>
          </h2>

          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Разработка внутренних программных решений для управления бизнес-процессами.
            От CRM и ERP систем до специализированных отраслевых решений.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {solutions.map((solution, index) => (
            <SoftwareCard
              key={solution.title}
              icon={solution.icon}
              title={solution.title}
              description={solution.description}
              features={solution.features}
              delay={0.1 * index}
            />
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mt-16 text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
            Технологический стек для корпоративных решений
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: 'simple-icons:dotnet', name: '.NET' },
              { icon: 'simple-icons:nodedotjs', name: 'Node.js' },
              { icon: 'simple-icons:postgresql', name: 'PostgreSQL' },
              { icon: 'simple-icons:mongodb', name: 'MongoDB' },
              { icon: 'simple-icons:redis', name: 'Redis' },
              { icon: 'simple-icons:rabbitmq', name: 'RabbitMQ' },
            ].map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center transition-transform group-hover:scale-110">
                  <Icon icon={tech.icon} className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
                </div>
                <span className="text-xs text-neutral-600 dark:text-neutral-400">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Link href="/#contact" className="px-8 py-4 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-200 text-white dark:text-neutral-900 font-medium hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2">
                <span>Обсудить проект</span>
                <Icon icon="lucide:arrow-right" className="h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
