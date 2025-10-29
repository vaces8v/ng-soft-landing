'use client'

import Link from 'next/link'
import { Icon } from '@iconify/react'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-16 text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.08),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />

      <Empty className="relative z-10 max-w-md rounded-3xl border border-neutral-300/70 bg-white/95 p-10 text-neutral-900 shadow-[0_24px_60px_rgba(0,0,0,0.1)] backdrop-blur-sm dark:border-neutral-800/70 dark:bg-neutral-900/80 dark:text-white dark:shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <EmptyHeader className="gap-4">
          <EmptyTitle className="text-2xl font-semibold text-neutral-900 dark:text-white">Страница не найдена</EmptyTitle>
          <EmptyDescription className="max-w-xs text-neutral-500 dark:text-neutral-400">
            Мы не смогли найти нужную страницу. Вернитесь на главную или свяжитесь с нами, и мы поможем.
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent className="w-full gap-3">
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-2xl bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
            >
              <Link href="/">На главную</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 rounded-2xl border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              <Link href="/#contact">Связаться</Link>
            </Button>
          </div>

          <Link
            href="/#services"
            className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <span>Подробнее об услугах</span>
            <Icon icon="lucide:arrow-up-right" className="h-3.5 w-3.5" />
          </Link>
        </EmptyContent>
      </Empty>
    </main>
  )
}
