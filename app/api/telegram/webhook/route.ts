import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { answerCallbackQuery, buildApplicationMessage, editMessageText, sendTelegramMessage, statusLabel, ensureBotUX, buildHelpText, helpKeyboard, buildNotifyPanelKeyboard } from '@/lib/telegram';

function ok() {
  return NextResponse.json({ ok: true });
}

function unauthorized() {
  return NextResponse.json({ ok: false }, { status: 401 });
}

function bad() {
  return NextResponse.json({ ok: false }, { status: 400 });
}

function textParts(text: string) {
  return text.trim().split(/\s+/);
}

export async function POST(req: NextRequest) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (secret) {
    const header = req.headers.get('x-telegram-bot-api-secret-token');
    if (header !== secret) return unauthorized();
  }

  const update = await req.json();

  if (update.message) {
    const msg = update.message;
    const chatId = String(msg.chat.id);
    const text: string = msg.text || '';

    if (text.startsWith('/start')) {
      await ensureBotUX();
      const parts = textParts(text);
      const code = parts[1] || '';
      if (!code) {
        await sendTelegramMessage(chatId, 'Отправьте код для привязки: /link <код>');
        return ok();
      }
      const user = await prisma.user.findFirst({
        where: {
          telegramAuthCode: code,
          telegramAuthCodeExpiresAt: { gt: new Date() },
        },
      });
      if (!user) {
        await sendTelegramMessage(chatId, 'Код недействителен или истек');
        return ok();
      }
      await prisma.user.update({
        where: { id: user.id },
        data: {
          telegramChatId: chatId,
          telegramUsername: msg.from?.username || null,
          telegramLinkedAt: new Date(),
          telegramAuthCode: null,
          telegramAuthCodeExpiresAt: null,
        },
      });
      await sendTelegramMessage(chatId, 'Аккаунт успешно привязан');
      return ok();
    }

    if (text.startsWith('/link')) {
      await ensureBotUX();
      const parts = textParts(text);
      const code = parts[1] || '';
      if (!code) {
        await sendTelegramMessage(chatId, 'Использование: /link <код>');
        return ok();
      }
      const user = await prisma.user.findFirst({
        where: {
          telegramAuthCode: code,
          telegramAuthCodeExpiresAt: { gt: new Date() },
        },
      });
      if (!user) {
        await sendTelegramMessage(chatId, 'Код недействителен или истек');
        return ok();
      }
      await prisma.user.update({
        where: { id: user.id },
        data: {
          telegramChatId: chatId,
          telegramUsername: msg.from?.username || null,
          telegramLinkedAt: new Date(),
          telegramAuthCode: null,
          telegramAuthCodeExpiresAt: null,
        },
      });
      await sendTelegramMessage(chatId, 'Аккаунт успешно привязан');
      return ok();
    }

    if (text.startsWith('/me')) {
      const user = await prisma.user.findFirst({ where: { telegramChatId: chatId } });
      if (!user) {
        await sendTelegramMessage(chatId, 'Телеграм не привязан. Сначала используйте /start <код>');
        return ok();
      }
      await sendTelegramMessage(
        chatId,
        `Вы привязаны как ${user.telegramUsername || 'без username'} (ID ${chatId})`
      );
      return ok();
    }

    if (text.startsWith('/help')) {
      await ensureBotUX();
      const help = buildHelpText();
      await sendTelegramMessage(chatId, help, { parse_mode: 'HTML', reply_markup: helpKeyboard() });
      return ok();
    }

    if (text.startsWith('/notify')) {
      const parts = textParts(text);
      const user = await prisma.user.findFirst({ where: { telegramChatId: chatId } });
      if (!user) {
        await sendTelegramMessage(chatId, 'Нет прав');
        return ok();
      }
      if (parts.length < 3) {
        await sendTelegramMessage(chatId, 'Использование: /notify apps on|off или /notify jobs on|off');
        return ok();
      }
      const channel = parts[1];
      const onoff = parts[2];
      const value = onoff.toLowerCase() === 'on';
      if (channel !== 'apps' && channel !== 'jobs') {
        await sendTelegramMessage(chatId, 'Неизвестный канал. Используйте apps или jobs');
        return ok();
      }
      await prisma.user.update({
        where: { id: user.id },
        data: channel === 'apps' ? { notifyNewApplications: value } : { notifyJobApplications: value },
      });
      await sendTelegramMessage(chatId, `Уведомления ${channel === 'apps' ? 'заявки' : 'вакансии'}: ${value ? 'включены' : 'выключены'}`);
      return ok();
    }

    return ok();
  }

  if (update.callback_query) {
    const cq = update.callback_query;
    const fromChatId = String(cq.from.id);
    const data: string = cq.data || '';
    const messageId = cq.message?.message_id;

    if (!data || !messageId) return bad();

    const user = await prisma.user.findFirst({ where: { telegramChatId: fromChatId } });
    if (!user || user.role !== 'admin') {
      await answerCallbackQuery(cq.id, 'Нет прав');
      return ok();
    }

    if (data.startsWith('status:')) {
      const [, appId, newStatus] = data.split(':');
      if (!['in_progress', 'completed'].includes(newStatus)) {
        await answerCallbackQuery(cq.id, 'Недопустимый статус');
        return ok();
      }
      const app = await prisma.application.update({ where: { id: appId }, data: { status: newStatus } });
      await answerCallbackQuery(cq.id, `Статус: ${statusLabel(newStatus)}`);
      const text = buildApplicationMessage(app);
      await editMessageText(fromChatId, messageId, text);
      return ok();
    }

    if (data === 'help:panel' || data === 'help:back') {
      const help = buildHelpText();
      await editMessageText(fromChatId, messageId, help, helpKeyboard());
      await answerCallbackQuery(cq.id);
      return ok();
    }

    if (data === 'help:link') {
      const msg = 'В админке нажмите «Получить код». Затем отправьте в чат с ботом: /start <КОД> (или /link <КОД>).';
      await editMessageText(fromChatId, messageId, msg, helpKeyboard());
      await answerCallbackQuery(cq.id);
      return ok();
    }

    if (data === 'help:me') {
      const info = `Вы привязаны как ${user.telegramUsername || 'без username'} (ID ${fromChatId})`;
      await editMessageText(fromChatId, messageId, info, helpKeyboard());
      await answerCallbackQuery(cq.id);
      return ok();
    }

    if (data === 'help:notify') {
      const info = `Настройки уведомлений\nЗаявки: ${user.notifyNewApplications ? 'вкл' : 'выкл'}\nВакансии: ${user.notifyJobApplications ? 'вкл' : 'выкл'}`;
      await editMessageText(fromChatId, messageId, info, buildNotifyPanelKeyboard(!!user.notifyNewApplications, !!user.notifyJobApplications));
      await answerCallbackQuery(cq.id);
      return ok();
    }

    if (data.startsWith('notify:')) {
      const [, channel, action] = data.split(':');
      const value = action === 'on';
      if (channel !== 'apps' && channel !== 'jobs') {
        await answerCallbackQuery(cq.id, 'Неизвестный канал');
        return ok();
      }
      const updated = await prisma.user.update({
        where: { id: user.id },
        data: channel === 'apps' ? { notifyNewApplications: value } : { notifyJobApplications: value },
      });
      const info = `Настройки уведомлений\nЗаявки: ${updated.notifyNewApplications ? 'вкл' : 'выкл'}\nВакансии: ${updated.notifyJobApplications ? 'вкл' : 'выкл'}`;
      await editMessageText(fromChatId, messageId, info, buildNotifyPanelKeyboard(!!updated.notifyNewApplications, !!updated.notifyJobApplications));
      await answerCallbackQuery(cq.id, 'Обновлено');
      return ok();
    }

    return ok();
  }

  return ok();
}
