'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface MeResponse {
  name: string;
  email: string;
  role?: string;
  notifyNewApplications: boolean;
  notifyJobApplications: boolean;
  telegramLinked: boolean;
}

export function Settings() {
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPass, setChangingPass] = useState(false);
  const [savingNotify, setSavingNotify] = useState(false);
  const [unlinking, setUnlinking] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [notifyApps, setNotifyApps] = useState(false);
  const [notifyJobs, setNotifyJobs] = useState(false);
  const [telegramLinked, setTelegramLinked] = useState(false);

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMe = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/me');
        if (!res.ok) throw new Error('Failed to load');
        const data: MeResponse = await res.json();
        setName(data.name || '');
        setEmail(data.email || '');
        setNotifyApps(!!data.notifyNewApplications);
        setNotifyJobs(!!data.notifyJobApplications);
        setTelegramLinked(!!data.telegramLinked);
      } catch (e: any) {
        setError('Не удалось загрузить профиль');
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const saveProfile = async () => {
    setSavingProfile(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch('/api/admin/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Ошибка сохранения');
      setMessage('Профиль обновлен');
      router.refresh();
    } catch (e: any) {
      setError(e.message || 'Ошибка');
    } finally {
      setSavingProfile(false);
    }
  };

  const changePassword = async () => {
    setChangingPass(true);
    setMessage(null);
    setError(null);
    try {
      if (newPassword !== confirmPassword) throw new Error('Пароли не совпадают');
      const res = await fetch('/api/admin/me/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Ошибка изменения пароля');
      setMessage('Пароль изменен');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (e: any) {
      setError(e.message || 'Ошибка');
    } finally {
      setChangingPass(false);
    }
  };

  const toggleNotify = async (key: 'apps' | 'jobs', value: boolean) => {
    setSavingNotify(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch('/api/admin/me/notify', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Ошибка обновления уведомлений');
      if (key === 'apps') setNotifyApps(value);
      if (key === 'jobs') setNotifyJobs(value);
      setMessage('Настройки уведомлений обновлены');
    } catch (e: any) {
      setError(e.message || 'Ошибка');
    } finally {
      setSavingNotify(false);
    }
  };

  const unlinkTelegram = async () => {
    setUnlinking(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch('/api/admin/me/telegram', { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Ошибка отвязки Telegram');
      setTelegramLinked(false);
      setNotifyApps(false);
      setNotifyJobs(false);
      setMessage('Telegram отвязан');
    } catch (e: any) {
      setError(e.message || 'Ошибка');
    } finally {
      setUnlinking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon icon="lucide:loader-2" className="h-6 w-6 animate-spin text-neutral-400" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold mb-2">Настройки</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Управление профилем и уведомлениями</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="gap-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <Icon icon="lucide:log-out" className="h-4 w-4" />
          Выйти
        </Button>
      </div>

      {message && (
        <div className="p-3 rounded-lg border border-green-200 dark:border-green-900/40 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm">
          {message}
        </div>
      )}
      {error && (
        <div className="p-3 rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Profile */}
      <section className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
        <h2 className="text-lg font-semibold mb-4">Профиль</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Имя</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2" />
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={saveProfile} disabled={savingProfile} className="gap-2">
            {savingProfile && <Icon icon="lucide:loader-2" className="h-4 w-4 animate-spin" />}
            Сохранить
          </Button>
        </div>
      </section>

      {/* Password */}
      <section className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
        <h2 className="text-lg font-semibold mb-4">Смена пароля</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="currentPassword">Текущий пароль</Label>
            <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="newPassword">Новый пароль</Label>
            <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Повторите пароль</Label>
            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-2" />
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={changePassword} disabled={changingPass} className="gap-2">
            {changingPass && <Icon icon="lucide:loader-2" className="h-4 w-4 animate-spin" />}
            Изменить пароль
          </Button>
        </div>
      </section>

      {/* Telegram Notifications */}
      {telegramLinked && (
        <section className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Уведомления Telegram</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={unlinkTelegram}
              disabled={unlinking || savingNotify}
              className="gap-2 text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20"
            >
              {unlinking && <Icon icon="lucide:loader-2" className="h-4 w-4 animate-spin" />}
              <Icon icon="lucide:link-2-off" className="h-4 w-4" />
              Отвязать
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Новые заявки</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Включить уведомления о новых заявках с сайта</p>
              </div>
              <Switch checked={notifyApps} onCheckedChange={(v) => toggleNotify('apps', v)} disabled={savingNotify} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Отклики на вакансии</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Включить уведомления об откликах на вакансии</p>
              </div>
              <Switch checked={notifyJobs} onCheckedChange={(v) => toggleNotify('jobs', v)} disabled={savingNotify} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
