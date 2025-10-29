'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import type { Vacancy } from '@/lib/vacancies-store';

interface ApplicationDrawerProps {
  vacancy: Vacancy | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplicationDrawer({ vacancy, open, onOpenChange }: ApplicationDrawerProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vacancy) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/job-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vacancyId: vacancy.id,
          ...formData,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          coverLetter: '',
        });
        setTimeout(() => {
          setIsSuccess(false);
          onOpenChange(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!vacancy) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto p-5">
        <SheetHeader>
          <SheetTitle className="text-2xl">{vacancy.title}</SheetTitle>
          <SheetDescription className="flex flex-col gap-2 text-left">
            <span className="flex items-center gap-2">
              <Icon icon="lucide:clock" className="h-4 w-4" />
              {vacancy.type}
            </span>
            <span className="flex items-center gap-2">
              <Icon icon="lucide:map-pin" className="h-4 w-4" />
              {vacancy.location}
            </span>
          </SheetDescription>
        </SheetHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
              <Icon icon="lucide:check" className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Отклик отправлен!</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-center">
              Мы свяжемся с вами в ближайшее время
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="name">Ваше имя *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Иван Иванов"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="ivan@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+7 (999) 123-45-67"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverLetter">Сопроводительное письмо *</Label>
              <Textarea
                id="coverLetter"
                value={formData.coverLetter}
                onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                placeholder="Расскажите о себе и почему вы подходите на эту позицию..."
                rows={6}
                required
              />
            </div>

            <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 p-4">
              <h4 className="font-semibold mb-2">Требования:</h4>
              <ul className="space-y-1">
                {vacancy.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <Icon icon="lucide:check" className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-600" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Icon icon="lucide:loader-2" className="h-5 w-5 animate-spin" />
                  Отправка...
                </>
              ) : (
                <>
                  <Icon icon="lucide:send" className="h-5 w-5" />
                  Отправить отклик
                </>
              )}
            </Button>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
