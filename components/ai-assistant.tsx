'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const FAQ_QUESTIONS = [
  'Какие услуги вы предоставляете?',
  'Сколько стоит разработка веб-приложения?',
  'Какие технологии вы используете?',
  'Как долго разрабатывается проект?',
  'Вы работаете с стартапами?',
  'Есть ли гарантия на код?',
  'Какой минимальный бюджет проекта?',
  'Вы делаете мобильные приложения?',
  'Как происходит процесс разработки?',
  'Можно ли изменять требования во время разработки?',
  'Вы предоставляете поддержку после запуска?',
  'Какой опыт у вашей команды?',
  'Как начать сотрудничество?',
  'Вы работаете удаленно?',
  'Какие сроки разработки MVP?',
  'Нужно ли мне иметь дизайн перед разработкой?',
  'Вы интегрируете сторонние сервисы?',
  'Как обеспечивается безопасность данных?',
  'Какой процесс тестирования?',
  'Вы делаете SEO оптимизацию?',
  'Какие CMS вы используете?',
  'Можно ли масштабировать приложение?',
  'Вы работаете с базами данных?',
  'Какая стоимость поддержки?',
  'Вы делаете интеграцию платежей?',
  'Какой процесс согласования дизайна?',
  'Вы используете облачные сервисы?',
  'Как происходит передача проекта?',
  'Вы делаете аналитику и отчеты?',
  'Какой минимальный срок проекта?',
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Привет! Я AI-ассистент NG-Soft. Чем могу помочь?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const [showFAQ, setShowFAQ] = useState(true);
  const [faqQuestions, setFaqQuestions] = useState<string[]>([]);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  const [inputSuggestions, setInputSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const faqTimersRef = useRef<NodeJS.Timeout[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearFaqTimers = () => {
    faqTimersRef.current.forEach(timer => clearInterval(timer));
    faqTimersRef.current = [];
  };

  // Инициализация FAQ при открытии чата
  useEffect(() => {
    if (isOpen && showFAQ && faqQuestions.length === 0) {
      const shuffled = [...FAQ_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 3);
      setFaqQuestions(shuffled);
    }
  }, [isOpen, showFAQ, faqQuestions.length]);

  // Функция для замены вопроса на рандомный (без повторений)
  const replaceQuestion = (indexToReplace: number) => {
    setFaqQuestions((current) => {
      // Находим вопросы, которые не используются сейчас
      const availableQuestions = FAQ_QUESTIONS.filter(q => !current.includes(q));
      if (availableQuestions.length === 0) return current;
      
      // Выбираем случайный из доступных
      const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      
      // Заменяем вопрос
      const newQuestions = [...current];
      newQuestions[indexToReplace] = randomQuestion;
      return newQuestions;
    });
  };

  // Таймеры для смены вопросов
  useEffect(() => {
    if (!showFAQ || faqQuestions.length === 0) return;

    // Очищаем старые таймеры
    clearFaqTimers();

    // Интервал для первого вопроса (каждые 10 сек)
    faqTimersRef.current.push(
      setInterval(() => replaceQuestion(0), 10000)
    );

    // Интервал для второго вопроса (каждые 25 сек)
    faqTimersRef.current.push(
      setInterval(() => replaceQuestion(1), 25000)
    );

    // Интервал для третьего вопроса (каждые 35 сек)
    faqTimersRef.current.push(
      setInterval(() => replaceQuestion(2), 35000)
    );
    return () => {
      clearFaqTimers();
    };
  }, [showFAQ, faqQuestions.length]);

  useEffect(() => {
    return () => {
      clearFaqTimers();
    };
  }, []);

  const sendQuickQuestion = async (question: string) => {
    const userMessage: Message = {
      role: 'user',
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setHasUserSentMessage(true);
    setInputSuggestions([]);
    setIsLoading(true);
    setIsWaitingResponse(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: question,
          history: messages.slice(-6).map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');

      if (!reader) {
        throw new Error('No reader available');
      }

      let accumulatedContent = '';
      let messageCreated = false;
      let assistantMessageIndex = messages.length + 1;

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        let chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;

        chunk = chunk.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
        if (!chunk) continue;

        if (!messageCreated) {
          setIsWaitingResponse(false);
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: '',
              timestamp: new Date(),
            },
          ]);
          messageCreated = true;
        }

        accumulatedContent += chunk;

        setMessages((prev) => {
          const newMessages = [...prev];
          if (newMessages[assistantMessageIndex]) {
            newMessages[assistantMessageIndex] = {
              role: 'assistant',
              content: accumulatedContent,
              timestamp: new Date(),
            };
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      setIsWaitingResponse(false);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Извините, произошла ошибка: ${errorMessage}\n\n🔧 Проверьте:\n• API ключ GROQ_API_KEY в .env\n• Интернет соединение\n• Консоль браузера (F12) для деталей`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsWaitingResponse(false);
    }
  };

  const handleFAQClick = (question: string) => {
    setShowFAQ(false);
    clearFaqTimers();
    void sendQuickQuestion(question);
  };

  const handleSuggestionClick = (question: string) => {
    void sendQuickQuestion(question);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setHasUserSentMessage(true);
    setInputSuggestions([]);
    if (showFAQ) {
      setShowFAQ(false);
      clearFaqTimers();
    }
    setIsLoading(true);
    setIsWaitingResponse(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          history: messages.slice(-6).map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      // Читаем stream с правильной обработкой UTF-8
      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');

      if (!reader) {
        throw new Error('No reader available');
      }

      let accumulatedContent = '';
      let messageCreated = false;
      let assistantMessageIndex = messages.length + 1;

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        // Декодируем chunk
        let chunk = decoder.decode(value, { stream: true });
        
        if (!chunk) continue;

        // Убираем эмодзи и другие нежелательные символы
        chunk = chunk.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
        
        if (!chunk) continue;

        // При первом chunk создаем сообщение и скрываем лоадер
        if (!messageCreated) {
          setIsWaitingResponse(false);
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: '',
              timestamp: new Date(),
            },
          ]);
          messageCreated = true;
        }

        accumulatedContent += chunk;

        // Обновляем сообщение
        setMessages((prev) => {
          const newMessages = [...prev];
          if (newMessages[assistantMessageIndex]) {
            newMessages[assistantMessageIndex] = {
              role: 'assistant',
              content: accumulatedContent,
              timestamp: new Date(),
            };
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      setIsWaitingResponse(false);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Извините, произошла ошибка: ${errorMessage}\n\n🔧 Проверьте:\n• Интернет соединение\n• Консоль браузера (F12) для деталей`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsWaitingResponse(false);
    }
  };

  useEffect(() => {
    if (!hasUserSentMessage || !input.trim()) {
      setInputSuggestions([]);
      return;
    }

    const normalized = input.trim().toLowerCase();
    if (!normalized) {
      setInputSuggestions([]);
      return;
    }

    const words = normalized.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      setInputSuggestions([]);
      return;
    }

    const matches = FAQ_QUESTIONS.filter((question) =>
      words.some((word) => question.toLowerCase().includes(word))
    )
      .slice(0, 3);

    setInputSuggestions(matches);
  }, [input, hasUserSentMessage]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Кнопка открытия чата */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 w-14 h-14 rounded-2xl cursor-pointer',
          'bg-neutral-900 dark:bg-white',
          'text-white dark:text-neutral-900',
          'shadow-lg hover:shadow-xl',
          'flex items-center justify-center z-50',
          'transition-all duration-300',
          isOpen && 'scale-0 pointer-events-none'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Открыть AI-ассистента"
      >
        <Icon icon="lucide:message-circle" className="h-6 w-6" />
      </motion.button>

      {/* Окно чата */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full h-full md:w-[400px] md:h-[650px] md:rounded-2xl bg-white dark:bg-neutral-950 shadow-2xl z-50 flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800"
          >
            {/* Заголовок */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <Icon icon="lucide:bot" className="h-5 w-5 text-neutral-900 dark:text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">AI-Помощник</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Онлайн</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center transition-colors"
                aria-label="Закрыть чат"
              >
                <Icon icon="lucide:x" className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
              </button>
            </div>

            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50 dark:bg-neutral-900">
              {messages.map((msg, idx) => {
                const isLastAssistantMessage = 
                  msg.role === 'assistant' && 
                  idx === messages.length - 1 && 
                  isLoading &&
                  !isWaitingResponse;
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'flex',
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[85%] rounded-2xl px-4 py-3 shadow-sm',
                        msg.role === 'user'
                          ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                          : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700'
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap inline">
                        {msg.content}
                        {isLastAssistantMessage && msg.content && (
                          <motion.span
                            className="inline-block w-[2px] h-4 ml-0.5 -mb-0.5 bg-neutral-400 dark:bg-neutral-500"
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          />
                        )}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
              
              {/* Анимированный лоадер с прыгающими точками */}
              {isWaitingResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] rounded-2xl px-4 py-3 shadow-sm bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex gap-1.5 items-center py-1">
                      <motion.div
                        className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.2,
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.4,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* FAQ вопросы */}
            <AnimatePresence>
              {showFAQ && faqQuestions.length > 0 && (
                <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-2">
                  <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 px-1">
                    Часто задаваемые вопросы
                  </p>
                  <div className="space-y-2">
                    <AnimatePresence mode="popLayout">
                      {faqQuestions.map((question, idx) => (
                        <motion.button
                          key={question}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          onClick={() => handleFAQClick(question)}
                          className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700"
                        >
                          {question}
                        </motion.button>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </AnimatePresence>

            {/* Подсказки по вводу */}
            <AnimatePresence>
              {hasUserSentMessage && inputSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pt-3 pb-2 border-t border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur"
                >
                  <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2 px-1">
                    Совпадения из FAQ
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {inputSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                        disabled={isLoading}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Задайте вопрос..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-white focus:ring-0 outline-none text-sm transition-colors"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                  aria-label="Отправить сообщение"
                >
                  <Icon icon="lucide:send" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
