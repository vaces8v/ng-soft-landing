'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from '@/components/ui/drawer';

const projects = [
  {
    id: 1,
    title: 'Личный кабинет для ОАО «Волгограднефтемаш»',
    category: 'web',
    categoryName: 'Веб-разработка',
    description: 'Личный кабинет для управления профилем и документами',
    image: 'lucide:user-circle',
    projectImage: '/projects/image1.png',
    technologies: ['WordPress', 'MySQL'],
    link: 'https://lk.vnm.ru/main/',
    fullDescription: 'Разработан удобный личный кабинет для сотрудников и партнеров ОАО «Волгограднефтемаш» с возможностью управления профилем, документами и доступом к информации.',
    challenge: 'Требовалось создать интуитивный интерфейс для работы с документами и обеспечить безопасность доступа к конфиденциальной информации.',
    solution: 'Использовали WordPress с кастомными плагинами для управления документами, реализовали систему ролей и прав доступа, интегрировали с корпоративной системой.',
    results: ['Удобный интерфейс управления документами', 'Безопасный доступ к информации', 'Интеграция с корпоративными системами']
  },
  {
    id: 2,
    title: 'Интернет-магазин для ООО «Торговый Дом Магистраль»',
    category: 'web',
    categoryName: 'Веб-разработка',
    description: 'Полнофункциональный интернет-магазин с каталогом товаров и системой заказов',
    image: 'lucide:shopping-bag',
    projectImage: '/projects/image2.png',
    technologies: ['WordPress', 'MySQL'],
    link: 'https://tdmmag.ru/',
    fullDescription: 'Создан современный интернет-магазин для ООО «Торговый Дом Магистраль» с полным каталогом товаров, системой управления заказами и интеграцией платежных систем.',
    challenge: 'Необходимо было создать удобный каталог товаров, обеспечить быстрый поиск и интегрировать платежные системы.',
    solution: 'Использовали WordPress с WooCommerce, оптимизировали производительность, интегрировали популярные платежные системы и системы доставки.',
    results: ['Каталог товаров', 'Увеличение заказов', 'Интеграция с платежными системами']
  },
  {
    id: 3,
    title: 'Интернет-магазин для ООО «МОССТАЛЬ»',
    category: 'web',
    categoryName: 'Веб-разработка',
    description: 'Интернет-магазин для продажи строительных материалов и металлопроката',
    image: 'lucide:shopping-bag',
    projectImage: '/projects/image3.png ',
    technologies: ['WordPress', 'MySQL'],
    link: '',
    fullDescription: 'Разработан специализированный интернет-магазин для ООО «МОССТАЛЬ» с каталогом строительных материалов, системой расчета стоимости и доставки.',
    challenge: 'Требовалось создать удобный каталог с фильтрацией по характеристикам, реализовать систему расчета доставки и интегрировать с системой управления складом.',
    solution: 'Использовали WordPress с расширенными плагинами для фильтрации, реализовали калькулятор доставки, интегрировали с системой управления складом.',
    results: ['Каталог товаров', 'Увеличение выручки', 'Автоматизация расчета доставки']
  },
  {
    id: 4,
    title: 'Сайт для ООО «КА-ТРАНС»',
    category: 'web',
    categoryName: 'Веб-разработка',
    description: 'Корпоративный сайт транспортной компании с информацией об услугах',
    image: 'lucide:truck',
    projectImage: '/projects/image4.png',
    technologies: ['WordPress', 'MySQL'],
    link: 'https://ka-trans.ru/',
    fullDescription: 'Создан профессиональный корпоративный сайт для ООО «КА-ТРАНС» с информацией об услугах доставки, портфолио и формой обратной связи.',
    challenge: 'Требовалось создать привлекательный сайт, который бы демонстрировал профессионализм компании и привлекал новых клиентов.',
    solution: 'Использовали WordPress с красивыми шаблонами, оптимизировали для SEO, добавили форму заявки и интеграцию с CRM.',
    results: ['Привлечение лидов', 'Улучшение видимости в поиске', 'Увеличение узнаваемости бренда']
  },
  {
    id: 5,
    title: 'Интернет-магазин для ООО «ТПК Кристи»',
    category: 'web',
    categoryName: 'Веб-разработка',
    description: 'Интернет-магазин для продажи кристаллов и минералов',
    image: 'lucide:shopping-bag',
    projectImage: '/projects/image5.png',
    technologies: ['WordPress', 'MySQL'],
    link: '',
    fullDescription: 'Разработан красивый интернет-магазин для ООО «ТПК Кристи» с галереей изображений кристаллов, описанием свойств и системой заказов.',
    challenge: 'Требовалось создать визуально привлекательный магазин с качественными фотографиями, удобной навигацией и системой фильтрации.',
    solution: 'Использовали WordPress с оптимизацией для изображений, реализовали галерею с лайтбоксом, добавили детальные фильтры по характеристикам.',
    results: ['Каталог товаров', 'Увеличение заказов', 'Улучшение видимости в поиске']
  },
  {
    id: 6,
    title: 'Сайт для транспортной компании «Полярная Стрела»',
    category: 'web',
    categoryName: 'Веб-разработка',
    description: 'Корпоративный сайт с информацией об услугах доставки и отслеживанием грузов',
    image: 'lucide:map-pin',
    projectImage: '/projects/image6.png',
    technologies: ['WordPress', 'MySQL'],
    link: 'https://polarstar.su/',
    fullDescription: 'Создан профессиональный сайт для транспортной компании «Полярная Стрела» с информацией об услугах, маршрутах доставки и системой отслеживания грузов.',
    challenge: 'Требовалось создать сайт, который бы демонстрировал надежность компании и позволял клиентам отслеживать свои грузы в реальном времени.',
    solution: 'Использовали WordPress с интеграцией системы отслеживания, добавили интерактивную карту маршрутов, реализовали форму расчета стоимости доставки.',
    results: ['Система отслеживания грузов', 'Увеличение клиентской базы', 'Улучшение коммуникации с клиентами']
  },
];

const categories = [
  { id: 'all', name: 'Все проекты', icon: 'lucide:grid-3x3' },
  { id: 'web', name: 'Веб-разработка', icon: 'lucide:code-2' },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
                    {/* Project Image Background */}
                    <div className="relative h-48 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                      {project.projectImage ? (
                        <>
                          <img
                            src={project.projectImage}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 flex items-center justify-center">
                          <Icon icon={project.image} className="h-16 w-16 text-neutral-400 dark:text-neutral-600" />
                        </div>
                      )}
                      
                      {/* Category Badge - Positioned on image */}
                      <div className="absolute top-4 left-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border border-white/20 dark:border-neutral-700/20">
                          <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                            {project.categoryName}
                          </span>
                        </div>
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
                    </div>

                    {/* View Project Link */}
                    <div className="px-8 pb-8">
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setIsDrawerOpen(true);
                        }}
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white hover:gap-3 transition-all group/link cursor-pointer"
                      >
                        <span>Подробнее</span>
                        <Icon icon="lucide:arrow-right" className="h-4 w-4" />
                      </button>
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
                    <Icon icon="lucide:arrow-right" className="h-5 w-5" />
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

      {/* Project Details Drawer */}
      <Drawer direction='right' open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="bg-white dark:bg-neutral-900 flex flex-col">
          {selectedProject && (
            <>
              <DrawerHeader className="border-b border-neutral-200 dark:border-neutral-800 sticky top-0 bg-white dark:bg-neutral-900 z-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <DrawerTitle className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                      {selectedProject.title}
                    </DrawerTitle>
                    <DrawerDescription className="text-base text-neutral-600 dark:text-neutral-400">
                      {selectedProject.categoryName}
                    </DrawerDescription>
                  </div>
                  <DrawerClose className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors flex-shrink-0">
                    <Icon icon="lucide:x" className="h-6 w-6" />
                  </DrawerClose>
                </div>
              </DrawerHeader>

              <div className="overflow-y-auto flex-1">
                <div className="p-6 space-y-8">
                  {/* Project Image */}
                  {selectedProject.projectImage && (
                    <div className="w-full h-48 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                      <img 
                        src={selectedProject.projectImage} 
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Project Category */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
                      <Icon icon={selectedProject.image} className="h-8 w-8 text-neutral-700 dark:text-neutral-300" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1 uppercase tracking-wide">Категория</p>
                      <p className="text-base font-semibold text-neutral-900 dark:text-white">{selectedProject.categoryName}</p>
                    </div>
                  </div>

                  {/* Main Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">О проекте</h3>
                    <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  {/* Challenge */}
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                      <Icon icon="lucide:alert-circle" className="h-5 w-5 text-orange-500" />
                      Задача
                    </h3>
                    <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                      <Icon icon="lucide:lightbulb" className="h-5 w-5 text-yellow-500" />
                      Решение
                    </h3>
                    <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>

                  {/* Results */}
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                      <Icon icon="lucide:check-circle-2" className="h-5 w-5 text-green-500" />
                      Результаты
                    </h3>
                    <ul className="space-y-2">
                      {selectedProject.results.map((result, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Icon icon="lucide:check" className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-base text-neutral-600 dark:text-neutral-400">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="pt-4 space-y-3">
                    {selectedProject.link && (
                      <Button
                        asChild
                        size="lg"
                        className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900"
                      >
                        <Link href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                          Посетить сайт проекта
                          <Icon icon="lucide:external-link" className="h-5 w-5" />
                        </Link>
                      </Button>
                    )}
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="w-full border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      <Link href="/#contact">
                        Обсудить похожий проект
                        <Icon icon="lucide:arrow-right" className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DrawerContent>
      </Drawer>
      <Footer />
    </>
  );
}
