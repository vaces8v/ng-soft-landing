'use client';

import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Cursor,
  CursorBody,
  CursorMessage,
  CursorName,
  CursorPointer,
} from '@/components/ui/shadcn-io/cursor';

const designers = [
  {
    id: 1,
    name: 'Дизайнер',
    icon: 'lucide:user',
    iconBg: 'bg-blue-100 dark:bg-blue-900/50',
    message: 'Добавим тень?',
    color: {
      foreground: 'text-blue-800 dark:text-blue-200',
      background: 'bg-blue-50 dark:bg-blue-900/30 backdrop-blur-xl',
    },
  },
  {
    id: 2,
    name: 'Разработчик',
    icon: 'lucide:user',
    iconBg: 'bg-purple-100 dark:bg-purple-900/50',
    message: 'Реализуем без проблем!',
    color: {
      foreground: 'text-purple-800 dark:text-purple-200',
      background: 'bg-purple-50 dark:bg-purple-900/30 backdrop-blur-xl',
    },
  },
  {
    id: 3,
    name: 'Менеджер',
    icon: 'lucide:user',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
    message: 'Отличный выбор цвета!',
    color: {
      foreground: 'text-emerald-800 dark:text-emerald-200',
      background: 'bg-emerald-50 dark:bg-emerald-900/30 backdrop-blur-xl',
    },
  },
];

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * 70) + 15,
  y: Math.floor(Math.random() * 70) + 15,
});

const DesignCanvas = () => {
  const [positions, setPositions] = useState([
    { x: 20, y: 20 },
    { x: 30, y: 40 },
    { x: 70, y: 60 },
  ]);

  useEffect(() => {
    const intervals = designers.map((_, index) => {
      return setInterval(
        () => {
          setPositions((prev) => {
            const newPositions = [...prev];
            newPositions[index] = getRandomPosition();
            return newPositions;
          });
        },
        Math.random() * 3000 + 2000 + index * 1000
      );
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const designersWithPositions = designers.map((designer, index) => ({
    ...designer,
    position: positions[index],
  }));

  return (
    <div className="relative w-full h-full min-h-[480px] sm:min-h-[500px] rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-2xl overflow-hidden">
      {/* App Layout - Header */}
      <div className="absolute rounded-tl-2xl rounded-tr-2xl top-0 left-0 right-0 h-14 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between px-4 sm:px-6 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 flex items-center justify-center">
          </div>
          <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-700 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-700" />
          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-700" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800" />
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden sm:block absolute rounded-bl-2xl top-14 left-0 bottom-0 w-16 bg-neutral-50 dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 z-10">
        <div className="flex flex-col items-center py-4 gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="w-10 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover_bg-neutral-600 transition-colors"
            />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="absolute top-14 left-0 sm:left-16 right-0 bottom-0 p-4 sm:p-6 overflow-hidden">
        <div className="space-y-4">
          {/* Stats Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="p-4 rounded-lg bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-800/50 border border-neutral-200 dark:border-neutral-700"
              >
                <div className="h-2 w-12 bg-neutral-300 dark:bg-neutral-600 rounded mb-3" />
                <div className="h-6 w-20 bg-neutral-200 dark:bg-neutral-700 rounded mb-2" />
                <div className="h-2 w-16 bg-neutral-300 dark:bg-neutral-600 rounded" />
              </div>
            ))}
          </div>

          {/* Table/List */}
          <div

            className="rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden"
          >
            {/* Table Header */}
            <div className="h-10 bg-neutral-100 dark:bg-neutral-700/50 border-b border-neutral-200 dark:border-neutral-700 flex items-center px-4 gap-4">
              <div className="h-2 w-24 bg-neutral-300 dark:bg-neutral-600 rounded" />
              <div className="h-2 w-32 bg-neutral-300 dark:bg-neutral-600 rounded" />
              <div className="h-2 w-20 bg-neutral-300 dark:bg-neutral-600 rounded ml-auto" />
            </div>
            {/* Table Rows */}
            {[1, 2, 3].map((row) => (
              <div
                key={row}
                className="h-12 border-b border-neutral-200 dark:border-neutral-700 flex items-center px-4 gap-4 hover:bg-neutral-100 dark:hover:bg-neutral-700/30 transition-colors"
              >
                <div className="w-6 h-6 rounded bg-neutral-200 dark:bg-neutral-700" />
                <div className="h-2 w-28 bg-neutral-200 dark:bg-neutral-700 rounded" />
                <div className="h-2 w-36 bg-neutral-300 dark:bg-neutral-600 rounded" />
                <div className="h-2 w-16 bg-neutral-200 dark:bg-neutral-700 rounded ml-auto" />
              </div>
            ))}
          </div>

          {/* Large decorative elements */}
          <div className="grid gap-3">
            <div className="relative h-12 rounded-xl bg-gradient-to-r from-neutral-100 via-white to-neutral-100 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.25)] overflow-hidden">
              <div className="absolute inset-y-0 left-5 flex flex-col justify-center gap-2">
                <div className="h-1.5 w-20 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                <div className="h-1.5 w-14 rounded-full bg-neutral-300 dark:bg-neutral-600" />
              </div>
              <div className="absolute inset-y-0 right-6 flex items-center">
                <div className="h-6 w-6 rounded-full border border-neutral-200 dark:border-neutral-700" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 h-10 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 border border-neutral-200/60 dark:border-neutral-700/60 overflow-hidden">
                <div className="absolute inset-y-0 left-4 flex flex-col justify-center gap-1.5">
                  <div className="h-1.5 w-16 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                  <div className="h-1.5 w-12 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                </div>
                <div className="absolute inset-y-0 right-4 flex items-center gap-2">
                  <div className="h-2 w-10 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-2 w-6 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                </div>
              </div>
              <div className="relative w-full sm:w-24 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-1">
                      <div className="h-1.5 w-10 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                      <div className="h-1 w-8 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative footer elements */}
          <div className="flex flex-col gap-3">
            <div className="h-3 rounded-full bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-700 shadow-inner" />
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="h-2 w-full sm:w-20 rounded-full bg-neutral-200 dark:bg-neutral-700" />
              <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700" />
              <div className="h-2 w-full sm:w-10 rounded-full bg-neutral-200 dark:bg-neutral-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Animated Cursors */}
      {designersWithPositions.map((designer) => (
        <Cursor
          className="absolute transition-all duration-[2000ms] ease-in-out z-30"
          key={designer.id}
          style={{
            top: `${designer.position.y}%`,
            left: `${designer.position.x}%`,
          }}
        >
          <CursorPointer className={cn(designer.color.foreground)} />
          <CursorBody
            className={cn(
              designer.color.background,
              designer.color.foreground,
              'gap-1 px-3 py-2 shadow-xl'
            )}
          >
            <div className="flex items-center gap-2 !opacity-100">
              <div className={cn('w-5 h-5 rounded-full flex items-center justify-center')}>
                <Icon icon={designer.icon} className="h-5 w-5" />
              </div>
              <CursorName className="font-medium">{designer.name}</CursorName>
            </div>
            {designer.message && (
              <CursorMessage className="text-xs opacity-80">
                {designer.message}
              </CursorMessage>
            )}
          </CursorBody>
        </Cursor>
      ))}
    </div>
  );
};

export function UIDesignSection() {
  const features = [
    {
      icon: 'lucide:palette',
      title: 'UI/UX Дизайн',
      description: 'Создание интуитивных и красивых интерфейсов',
    },
    {
      icon: 'lucide:layers',
      title: 'Дизайн-системы',
      description: 'Разработка масштабируемых компонентных систем',
    },
    {
      icon: 'lucide:smartphone',
      title: 'Адаптивность',
      description: 'Оптимизация для всех типов устройств',
    },
    {
      icon: 'lucide:zap',
      title: 'Прототипирование',
      description: 'Интерактивные прототипы высокой точности',
    },
  ];

  const tools = [
    { name: 'Figma', icon: 'simple-icons:figma' },
    { name: 'Adobe XD', icon: 'simple-icons:adobexd' },
    { name: 'Sketch', icon: 'simple-icons:sketch' },
    { name: 'Framer', icon: 'simple-icons:framer' },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left - Content */}
          <div
            className="space-y-8 order-2 lg:order-1"
          >
            {/* Badge */}
            <div
              className="inline-block"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-700">
                <Icon icon="lucide:paintbrush" className="h-4 w-4" />
                <span className="text-sm font-medium">UI/UX Дизайн</span>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                  Дизайн, который
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-500 dark:from-neutral-200 dark:via-neutral-300 dark:to-neutral-500">
                  вдохновляет
                </span>
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Создаем пользовательские интерфейсы, которые не только красиво выглядят,
                но и решают реальные задачи бизнеса. Наши дизайнеры работают в команде,
                создавая продуманные и современные решения.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                    <Icon icon={feature.icon} className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
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

            {/* Design Tools */}
            <div
              className="pt-4"
            >
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Инструменты дизайна
              </p>
              <div className="flex flex-wrap gap-3">
                {tools.map((tool, index) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-shadow"
                  >
                    <Icon icon={tool.icon} className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Interactive Design Canvas */}
          <div
            className="order-1 lg:order-2"
          >
            <DesignCanvas />
          </div>
        </div>

        {/* Stats */}
        <div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '50+', label: 'Разработанных экранов' },
            { value: '50+', label: 'Дизайн-систем' },
            { value: '98%', label: 'Удовлетворенность' },
            { value: '24/7', label: 'Поддержка' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
