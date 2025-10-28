import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Logo } from '@/components/logo';

export function Footer() {
  const navigation = {
    services: [
      { name: 'Веб-разработка', href: '/#web-development' },
      { name: 'Мобильная разработка', href: '/#mobile-development' },
      { name: 'Облачные решения', href: '/#cloud-solutions' },
      { name: 'Консалтинг', href: '/#contact' },
    ],
    company: [
      { name: 'О нас', href: '/about' },
      { name: 'Карьера', href: '/careers' },
      { name: 'Проекты', href: '/projects' },
    ],
    support: [
      { name: 'Документация', href: '#' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Поддержка', href: '/#contact' },
      { name: 'Контакты', href: '/#contact' },
    ],
    legal: [
      { name: 'Политика конфиденциальности', href: '/privacy' },
      { name: 'Условия использования', href: '/terms' },
      { name: 'Cookies', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { name: 'Telegram', icon: 'simple-icons:telegram', href: 'https://t.me/NGSOFT_bot', color: 'hover:text-[#0088cc]' },
    { name: 'WhatsApp', icon: 'simple-icons:whatsapp', href: 'https://wa.me/79256822620', color: 'hover:text-[#25D366]' },
    { name: 'GitHub', icon: 'simple-icons:github', href: 'https://github.com/vaces8v/ng-soft-landing', color: 'hover:text-[#181717] dark:hover:text-white' },
    { name: 'VK', icon: 'simple-icons:vk', href: 'https://vk.com/ng_soft', color: 'hover:text-[#181717] dark:hover:text-white' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div>
                <Link href="/" className="inline-flex items-center gap-[6px] mb-4 group">
                  <Logo
                    size={32}
                    className="text-neutral-900 dark:text-white group-hover:scale-110 transition-transform"
                  />
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400">
                    NG-Soft
                  </span>
                </Link>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 max-w-sm">
                  Современные решения для вашего бизнеса. Разработка веб и мобильных приложений,
                  облачные технологии и консалтинг.
                </p>
                {/* Social Links */}
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      className={`w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center transition-colors ${social.color}`}
                      aria-label={social.name}
                    >
                      <Icon icon={social.icon} className="h-5 w-5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">
                Услуги
              </h3>
              <ul className="space-y-3">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">
                Компания
              </h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">
                Поддержка
              </h3>
              <ul className="space-y-3">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">
                Контакты
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon icon="lucide:mail" className="h-4 w-4 text-neutral-600 dark:text-neutral-400 mt-0.5 flex-shrink-0" />
                  <a href="mailto:feedback@ng-soft.ru" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    feedback@ng-soft.ru
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="lucide:phone" className="h-4 w-4 text-neutral-600 dark:text-neutral-400 mt-0.5 flex-shrink-0" />
                  <a href="tel:+74956822620" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    +7 (495) 682-26-20
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="lucide:map-pin" className="h-4 w-4 text-neutral-600 dark:text-neutral-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    1-я Мытищинская улица, 28с1, Москва, 129626
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div
              className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2"
            >
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <p
              className="text-xs text-neutral-600 dark:text-neutral-400"
            >
              © 2025 NG-Soft. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
