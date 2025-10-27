'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const projects = [
  {
    id: 1,
    title: 'Корпоративная CRM-система',
    category: 'enterprise',
    categoryName: 'Корпоративное ПО',
    description: 'Комплексная CRM-система для управления клиентами и продажами с интеграцией 1С и IP-телефонии',
    image: 'lucide:building-2',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    year: '2024',
    duration: '6 месяцев',
    team: '8 специалистов',
    link: '#',
    stats: {
      users: '500+',
      efficiency: '+65%',
      roi: '18 мес'
    }
  },
  {
    id: 2,
    title: 'Интернет-магазин электроники',
    category: 'web',
    categoryName: 'Веб-разработка',
    description: 'Высоконагруженный маркетплейс с системой рекомендаций и интеграцией платежных систем',
    image: 'lucide:shopping-cart',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'AWS'],
    year: '2024',
    duration: '4 месяца',
    team: '6 специалистов',
    link: '#',
    stats: {
      orders: '10K+',
      conversion: '+45%',
      uptime: '99.9%'
    }
  },
  {
    id: 3,
    title: 'Мобильный банк',
    category: 'mobile',
    categoryName: 'Мобильные приложения',
    description: 'Безопасное банковское приложение с биометрией и P2P переводами',
    image: 'lucide:smartphone',
    technologies: ['React Native', 'Node.js', 'MongoDB'],
    year: '2023',
    duration: '8 месяцев',
    team: '10 специалистов',
    link: '#',
    stats: {
      users: '50K+',
      rating: '4.8★',
      transactions: '1M+'
    }
  },
  {
    id: 4,
    title: 'AI-помощник для поддержки',
    category: 'ai',
    categoryName: 'AI & ML',
    description: 'Интеллектуальный чат-бот с обработкой естественного языка и машинным обучением',
    image: 'lucide:bot',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'OpenAI'],
    year: '2024',
    duration: '5 месяцев',
    team: '5 специалистов',
    link: '#',
    stats: {
      requests: '5K/day',
      accuracy: '94%',
      response: '< 2s'
    }
  },
  {
    id: 5,
    title: 'Платформа онлайн-обучения',
    category: 'web',
    categoryName: 'Веб-разработка',
    description: 'LMS-платформа с вебинарами, тестированием и системой сертификации',
    image: 'lucide:graduation-cap',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'WebRTC'],
    year: '2023',
    duration: '7 месяцев',
    team: '9 специалистов',
    link: '#',
    stats: {
      students: '20K+',
      courses: '500+',
      completion: '78%'
    }
  },
  {
    id: 6,
    title: 'Система складского учета',
    category: 'enterprise',
    categoryName: 'Корпоративное ПО',
    description: 'WMS с автоматизацией инвентаризации и интеграцией со сканерами',
    image: 'lucide:warehouse',
    technologies: ['Angular', '.NET', 'SQL Server', 'SignalR'],
    year: '2023',
    duration: '9 месяцев',
    team: '7 специалистов',
    link: '#',
    stats: {
      warehouses: '15',
      items: '100K+',
      accuracy: '99.5%'
    }
  },
  {
    id: 7,
    title: 'Приложение для фитнеса',
    category: 'mobile',
    categoryName: 'Мобильные приложения',
    description: 'Персональный тренер в кармане с планами тренировок и трекингом питания',
    image: 'lucide:activity',
    technologies: ['Flutter', 'Firebase', 'HealthKit'],
    year: '2024',
    duration: '3 месяца',
    team: '4 специалиста',
    link: '#',
    stats: {
      users: '30K+',
      workouts: '500K+',
      rating: '4.9★'
    }
  },
  {
    id: 8,
    title: 'Облачное хранилище',
    category: 'cloud',
    categoryName: 'Облачные решения',
    description: 'Корпоративное файловое хранилище с шифрованием и совместной работой',
    image: 'lucide:cloud',
    technologies: ['React', 'Go', 'MinIO', 'Kubernetes'],
    year: '2023',
    duration: '6 месяцев',
    team: '8 специалистов',
    link: '#',
    stats: {
      storage: '10TB+',
      users: '1K+',
      speed: '100MB/s'
    }
  },
  {
    id: 9,
    title: 'IoT-платформа для умного дома',
    category: 'iot',
    categoryName: 'IoT',
    description: 'Система управления умным домом с голосовым управлением и автоматизацией',
    image: 'lucide:home',
    technologies: ['React', 'MQTT', 'Node.js', 'Zigbee'],
    year: '2024',
    duration: '10 месяцев',
    team: '12 специалистов',
    link: '#',
    stats: {
      devices: '50+',
      homes: '2K+',
      automation: '95%'
    }
  },
];

const categories = [
  { id: 'all', name: 'Все проекты', icon: 'lucide:grid-3x3' },
  { id: 'web', name: 'Веб-разработка', icon: 'lucide:code-2' },
  { id: 'mobile', name: 'Мобильные', icon: 'lucide:smartphone' },
  { id: 'enterprise', name: 'Корпоративное ПО', icon: 'lucide:building' },
  { id: 'cloud', name: 'Облачные', icon: 'lucide:cloud' },
  { id: 'ai', name: 'AI & ML', icon: 'lucide:brain' },
  { id: 'iot', name: 'IoT', icon: 'lucide:cpu' },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />

      <main className="relative min-h-screen w-full bg-white dark:bg-neutral-950">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(163 163 163 / 0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <Icon icon="lucide:briefcase" className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Наши работы</span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white"
              >
                Реализованные проекты
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
              >
                Успешные решения для бизнеса различных масштабов и индустрий
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto pt-8"
              >
                {[
                  { number: '50+', label: 'Проектов' },
                  { number: '30+', label: 'Клиентов' },
                  { number: '5+', label: 'Лет опыта' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="sticky top-16 z-40 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-lg border-y border-neutral-200 dark:border-neutral-800">
          <div className="container mx-auto px-4 md:px-6 py-6">
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-6">
              <div className="relative">
                <Icon 
                  icon="lucide:search" 
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400"
                />
                <input
                  type="text"
                  placeholder="Поиск проектов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700 transition-all"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                      : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                  }`}
                >
                  <Icon icon={category.icon} className="h-4 w-4" />
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="relative py-16">
          <div className="container mx-auto px-4 md:px-6">
            {/* Results Count */}
            <div className="mb-8">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Найдено проектов: <span className="font-semibold text-neutral-900 dark:text-white">{filteredProjects.length}</span>
              </p>
            </div>

            {/* Projects Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group relative flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 overflow-hidden hover:shadow-lg"
                  >
                    {/* Project Icon/Image */}
                    <div className="relative p-8 pb-6 bg-neutral-50 dark:bg-neutral-800/50">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-16 h-16 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon icon={project.image} className="h-8 w-8 text-neutral-700 dark:text-neutral-300" />
                        </div>
                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                          {project.year}
                        </span>
                      </div>

                      {/* Category Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                        <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                          {project.categoryName}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="flex-1 p-8 pt-6">
                      {/* Title */}
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
                        {Object.entries(project.stats).map(([key, value], idx) => (
                          <div key={idx}>
                            <div className="text-base font-bold text-neutral-900 dark:text-white">
                              {value}
                            </div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">
                              {key}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Project Info */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                          <Icon icon="lucide:clock" className="h-3.5 w-3.5" />
                          <span>{project.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                          <Icon icon="lucide:users" className="h-3.5 w-3.5" />
                          <span>{project.team}</span>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View Project Link */}
                    <div className="px-8 pb-8">
                      <Link
                        href={project.link}
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white hover:gap-3 transition-all group/link"
                      >
                        <span>Подробнее</span>
                        <Icon icon="lucide:arrow-right" className="h-4 w-4" />
                      </Link>
                    </div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-neutral-900/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <Icon icon="lucide:search-x" className="h-16 w-16 mx-auto mb-4 text-neutral-300 dark:text-neutral-700" />
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                  Проекты не найдены
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Попробуйте изменить фильтры или поисковый запрос
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neutral-900 dark:bg-white mb-6">
                <Icon icon="lucide:sparkles" className="h-8 w-8 text-white dark:text-neutral-900" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
                Готовы начать свой проект?
              </h2>
              
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
                Расскажите нам о вашей идее, и мы поможем воплотить её в жизнь
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 px-8 py-6 text-base"
                >
                  <Link href="/#contact">
                    Обсудить проект
                    <Icon icon="lucide:arrow-right" className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 px-8 py-6 text-base"
                >
                  <Link href="/">
                    Главная страница
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
