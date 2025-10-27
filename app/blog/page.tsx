import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const articles = [
  {
    id: 1,
    title: 'Как выбрать технологический стек для веб-приложения',
    excerpt: 'Разбираем критерии выбора технологий для разработки современных веб-приложений и делимся опытом.',
    category: 'Разработка',
    icon: 'lucide:code-2',
    date: '15 марта 2024',
    readTime: '8 мин',
  },
  {
    id: 2,
    title: 'Микросервисная архитектура: плюсы и минусы',
    excerpt: 'Когда стоит переходить на микросервисы, а когда лучше оставаться с монолитом.',
    category: 'Архитектура',
    icon: 'lucide:boxes',
    date: '10 марта 2024',
    readTime: '12 мин',
  },
  {
    id: 3,
    title: 'DevOps практики для малого бизнеса',
    excerpt: 'Как внедрить CI/CD и автоматизацию даже с ограниченными ресурсами.',
    category: 'DevOps',
    icon: 'lucide:git-branch',
    date: '5 марта 2024',
    readTime: '10 мин',
  },
  {
    id: 4,
    title: 'Безопасность веб-приложений в 2024',
    excerpt: 'Актуальные угрозы и методы защиты современных веб-приложений.',
    category: 'Безопасность',
    icon: 'lucide:shield',
    date: '28 февраля 2024',
    readTime: '15 мин',
  },
  {
    id: 5,
    title: 'TypeScript: почему мы выбираем строгую типизацию',
    excerpt: 'Преимущества TypeScript в крупных проектах и советы по миграции.',
    category: 'Разработка',
    icon: 'lucide:file-code',
    date: '20 февраля 2024',
    readTime: '7 мин',
  },
  {
    id: 6,
    title: 'Оптимизация производительности React приложений',
    excerpt: 'Практические советы по ускорению React приложений и улучшению UX.',
    category: 'Frontend',
    icon: 'lucide:zap',
    date: '12 февраля 2024',
    readTime: '11 мин',
  },
];

const categories = [
  'Все статьи',
  'Разработка',
  'Архитектура',
  'DevOps',
  'Безопасность',
  'Frontend',
];

export default function BlogPage() {
  return (
    <>
      <Header />

      <main className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-neutral-950">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.05),_transparent_50%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_50%)]" />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              {/* Badge */}
              <div className="inline-block">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-700">
                  <Icon icon="lucide:book-open" className="h-4 w-4" />
                  <span className="text-sm font-medium">Блог</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                  Знания и опыт
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Делимся экспертизой в разработке, архитектуре и современных технологиях
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="relative py-12 border-y border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    index === 0
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="relative py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="group relative rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 overflow-hidden hover:shadow-xl dark:hover:shadow-2xl"
                >
                  <div className="p-8">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon icon={article.icon} className="h-7 w-7" />
                    </div>

                    {/* Category */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-4">
                      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        {article.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {article.date}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                        <Icon icon="lucide:clock" className="h-3.5 w-3.5" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/5 to-transparent dark:from-neutral-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="relative py-24 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-12 md:p-16">
              <Icon icon="lucide:mail" className="h-12 w-12 mx-auto mb-6 text-neutral-700 dark:text-neutral-300" />
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                  Подпишитесь на рассылку
                </span>
              </h2>
              
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                Получайте новые статьи и обновления прямо на почту
              </p>

              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 text-neutral-900 dark:text-white placeholder:text-neutral-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors whitespace-nowrap"
                >
                  Подписаться
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
