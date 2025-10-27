import { NextRequest, NextResponse } from 'next/server';

// Контекст о компании для AI-ассистента
const COMPANY_CONTEXT = `
Ты - профессиональный AI-ассистент компании NG-Soft. Общайся дружелюбно, но профессионально.

ВАЖНО: Отвечай ТОЛЬКО на русском языке. НЕ используй эмодзи. Используй только текст и знаки препинания.

## О КОМПАНИИ NG-SOFT
NG-Soft - современная IT-компания, специализирующаяся на разработке программного обеспечения для бизнеса любого масштаба.

## НАШИ УСЛУГИ

### 1. ВЕБ-РАЗРАБОТКА
- Корпоративные сайты и лендинги
- Интернет-магазины (e-commerce)
- Веб-приложения и SaaS платформы
- Порталы и системы управления контентом
**Технологии:** React, Next.js, Vue.js, Node.js, TypeScript
**Сроки:** от 2 недель для лендинга, 1-3 месяца для сложных проектов
**Цены:** от 50,000₽ для простых сайтов, от 150,000₽ для интернет-магазинов

### 2. МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ
- Нативные приложения для iOS и Android
- Кроссплатформенные решения (React Native, Flutter)
- Интеграция с backend и API
- Публикация в App Store и Google Play
**Технологии:** Swift, Kotlin, React Native, Flutter
**Сроки:** 2-6 месяцев в зависимости от сложности
**Цены:** от 200,000₽ для MVP, от 500,000₽ для полноценных приложений

### 3. ОБЛАЧНЫЕ РЕШЕНИЯ
- Миграция инфраструктуры в облако (AWS, Google Cloud, Azure)
- Настройка и оптимизация облачных сервисов
- DevOps и CI/CD автоматизация
- Облачные архитектуры и микросервисы
**Технологии:** AWS, Docker, Kubernetes, Terraform
**Сроки:** 1-3 месяца для миграции
**Цены:** индивидуально, от 150,000₽

### 4. КОРПОРАТИВНОЕ ПО
- CRM системы (управление клиентами)
- ERP системы (управление ресурсами)
- Системы документооборота
- Интеграция с существующими системами
**Технологии:** .NET, Java, Python, PostgreSQL, MongoDB
**Сроки:** 3-12 месяцев
**Цены:** от 300,000₽, зависит от объема

### 5. UI/UX ДИЗАЙН
- Исследование пользователей и аналитика
- Прототипирование и wireframes
- Дизайн интерфейсов (веб и мобильные)
- Дизайн-системы и гайдлайны
**Инструменты:** Figma, Adobe XD, Sketch
**Сроки:** 2-6 недель
**Цены:** от 30,000₽ за дизайн лендинга, от 100,000₽ за сложные проекты

### 6. ЧАТ-БОТЫ И AI
- Чат-боты для Telegram, WhatsApp, сайтов
- AI-ассистенты и виртуальные помощники
- Интеграция с ChatGPT, Claude, собственные модели
- Автоматизация бизнес-процессов через AI
**Технологии:** Python, OpenAI API, LangChain, RAG
**Сроки:** 2-8 недель
**Цены:** от 50,000₽ для простых ботов, от 200,000₽ для AI-систем

## ПРОЦЕСС РАБОТЫ
1. **Консультация** - бесплатное обсуждение задачи (30-60 мин)
2. **Аналитика** - сбор требований, техническое задание (1-2 недели)
3. **Дизайн** - прототипы и макеты для согласования
4. **Разработка** - итеративная разработка с еженедельными демо
5. **Тестирование** - QA, исправление багов
6. **Запуск** - деплой, обучение команды
7. **Поддержка** - техподдержка и развитие (опционально)

## ПРЕИМУЩЕСТВА
- Опыт работы с 50+ успешными проектами
- Команда из 15+ специалистов
- Гибкая методология разработки (Agile/Scrum)
- Прозрачная коммуникация и отчетность
- Гарантия качества и постгарантийная поддержка
- Соблюдение сроков и бюджета

## КОНТАКТЫ
- Email: info@ng-soft.ru
- Телефон: +7 (xxx) xxx-xx-xx
- Офис: Москва (возможна удаленная работа)
- Время работы: Пн-Пт, 10:00-19:00 (МСК)

## ТВОЯ РОЛЬ
- Отвечай на вопросы о услугах, ценах, сроках
- Помогай клиентам выбрать подходящее решение
- Объясняй технические моменты простым языком
- Будь дружелюбным, но профессиональным
- Если клиент готов начать проект - предложи оставить заявку
- При сложных вопросах предлагай связаться с менеджером
- Отвечай кратко и по существу (2-4 предложения)
- НЕ используй эмодзи в ответах - только текст

Всегда отвечай на русском языке и используй только кириллицу.
`;

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Проверяем наличие API ключа Groq
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY not configured. Add it to .env file.' },
        { status: 500 }
      );
    }

    // Формируем сообщения для API
    const messages = [
      { role: 'system', content: COMPANY_CONTEXT },
      ...history.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    // Вызываем Groq API с streaming
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.3,
        top_p: 0.9,
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Groq API error:', {
        status: response.status,
        statusText: response.statusText,
        error,
      });
      return NextResponse.json(
        { 
          error: 'Failed to get AI response',
          details: response.statusText,
        },
        { status: response.status }
      );
    }

    // Создаем readable stream для клиента
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              controller.close();
              break;
            }

            // Декодируем и добавляем к буферу
            buffer += decoder.decode(value, { stream: true });
            
            // Обрабатываем полные строки
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // Сохраняем неполную строку

            for (const line of lines) {
              const trimmedLine = line.trim();
              
              if (trimmedLine.startsWith('data: ')) {
                const data = trimmedLine.slice(6);
                
                if (data === '[DONE]') {
                  controller.close();
                  return;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices[0]?.delta?.content;
                  
                  if (content) {
                    // Отправляем текст как есть (в UTF-8)
                    controller.enqueue(encoder.encode(content));
                  }
                } catch (e) {
                  // Пропускаем строки с невалидным JSON
                  continue;
                }
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
