'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setShowBanner(false);
  };

  const handleDeclineAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setShowSettings(false);
    setShowBanner(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Necessary cookies cannot be disabled
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      {/* Cookie Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xl"
          >
            <div className="relative overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-lg">
              <div className="px-6 py-3">
                <div className="flex items-center justify-between gap-4">
                  {/* Icon + Text */}
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon icon="lucide:cookie" className="h-4 w-4 text-neutral-700 dark:text-neutral-300 flex-shrink-0" />
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                      Мы используем cookie для улучшения работы сайта
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleDeclineAll}
                      className="h-7 text-xs rounded-full px-3"
                    >
                      Отклонить
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={handleAcceptAll}
                      className="h-7 text-xs rounded-full px-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900"
                    >
                      Принять
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowSettings(true)}
                      className="h-7 text-xs rounded-full px-3"
                    >
                      <Icon icon="lucide:settings" className="h-3.5 w-3.5 mr-1.5" />
                      Настройки
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Icon icon="lucide:cookie" className="h-5 w-5" />
              Настройки cookie
            </DialogTitle>
            <DialogDescription>
              Управляйте своими предпочтениями относительно использования файлов cookie. 
              Обратите внимание, что отключение некоторых типов cookie может повлиять на работу сайта.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Necessary Cookies */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:shield-check" className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                    <h4 className="font-semibold text-neutral-900 dark:text-white">
                      Необходимые cookie
                    </h4>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Эти файлы cookie необходимы для работы сайта и не могут быть отключены.
                  </p>
                </div>
                <Switch
                  checked={preferences.necessary}
                  disabled
                />
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:bar-chart-3" className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                    <h4 className="font-semibold text-neutral-900 dark:text-white">
                      Аналитические cookie
                    </h4>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Помогают нам понять, как посетители взаимодействуют с сайтом, собирая анонимную информацию.
                  </p>
                </div>
                <Switch
                  checked={preferences.analytics}
                  onCheckedChange={() => togglePreference('analytics')}
                />
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:megaphone" className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                    <h4 className="font-semibold text-neutral-900 dark:text-white">
                      Маркетинговые cookie
                    </h4>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Используются для отслеживания посетителей на разных сайтах с целью показа релевантной рекламы.
                  </p>
                </div>
                <Switch
                  checked={preferences.marketing}
                  onCheckedChange={() => togglePreference('marketing')}
                />
              </div>
            </div>

            {/* Preferences Cookies */}
            <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:sliders-horizontal" className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                    <h4 className="font-semibold text-neutral-900 dark:text-white">
                      Функциональные cookie
                    </h4>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Позволяют сайту запоминать ваши предпочтения (язык, регион) для персонализации.
                  </p>
                </div>
                <Switch
                  checked={preferences.preferences}
                  onCheckedChange={() => togglePreference('preferences')}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowSettings(false)}
              className="w-full sm:w-auto"
            >
              Отмена
            </Button>
            <Button
              onClick={handleSavePreferences}
              className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900"
            >
              <Icon icon="lucide:check" className="h-4 w-4 mr-0" />
              Сохранить настройки
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
