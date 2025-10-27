'use client';

import { Icon } from '@iconify/react';
import { useRef } from 'react';
import { AnimatedBeam } from '@/components/ui/shadcn-io/animated-beam';

const CloudIcon = ({ icon, label }: { icon: string; label: string }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-neutral-50/70 to-neutral-100/70 dark:from-neutral-800/70 dark:to-neutral-900/70 backdrop-blur-3xl flex items-center justify-center border border-neutral-300/50 dark:border-neutral-700/50 shadow-2xl">
        <div className="absolute inset-0 rounded-xl bg-white/60 dark:bg-black/60 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/80 to-transparent dark:from-white/10 dark:to-transparent backdrop-blur-2xl"></div>
        <Icon icon={icon} className="h-8 w-8 text-neutral-700 dark:text-neutral-300 relative z-10 drop-shadow-lg" />
      </div>
      <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium text-center">
        {label}
      </span>
    </div>
  );
};

export function CloudSolutionsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<HTMLDivElement>(null);
  const apiGatewayRef = useRef<HTMLDivElement>(null);
  const serverRef = useRef<HTMLDivElement>(null);
  const databaseRef = useRef<HTMLDivElement>(null);
  const cacheRef = useRef<HTMLDivElement>(null);
  const storageRef = useRef<HTMLDivElement>(null);
  const cdnRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <div
            className="space-y-6 order-2 lg:order-1"
          >
            {/* Badge */}
            <div
              className="inline-block"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-700">
                <Icon icon="lucide:cloud" className="h-4 w-4" />
                <span className="text-sm font-medium">Облачные решения</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                Масштабируемая
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-500 dark:from-neutral-200 dark:via-neutral-300 dark:to-neutral-500">
                инфраструктура
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Проектируем и внедряем облачные решения с высокой доступностью,
              автоматическим масштабированием и отказоустойчивостью.
              Миграция и оптимизация существующей инфраструктуры.
            </p>

            {/* Features */}
            <div className="space-y-4 pt-4">
              {[
                {
                  icon: 'lucide:server',
                  title: 'Микросервисная архитектура',
                  description: 'Гибкая и масштабируемая структура',
                },
                {
                  icon: 'lucide:shield-check',
                  title: 'Высокая доступность',
                  description: '99.9% uptime и отказоустойчивость',
                },
                {
                  icon: 'lucide:trending-up',
                  title: 'Автоматическое масштабирование',
                  description: 'Адаптация под нагрузку в реальном времени',
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

          {/* Right - Cloud Architecture Diagram */}
          <div
            className="relative order-1 lg:order-2"
          >
            <div
              ref={containerRef}
              className="relative w-full h-[500px] flex items-center justify-center"
            >
              {/* Client */}
              <div
                ref={clientRef}
                className="absolute top-0 left-1/2 -translate-x-1/2"
              >
                <CloudIcon icon="lucide:monitor-smartphone" label="Client" />
              </div>

              {/* API Gateway */}
              <div
                ref={apiGatewayRef}
                className="absolute top-[100px] left-1/2 -translate-x-1/2"
              >
                <CloudIcon icon="lucide:server-cog" label="API Gateway" />
              </div>

              {/* Server */}
              <div
                ref={serverRef}
                className="absolute top-[220px] left-1/2 -translate-x-1/2"
              >
                <CloudIcon icon="lucide:server" label="Application Server" />
              </div>

              {/* Database */}
              <div
                ref={databaseRef}
                className="absolute bottom-[60px] left-[15%]"
              >
                <CloudIcon icon="lucide:database" label="Database" />
              </div>

              {/* Cache */}
              <div
                ref={cacheRef}
                className="absolute bottom-[60px] left-1/2 -translate-x-1/2"
              >
                <CloudIcon icon="lucide:zap" label="Cache" />
              </div>

              {/* Storage */}
              <div
                ref={storageRef}
                className="absolute bottom-[60px] right-[15%]"
              >
                <CloudIcon icon="lucide:hard-drive" label="Storage" />
              </div>

              {/* CDN */}
              <div
                ref={cdnRef}
                className="absolute top-[100px] right-[10%]"
              >
                <CloudIcon icon="lucide:globe" label="CDN" />
              </div>

              {/* Animated Beams */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={clientRef}
                toRef={apiGatewayRef}
                curvature={0}
                gradientStartColor="#3b82f6"
                gradientStopColor="#8b5cf6"
                duration={30}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={apiGatewayRef}
                toRef={serverRef}
                curvature={0}
                gradientStartColor="#8b5cf6"
                gradientStopColor="#ec4899"
                delay={1}
                duration={30}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={serverRef}
                toRef={databaseRef}
                curvature={20}
                gradientStartColor="#ec4899"
                gradientStopColor="#ef4444"
                delay={2}
                duration={30}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={serverRef}
                toRef={cacheRef}
                curvature={0}
                gradientStartColor="#ec4899"
                gradientStopColor="#f59e0b"
                delay={2.5}
                duration={30}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={serverRef}
                toRef={storageRef}
                curvature={-20}
                gradientStartColor="#ec4899"
                gradientStopColor="#10b981"
                delay={3}
                duration={10}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={clientRef}
                toRef={cdnRef}
                curvature={30}
                gradientStartColor="#3b82f6"
                gradientStopColor="#06b6d4"
                delay={0.5}
                duration={40}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={cdnRef}
                toRef={apiGatewayRef}
                curvature={-20}
                gradientStartColor="#06b6d4"
                gradientStopColor="#8b5cf6"
                delay={1.5}
                duration={40}
              />
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div
          className="mt-20 text-center"
        >
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
            Облачные платформы и технологии
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: 'simple-icons:amazonaws', name: 'AWS' },
              { icon: 'simple-icons:googlecloud', name: 'Google Cloud' },
              { icon: 'simple-icons:microsoftazure', name: 'Azure' },
              { icon: 'simple-icons:docker', name: 'Docker' },
              { icon: 'simple-icons:kubernetes', name: 'Kubernetes' },
              { icon: 'simple-icons:terraform', name: 'Terraform' },
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
