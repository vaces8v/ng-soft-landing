<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./public/banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./public/banner-light.svg">
  <img alt="NGSoft Banner" src="./public/banner-light.svg">
</picture>

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.0-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.18-2D3748?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

**Современная веб-платформа для IT-компании с AI-ассистентом и системой управления заявками**

[Демо](https://ng-soft.vercel.app) • [Документация](#-документация) • [Установка](#-быстрый-старт)

</div>

---

## ✨ Возможности

<table>
<tr>
<td>

### 🎨 **Современный дизайн**
- Адаптивный интерфейс для всех устройств
- Темная и светлая темы
- Плавные анимации и переходы
- Glassmorphism эффекты

</td>
<td>

### 🤖 **AI-ассистент**
- Интеграция с OpenRouter/Groq
- Потоковый ответ (streaming)
- Контекстные диалоги
- Поддержка Llama 3.3 70B

</td>
</tr>
<tr>
<td>

### 🔐 **Админ-панель**
- NextAuth v5 авторизация
- Управление заявками
- Статистика и аналитика
- CRUD операции

</td>
<td>

### ⚡ **Производительность**
- Server Components
- Оптимизация изображений
- Code splitting
- Turbopack сборка

</td>
</tr>
</table>

---

## 🚀 Быстрый старт

### Предварительные требования

```bash
Node.js >= 20.0.0
npm >= 10.0.0
PostgreSQL >= 14.0
```

### Установка

1. **Клонируйте репозиторий**

```bash
git clone https://github.com/your-username/ng-soft.git
cd ng-soft
```

2. **Установите зависимости**

```bash
npm install
```

3. **Настройте переменные окружения**

Создайте файл `.env` в корне проекта:

```env
# База данных
DATABASE_URL="postgresql://user:password@localhost:5432/ngsoft"

# Аутентификация
AUTH_SECRET="your-secret-key"  # Генерация: openssl rand -base64 32
AUTH_URL="http://localhost:3000"
AUTH_TRUST_HOST="true"

# AI API (выберите один)
OPENROUTER_API_KEY="sk-or-v1-..."  # Рекомендуется для РФ
GROQ_API_KEY="gsk_..."              # Альтернатива

# URL сайта
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

4. **Настройте базу данных**

```bash
# Генерация Prisma Client
npm run prisma:generate

# Применение миграций
npm run prisma:migrate

# (Опционально) Создание админа
npm run create-admin
```

5. **Запустите сервер разработки**

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере 🎉

---

## 📦 Структура проекта

```
ng-soft/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Публичные страницы
│   ├── admin/             # Админ-панель
│   ├── api/               # API endpoints
│   └── layout.tsx         # Корневой layout
├── components/            # React компоненты
│   ├── sections/          # Секции страниц
│   ├── ui/                # UI компоненты
│   └── admin/             # Админ компоненты
├── lib/                   # Утилиты и хелперы
│   ├── prisma.ts          # Prisma Client
│   └── utils.ts           # Общие функции
├── prisma/                # Prisma схема и миграции
│   ├── schema.prisma      # Модели данных
│   └── migrations/        # SQL миграции
├── public/                # Статические файлы
└── styles/                # Глобальные стили
```

---

## 🛠️ Технологии

<details>
<summary><b>Frontend</b></summary>

- **[Next.js 16](https://nextjs.org/)** - React framework с App Router
- **[React 19](https://react.dev/)** - UI библиотека
- **[TypeScript](https://www.typescriptlang.org/)** - Типизация
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[Framer Motion](https://www.framer.com/motion/)** - Анимации
- **[Lucide Icons](https://lucide.dev/)** - Иконки
- **[Shadcn/ui](https://ui.shadcn.com/)** - Компоненты

</details>

<details>
<summary><b>Backend</b></summary>

- **[Prisma](https://www.prisma.io/)** - ORM для PostgreSQL
- **[NextAuth v5](https://authjs.dev/)** - Аутентификация
- **[PostgreSQL](https://www.postgresql.org/)** - База данных
- **[OpenRouter](https://openrouter.ai/)** - AI API (работает в РФ)
- **[Groq](https://groq.com/)** - Альтернативный AI API

</details>

<details>
<summary><b>DevOps</b></summary>

- **[Vercel](https://vercel.com/)** - Хостинг и деплой
- **[Docker](https://www.docker.com/)** - Контейнеризация
- **[Turbopack](https://turbo.build/pack)** - Быстрая сборка

</details>

---

## 📚 Документация

### Основные команды

```bash
# Разработка
npm run dev              # Запуск dev сервера (с Turbopack)
npm run build            # Production сборка
npm run start            # Запуск production сервера

# База данных
npm run prisma:generate  # Генерация Prisma Client
npm run prisma:migrate   # Создание и применение миграций
npm run prisma:studio    # Открыть Prisma Studio

# Утилиты
npm run create-admin     # Создать админа
npm run test-ai          # Протестировать AI провайдеры

# Docker
npm run docker:up        # Запустить контейнеры
npm run docker:down      # Остановить контейнеры
```

### Создание админа

```bash
npm run create-admin
```

Введите данные:
- Email
- Пароль
- Имя

Вход: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### Настройка AI-ассистента

**Рекомендуется: OpenRouter** (работает в РФ без VPN)

1. Регистрация: [https://openrouter.ai](https://openrouter.ai)
2. Создайте API ключ: Keys → Create Key
3. Добавьте в `.env`:

```env
OPENROUTER_API_KEY="sk-or-v1-ваш_ключ"
```

4. Перезапустите сервер

**Альтернатива: Groq** (требует VPN в РФ)

```env
GROQ_API_KEY="gsk_ваш_ключ"
```

Проверка работоспособности:

```bash
npm run test-ai
```

---

## 🔔 Уведомления в Telegram
Система отправляет уведомления в Telegram при новых заявках и позволяет менять статус заявки прямо из чата.

### Переменные окружения
Добавьте в `.env` / переменные окружения проекта (Vercel → Settings → Environment Variables):

```env
TELEGRAM_BOT_TOKEN="123456:ABCDEF_ваш_токен"
TELEGRAM_BOT_USERNAME="имя_бота_без_@"  # например: ngsoft_notify_bot
TELEGRAM_WEBHOOK_SECRET="случайная_длинная_строка"
```

Перезапустите сервер после изменений.

### Настройка вебхука (Prod)
Поставьте публичный webhook на ваш production-домен:

```bash
# Удалить старый вебхук (опционально)
curl "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/deleteWebhook"

# Установить новый вебхук
curl -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook" \
  -d url="https://<ВАШ_ПРОД_ДОМЕН>/api/telegram/webhook" \
  -d secret_token="${TELEGRAM_WEBHOOK_SECRET}" \
  -d allowed_updates='["message","callback_query"]'

# Проверить статус вебхука
curl "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo"
```

В ответе `getWebhookInfo` должен быть ваш URL и отсутствие `last_error_message`.

### Настройка вебхука (Dev)
Телеграм принимает только публичные HTTPS URL. Для локальной разработки используйте туннель:

```bash
# Вариант 1: ngrok
ngrok http 3000
# Вариант 2: cloudflared
cloudflared tunnel --url http://localhost:3000
# Вариант 3: localtunnel
npx localtunnel --port 3000
```

Затем поставьте вебхук на публичный URL туннеля:

```bash
curl -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook" \
  -d url="https://<ПУБЛИЧНЫЙ_URL_ТУННЕЛЯ>/api/telegram/webhook" \
  -d secret_token="${TELEGRAM_WEBHOOK_SECRET}" \
  -d allowed_updates='["message","callback_query"]'
```

Проверка локального endpoint'а (сервер должен быть запущен):

```bash
curl -X POST http://localhost:3000/api/telegram/webhook \
  -H "Content-Type: application/json" \
  -H "x-telegram-bot-api-secret-token: ${TELEGRAM_WEBHOOK_SECRET}" \
  -d '{
    "update_id": 1,
    "message": {
      "message_id": 1,
      "from": { "id": 111, "username": "test" },
      "chat": { "id": 111, "type": "private" },
      "date": 0,
      "text": "/start ABCD1234"
    }
  }'
```

Ожидаемый ответ: `{ "ok": true }`.

### Использование (привязка Telegram)
1. В админ-панели на главной странице нажмите «Получить код» — откроется диалог с ботом или скопируйте код вручную.
2. В Telegram откройте бота `@<TELEGRAM_BOT_USERNAME>` и отправьте: `/start <КОД>` (альтернативно: `/link <КОД>`).
3. Вернитесь в админку и нажмите «Проверить» — статус должен стать «Привязано @username`.

### Управление уведомлениями и заявками в боте
- Включить/выключить уведомления о заявках сайта: `/notify apps on|off`
- Включить/выключить уведомления об откликах на вакансии: `/notify jobs on|off`
- В сообщении о новой заявке доступны кнопки: «В работу», «Завершена» — статус обновится в базе.

---

## 🚀 Деплой на Vercel

### Подготовка

1. **Создайте базу данных PostgreSQL**

Выберите один из вариантов:
- [Vercel Postgres](https://vercel.com/storage/postgres) (рекомендуется)
- [Neon](https://neon.tech) (бесплатный)
- [Supabase](https://supabase.com)

2. **Создайте файл `.npmrc`** (уже создан)

```
legacy-peer-deps=true
```

### Деплой

#### Вариант 1: Через Vercel CLI

```bash
# Установка CLI
npm i -g vercel

# Логин
vercel login

# Деплой
vercel

# Production деплой
vercel --prod
```

#### Вариант 2: Через GitHub

1. Загрузите код на GitHub
2. Зайдите на [vercel.com](https://vercel.com)
3. New Project → Import из GitHub
4. Добавьте Environment Variables:

```
DATABASE_URL=postgresql://...
AUTH_SECRET=your-secret
AUTH_URL=https://your-domain.vercel.app
AUTH_TRUST_HOST=true
OPENROUTER_API_KEY=sk-or-v1-...
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

5. Deploy!

### После деплоя

Примените миграции к production базе:

```bash
# Загрузите переменные окружения
vercel env pull .env.production.local

# Примените миграции
npx prisma migrate deploy

# Создайте админа
npm run create-admin
```

---

## 🎨 Кастомизация

### Изменение цветов

Отредактируйте `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    }
  }
}
```

### Изменение контента AI-ассистента

Отредактируйте `app/api/chat/route.ts`:

```ts
const COMPANY_CONTEXT = `
Ваш новый контекст для AI...
`;
```

### Добавление новых секций

1. Создайте компонент в `components/sections/`
2. Импортируйте в `app/page.tsx`
3. Добавьте в нужное место

---

## 🤝 Вклад в проект

Мы приветствуем вклад в проект! Вот как вы можете помочь:

1. Fork репозитория
2. Создайте ветку (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

### Правила

- Используйте TypeScript
- Следуйте существующему стилю кода
- Пишите понятные commit сообщения
- Добавляйте комментарии к сложному коду
- Тестируйте изменения перед PR

---

## 📝 Лицензия

Этот проект лицензирован под [MIT License](LICENSE).

---

## 💬 Поддержка

<div align="center">

**Нужна помощь?**

[📧 Email](mailto:feedback@ng-soft.ru) • [🌐 Сайт](https://ng-soft.ru) • [💬 Telegram](https://t.me/NGSOFT_bot)

---

Сделано с ❤️ командой **NGSoft**

</div>
