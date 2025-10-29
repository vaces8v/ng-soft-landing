import { prisma } from '@/lib/prisma';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const BOT_USERNAME = process.env.TELEGRAM_BOT_USERNAME;
const API_BASE = BOT_TOKEN ? `https://api.telegram.org/bot${BOT_TOKEN}` : '';

type KeyboardButton = {
  text: string;
  callback_data?: string;
  url?: string;
};

type InlineKeyboardMarkup = {
  inline_keyboard: KeyboardButton[][];
};

async function api<T = any>(method: string, payload: Record<string, any>) {
  if (!API_BASE) return null;
  const res = await fetch(`${API_BASE}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function sendTelegramMessage(chatId: string | number, text: string, options?: { reply_markup?: InlineKeyboardMarkup; parse_mode?: 'HTML' | 'MarkdownV2' | 'Markdown' }) {
  return api('sendMessage', {
    chat_id: chatId,
    text,
    parse_mode: options?.parse_mode ?? 'HTML',
    reply_markup: options?.reply_markup,
    disable_web_page_preview: true,
  });
}

export async function answerCallbackQuery(callbackQueryId: string, text?: string) {
  return api('answerCallbackQuery', { callback_query_id: callbackQueryId, text });
}

export async function editMessageText(chatId: string | number, messageId: number, text: string, replyMarkup?: InlineKeyboardMarkup) {
  return api('editMessageText', {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: 'HTML',
    reply_markup: replyMarkup,
    disable_web_page_preview: true,
  });
}

export async function broadcastToAdmins(text: string, opts?: { keyboard?: InlineKeyboardMarkup; type?: 'newApp' | 'jobApp' }) {
  try {
    const where = {
      telegramChatId: { not: null as any },
      ...(opts?.type === 'jobApp' ? { notifyJobApplications: true } : { notifyNewApplications: true }),
    };
    const admins = await prisma.user.findMany({ where, select: { telegramChatId: true } as any });

    const chatIds = admins.map((u: any) => u.telegramChatId).filter(Boolean);
    if (!chatIds.length) return;

    await Promise.allSettled(
      chatIds.map((chatId) =>
        sendTelegramMessage(chatId, text, opts?.keyboard ? { reply_markup: opts.keyboard } : undefined)
      )
    );
  } catch (e) {
    console.error('Telegram broadcast error:', e);
  }
}

export function buildApplicationMessage(app: { id: string; name: string; phone: string; email: string; company?: string | null; message: string; status: string; createdAt?: Date }) {
  const created = app.createdAt ? new Date(app.createdAt) : new Date();
  const lines = [
    `🆕 Новая заявка`,
    `ID: <code>${app.id}</code>`,
    `Имя: <b>${escapeHtml(app.name)}</b>`,
    `Телефон: <b>${escapeHtml(app.phone)}</b>`,
    `Email: <b>${escapeHtml(app.email)}</b>`,
    app.company ? `Компания: <b>${escapeHtml(app.company)}</b>` : undefined,
    `Сообщение:`,
    `<blockquote>${escapeHtml(app.message)}</blockquote>`,
    `Статус: <b>${statusLabel(app.status)}</b>`,
    `Дата: ${created.toLocaleString('ru-RU')}`,
  ].filter(Boolean);
  return lines.join('\n');
}

export function buildJobApplicationMessage(app: { id: string; vacancyId: string; name: string; phone: string; email: string; resume?: string | null; coverLetter: string; status: string; createdAt?: Date }) {
  const created = app.createdAt ? new Date(app.createdAt) : new Date();
  const lines = [
    `🧑‍💼 Отклик на вакансию`,
    `ID: <code>${app.id}</code>`,
    `Вакансия: <code>${app.vacancyId}</code>`,
    `Имя: <b>${escapeHtml(app.name)}</b>`,
    `Телефон: <b>${escapeHtml(app.phone)}</b>`,
    `Email: <b>${escapeHtml(app.email)}</b>`,
    app.resume ? `Резюме: <a href="${escapeHtml(app.resume)}">ссылка</a>` : undefined,
    `Сопроводительное:`,
    `<blockquote>${escapeHtml(app.coverLetter)}</blockquote>`,
    `Статус: <b>${statusLabel(app.status)}</b>`,
    `Дата: ${created.toLocaleString('ru-RU')}`,
  ].filter(Boolean);
  return lines.join('\n');
}

export function statusLabel(status: string) {
  if (status === 'new') return 'Новая';
  if (status === 'in_progress') return 'В работе';
  if (status === 'completed') return 'Завершена';
  return status;
}

export function inlineStatusKeyboard(applicationId: string): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: 'В работу', callback_data: `status:${applicationId}:in_progress` },
        { text: 'Завершена', callback_data: `status:${applicationId}:completed` },
      ],
    ],
  };
}

export async function notifyNewApplication(app: { id: string; name: string; phone: string; email: string; company?: string | null; message: string; status: string; createdAt?: Date }) {
  const text = buildApplicationMessage(app);
  const keyboard = inlineStatusKeyboard(app.id);
  await broadcastToAdmins(text, { keyboard, type: 'newApp' });
}

export async function notifyJobApplication(app: { id: string; vacancyId: string; name: string; phone: string; email: string; resume?: string | null; coverLetter: string; status: string; createdAt?: Date }) {
  const text = buildJobApplicationMessage(app);
  await broadcastToAdmins(text, { type: 'jobApp' });
}

export function botDeepLink(code: string) {
  if (!BOT_USERNAME) return null;
  return `https://t.me/${BOT_USERNAME}?start=${encodeURIComponent(code)}`;
}

export async function setBotCommands() {
  if (!API_BASE) return null;
  const commands = [
    { command: 'start', description: 'Запуск и привязка аккаунта' },
    { command: 'link', description: 'Привязать аккаунт по коду' },
    { command: 'me', description: 'Проверить привязку' },
    { command: 'notify', description: 'Вкл/выкл уведомления: /notify apps on|off' },
    { command: 'help', description: 'Список команд и панель' },
  ];
  return api('setMyCommands', { commands });
}

export async function setChatMenuButtonToCommands() {
  if (!API_BASE) return null;
  return api('setChatMenuButton', { menu_button: { type: 'commands' } });
}

export async function ensureBotUX() {
  try {
    await Promise.allSettled([setBotCommands(), setChatMenuButtonToCommands()]);
  } catch {}
}

export function buildHelpText() {
  const lines = [
    '<b>Список команд</b>\n',
    '<b>/start &lt;код&gt;</b> — привязать аккаунт по коду',
    '<b>/link &lt;код&gt;</b> — альтернатива привязки',
    '<b>/me</b> — показать статус привязки',
    '<b>/notify apps on|off</b> — уведомления о заявках',
    '<b>/notify jobs on|off</b> — уведомления об откликах',
    '<b>/help</b> — панель команд',
    '\nНажмите кнопки ниже для быстрых действий.',
  ];
  return lines.join('\n');
}

export function helpKeyboard(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: 'Привязка', callback_data: 'help:link' },
        { text: 'Мой статус', callback_data: 'help:me' },
      ],
      [
        { text: 'Уведомления', callback_data: 'help:notify' },
        { text: 'Панель уведомлений', callback_data: 'help:panel' },
      ],
    ],
  };
}

export function buildNotifyPanelKeyboard(enabledApps: boolean, enabledJobs: boolean): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: `Заявки: ${enabledApps ? 'Выкл' : 'Вкл'}`, callback_data: `notify:apps:${enabledApps ? 'off' : 'on'}` },
        { text: `Вакансии: ${enabledJobs ? 'Выкл' : 'Вкл'}`, callback_data: `notify:jobs:${enabledJobs ? 'off' : 'on'}` },
      ],
      [
        { text: 'Назад', callback_data: 'help:back' },
      ],
    ],
  };
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
