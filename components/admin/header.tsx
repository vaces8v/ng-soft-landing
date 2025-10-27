'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

interface AdminHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/admin',
      label: 'Дашборд',
      icon: 'lucide:layout-dashboard',
    },
    {
      href: '/admin/applications',
      label: 'Заявки',
      icon: 'lucide:inbox',
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-200 flex items-center justify-center">
              <Icon
                icon="lucide:shield-check"
                className="h-5 w-5 text-white dark:text-neutral-900"
              />
            </div>
            <span className="font-bold text-lg text-neutral-900 dark:text-white">
              Админ-панель
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <Icon icon={item.icon} className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <div className="hidden md:flex items-center gap-3 pl-3 border-l border-neutral-200 dark:border-neutral-800">
              <div className="text-right">
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {user.email}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="gap-2"
              >
                <Icon icon="lucide:log-out" className="h-4 w-4" />
                Выйти
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-1 pb-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                  isActive
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Icon icon={item.icon} className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
