'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

const services = [
  {
    title: 'Веб-разработка',
    href: '/#web-development',
    description: 'Создание современных веб-приложений и сайтов',
    icon: 'lucide:code-2',
  },
  {
    title: 'Мобильные приложения',
    href: '/#mobile-development',
    description: 'Разработка iOS и Android приложений',
    icon: 'lucide:smartphone',
  },
  {
    title: 'Облачные решения',
    href: '/#cloud-solutions',
    description: 'Миграция и поддержка облачной инфраструктуры',
    icon: 'lucide:cloud',
  },
  {
    title: 'Корпоративное ПО',
    href: '/#enterprise-software',
    description: 'CRM, ERP и системы управления',
    icon: 'lucide:building',
  },
  {
    title: 'UI/UX Дизайн',
    href: '/#ui-design',
    description: 'Современные интерфейсы и пользовательский опыт',
    icon: 'lucide:palette',
  },
  {
    title: 'Чат-боты',
    href: '/#chatbot',
    description: 'Автоматизация общения с клиентами',
    icon: 'lucide:bot',
  },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      const hash = window.location.hash;
      if (hash) {
        const timer = setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }, 100);
        
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const [path, hash] = href.split('#');
    const targetPath = path || '/';
    
    if (pathname !== targetPath) {
      return;
    }
    
    e.preventDefault();
    const element = document.querySelector('#' + hash);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2"
          >
            <Link href="/" className="flex items-center gap-[6px] group">
              <Logo 
                size={32} 
                className="text-neutral-900 dark:text-white group-hover:scale-110 transition-transform" 
              />
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-400">
                NG-Soft
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6"
          >
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center">
                    <Icon icon="lucide:grid-3x3" className="h-4 w-4 mr-2" />
                    <span>Услуги</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                      {services.map((service) => (
                        <li key={service.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={service.href}
                              onClick={(e) => scrollToSection(e, service.href)}
                              className={cn(
                                'block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors',
                                'hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white',
                                'focus:bg-neutral-100 dark:focus:bg-neutral-800'
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                                  <Icon
                                    icon={service.icon}
                                    className="h-5 w-5 text-neutral-700 dark:text-neutral-300"
                                  />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold leading-none mb-1">
                                    {service.title}
                                  </div>
                                  <p className="text-xs leading-snug text-neutral-600 dark:text-neutral-400">
                                    {service.description}
                                  </p>
                                </div>
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/projects"
                      className={cn(navigationMenuTriggerStyle(), 'flex items-center cursor-pointer')}
                    >
                      <Icon icon="lucide:briefcase" className="h-4 w-4 mr-2" />
                      <span className="mb-1">Проекты</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="about"
                      className={cn(navigationMenuTriggerStyle(), 'flex items-center cursor-pointer')}
                    >
                      <Icon icon="lucide:info" className="h-4 w-4 mr-2" />
                      <span className="mb-1">О нас</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a
                      href="#contact"
                      className={cn(navigationMenuTriggerStyle(), 'flex items-center cursor-pointer')}
                      onClick={(e) => scrollToSection(e, '#contact')}
                    >
                      <Icon icon="lucide:mail" className="h-4 w-4 mr-2" />
                      <span className="mb-1">Контакты</span>
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <ThemeToggle />

            <Link
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="px-5 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-medium text-sm transition-colors shadow-sm"
            >
              Начать проект
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-3"
          >
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button 
                  className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  aria-label="Открыть меню"
                >
                  <Icon icon="lucide:menu" className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col">
                <SheetHeader className="flex-shrink-0">
                  <SheetTitle className="flex items-center gap-3">
                    <Logo 
                      size={32} 
                      className="text-neutral-900 dark:text-white" 
                    />
                    <span>NG-Soft</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 mt-8 overflow-y-auto flex-1 pr-2">
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-3 px-2">
                      Услуги
                    </h3>
                    <div className="space-y-1">
                      {services.map((service) => (
                        <a
                          key={service.title}
                          href={service.href}
                          onClick={(e) => {
                            scrollToSection(e, service.href);
                            setIsOpen(false);
                          }}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                            <Icon icon={service.icon} className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                              {service.title}
                            </div>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400">
                              {service.description}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 border-t border-neutral-200 dark:border-neutral-800 pt-4">
                    <Link
                      href="/projects"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <Icon icon="lucide:briefcase" className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">Проекты</span>
                    </Link>
                    <Link
                      href="about"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <Icon icon="lucide:info" className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">О нас</span>
                    </Link>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        scrollToSection(e, '#contact');
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <Icon icon="lucide:mail" className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">Контакты</span>
                    </a>
                  </div>

                  <Link
                    href="#contact"
                    onClick={(e) => {
                      scrollToSection(e, '#contact');
                      setIsOpen(false);
                    }}
                    className="w-full px-5 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-medium text-sm transition-colors shadow-sm text-center"
                  >
                    Начать проект
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
