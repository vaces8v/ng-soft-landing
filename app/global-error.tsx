'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ru">
      <body>
        <main className="relative min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: '48px 48px',
            }} />
          </div>

          <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex justify-center"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 flex items-center justify-center shadow-xl">
                  <Icon 
                    icon="lucide:zap-off" 
                    className="w-16 h-16 md:w-20 md:h-20 text-red-600 dark:text-red-400" 
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-4"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
                  Критическая ошибка
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                  Произошла серьезная ошибка приложения. Попробуйте перезагрузить страницу.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-medium transition-colors"
                >
                  <Icon icon="lucide:refresh-cw" className="w-5 h-5" />
                  Попробовать снова
                </button>
                
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white font-medium transition-colors"
                >
                  <Icon icon="lucide:home" className="w-5 h-5" />
                  На главную
                </a>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </body>
    </html>
  );
}
