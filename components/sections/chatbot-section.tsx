'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '@iconify/react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const chatScenario: Omit<Message, 'id' | 'timestamp'>[] = [
  { role: 'user', content: 'Здравствуйте! Мне нужна помощь с заказом.' },
  { role: 'assistant', content: 'Здравствуйте! Я помогу вам с вашим заказом. Назовите, пожалуйста, номер заказа.' },
  { role: 'user', content: 'Заказ №12345' },
  { role: 'assistant', content: 'Благодарю! Заказ №12345 найден. Он сейчас находится в пути и будет доставлен завтра до 18:00. Нужна дополнительная информация?' },
  { role: 'user', content: 'Можно изменить адрес доставки?' },
  { role: 'assistant', content: 'Конечно! Для изменения адреса доставки я переключу вас на оператора. Один момент...' },
];

const AutoChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isTyping]);

  useEffect(() => {
    if (currentIndex >= chatScenario.length) {
      const timeout = setTimeout(() => {
        setMessages([]);
        setCurrentIndex(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const delay = currentIndex === 0 ? 500 : 2000;
    const timeout = setTimeout(() => {
      setIsTyping(true);
      
      setTimeout(() => {
        const newMessage: Message = {
          ...chatScenario[currentIndex],
          id: currentIndex,
          timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        };
        
        setMessages(prev => [...prev, newMessage]);
        setIsTyping(false);
        setCurrentIndex(prev => prev + 1);
      }, 1000);
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div className="relative h-full w-full max-w-md mx-auto">
      <div className="relative flex flex-col h-[500px] rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 dark:from-neutral-200 dark:to-neutral-300 flex items-center justify-center">
                <Icon icon="lucide:bot" className="h-6 w-6 text-white dark:text-neutral-900" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-neutral-900 rounded-full"></div>
            </div>
            <div>
              <div className="font-semibold text-neutral-900 dark:text-white">
                Поддержка 24/7
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400">
                Онлайн
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              className="w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
              aria-label="Дополнительные опции чата"
            >
              <Icon icon="lucide:more-vertical" className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'flex',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm',
                    message.role === 'user'
                      ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-br-sm'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-bl-sm'
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <span className={cn(
                    'text-xs mt-1 block',
                    message.role === 'user' 
                      ? 'text-neutral-300 dark:text-neutral-600' 
                      : 'text-neutral-500 dark:text-neutral-400'
                  )}>
                    {message.timestamp}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Chat Input (Disabled) */}
        <div className="px-4 py-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-200 dark:bg-neutral-700 cursor-not-allowed opacity-60">
            <Icon icon="lucide:smile" className="h-5 w-5 text-neutral-400" />
            <input
              type="text"
              disabled
              placeholder="Демо режим - только просмотр"
              className="flex-1 bg-transparent outline-none text-sm text-neutral-600 dark:text-neutral-400 cursor-not-allowed"
            />
            <Icon icon="lucide:paperclip" className="h-5 w-5 text-neutral-400" />
            <div className="w-8 h-8 rounded-lg bg-neutral-300 dark:bg-neutral-600 flex items-center justify-center">
              <Icon icon="lucide:send" className="h-4 w-4 text-neutral-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function ChatbotSection() {
  const features = [
    {
      icon: 'lucide:message-circle',
      title: 'Автоматизация поддержки',
      description: 'Обработка до 80% запросов без участия операторов',
    },
    {
      icon: 'lucide:clock',
      title: '24/7 доступность',
      description: 'Работа круглосуточно без выходных и перерывов',
    },
    {
      icon: 'lucide:languages',
      title: 'Мультиязычность',
      description: 'Поддержка общения на нескольких языках',
    },
    {
      icon: 'lucide:zap',
      title: 'Быстрые ответы',
      description: 'Мгновенная реакция на запросы клиентов',
    },
  ];

  const platforms = [
    { name: 'Telegram', icon: 'simple-icons:telegram' },
    { name: 'WhatsApp', icon: 'simple-icons:whatsapp' },
    { name: 'VK', icon: 'simple-icons:vk' },
    { name: 'Viber', icon: 'simple-icons:viber' },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left - Chat Demo */}
          <div
            className="order-2 lg:order-1"
          >
            <AutoChat />
          </div>

          {/* Right - Content */}
          <div
            className="space-y-8 order-1 lg:order-2"
          >
            {/* Badge */}
            <div
              className="inline-block"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-700">
                <Icon icon="lucide:bot" className="h-4 w-4" />
                <span className="text-sm font-medium">Чат-боты</span>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                  Умные чат-боты
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-500 dark:from-neutral-200 dark:via-neutral-300 dark:to-neutral-500">
                  для вашего бизнеса
                </span>
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Разработка и интеграция интеллектуальных чат-ботов для автоматизации
                общения с клиентами. Повысьте качество сервиса и сократите нагрузку
                на операторов поддержки.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                    <Icon icon={feature.icon} className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
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

            {/* Platforms */}
            <div
              className="pt-4"
            >
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Интеграция с популярными платформами
              </p>
              <div className="flex flex-wrap gap-3">
                {platforms.map((platform, index) => (
                  <div
                    key={platform.name}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-shadow"
                  >
                    <Icon icon={platform.icon} className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      {platform.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '80%', label: 'Автоматизация запросов' },
            { value: '< 1 сек', label: 'Время ответа' },
            { value: '24/7', label: 'Доступность' },
            { value: '10+', label: 'Языков поддержки' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
