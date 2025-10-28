'use client';

import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Имя должно содержать минимум 2 символа',
  }),
  phone: z.string().regex(/^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/, {
    message: 'Введите корректный номер телефона в формате +7 (XXX) XXX-XX-XX',
  }),
  email: z.string().email({
    message: 'Введите корректный email адрес',
  }),
  company: z.string().optional(),
  message: z.string().min(10, {
    message: 'Сообщение должно содержать минимум 10 символов',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '+7 ',
      email: '',
      company: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        console.error('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: 'lucide:mail',
      title: 'Email',
      value: 'feedback@ng-soft.ru',
      link: 'mailto:feedback@ng-soft.ru',
    },
    {
      icon: 'lucide:phone',
      title: 'Телефон',
      value: '+7 (495) 682-26-20',
      link: 'tel:+74956822620',
    },
    {
      icon: 'lucide:map-pin',
      title: 'Адрес',
      value: '1-я Мытищинская улица, 28с1',
      link: null,
    },
  ];

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left - Contact Info */}
          <div
            className="space-y-8"
          >
            {/* Badge */}
            <div
              className="inline-block"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-700">
                <Icon icon="lucide:message-circle" className="h-4 w-4" />
                <span className="text-sm font-medium">Свяжитесь с нами</span>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                  Готовы начать
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-500 dark:from-neutral-200 dark:via-neutral-300 dark:to-neutral-500">
                  ваш проект?
                </span>
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Расскажите нам о вашей идее, и мы поможем воплотить её в жизнь.
                Ответим на все вопросы и предложим оптимальное решение.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4 pt-4">
              {contactInfo.map((item, index) => (
                <div key={index}>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800/50 dark:to-neutral-900/50 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon icon={item.icon} className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800/50 dark:to-neutral-900/50 border border-neutral-200 dark:border-neutral-700">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                        <Icon icon={item.icon} className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Мы в социальных сетях
              </p>
              <div className="flex gap-3">
                {[
                  { icon: 'simple-icons:telegram', link: 'https://t.me/NGSOFT_bot', name: 'Telegram' },
                  { icon: 'simple-icons:whatsapp', link: 'https://wa.me/79256822620', name: 'WhatsApp' },
                  { icon: 'simple-icons:vk', link: 'https://vk.com/ng_soft', name: 'VK' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    aria-label={`Связаться через ${social.name}`}
                    className="w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center hover:shadow-lg transition-all"
                  >
                    <Icon icon={social.icon} className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="relative md:mt-20 mt-0"
          >
            <div className="relative p-8 rounded-2xl bg-white/80 dark:bg-neutral-900/50 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700/50 shadow-2xl">
              {/* Decorative gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neutral-50/50 via-neutral-100/30 to-neutral-50/50 dark:from-neutral-800/30 dark:via-neutral-900/30 dark:to-neutral-800/30 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                  Оставьте заявку
                </h3>

                {isSuccess && (
                  <div
                    className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                  >
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:check-circle" className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                        Спасибо! Ваше сообщение успешно отправлено.
                      </p>
                    </div>
                  </div>
                )}

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-700 dark:text-neutral-300">
                            Имя *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ваше имя"
                              {...field}
                              className="bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-700 dark:text-neutral-300">
                            Телефон *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+7 (XXX) XXX-XX-XX"
                              {...field}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, '');
                                if (!value.startsWith('7')) {
                                  value = '7' + value;
                                }
                                if (value.length > 11) {
                                  value = value.slice(0, 11);
                                }
                                
                                let formatted = '+7';
                                if (value.length > 1) {
                                  formatted += ' (' + value.slice(1, 4);
                                }
                                if (value.length >= 5) {
                                  formatted += ') ' + value.slice(4, 7);
                                }
                                if (value.length >= 8) {
                                  formatted += '-' + value.slice(7, 9);
                                }
                                if (value.length >= 10) {
                                  formatted += '-' + value.slice(9, 11);
                                }
                                
                                field.onChange(formatted);
                              }}
                              className="bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-700 dark:text-neutral-300">
                            Email *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              {...field}
                              className="bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Company */}
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-700 dark:text-neutral-300">
                            Компания
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Название компании"
                              {...field}
                              className="bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Message */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-700 dark:text-neutral-300">
                            Сообщение *
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Расскажите о вашем проекте..."
                              rows={5}
                              {...field}
                              className="bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-200 text-white dark:text-neutral-900 hover:shadow-lg transition-all"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:loader-2" className="h-4 w-4 animate-spin" />
                          <span>Отправка...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>Отправить сообщение</span>
                          <Icon icon="lucide:send" className="h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
