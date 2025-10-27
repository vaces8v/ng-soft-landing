'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Неверный email или пароль');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (error) {
      setError('Произошла ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 border border-neutral-200 dark:border-neutral-800">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-200 mb-4">
              <Icon
                icon="lucide:shield-check"
                className="h-8 w-8 text-white dark:text-neutral-900"
              />
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
              Админ-панель
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Войдите для доступа к управлению
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2">
                <Icon
                  icon="lucide:alert-circle"
                  className="h-5 w-5 text-red-600 dark:text-red-400"
                />
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-neutral-700 dark:text-neutral-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@ng-soft.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="mt-2 bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-neutral-700 dark:text-neutral-300">
                Пароль
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="mt-2 bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-200 text-white dark:text-neutral-900 hover:shadow-lg transition-all"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:loader-2" className="h-4 w-4 animate-spin" />
                  <span>Вход...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:log-in" className="h-4 w-4" />
                  <span>Войти</span>
                </div>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <p className="text-xs text-center text-neutral-500 dark:text-neutral-400">
              Защищенная зона. Только для авторизованных пользователей.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
