'use client'

import { useEffect } from 'react'
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

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-16 text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.08),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />

      <Empty className="relative z-10 max-w-md rounded-3xl border border-neutral-300/70 bg-white/95 p-10 text-neutral-900 shadow-[0_24px_60px_rgba(0,0,0,0.1)] backdrop-blur-sm dark:border-neutral-800/70 dark:bg-neutral-900/80 dark:text-white dark:shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <EmptyHeader className="gap-4">
          <EmptyMedia
            variant="icon"
            className="size-16 rounded-3xl bg-red-500 text-white shadow-[0_18px_40px_rgba(255,56,56,0.25)] [&_svg]:size-7 dark:bg-red-600 dark:shadow-[0_18px_40px_rgba(255,56,56,0.35)]"
          >
            <Icon icon="lucide:alert-triangle" />
          </EmptyMedia>
          <EmptyTitle className="text-2xl font-semibold text-neutral-900 dark:text-white">Что-то пошло не так</EmptyTitle>
          <EmptyDescription className="max-w-xs text-neutral-500 dark:text-neutral-400">
            Произошла непредвиденная ошибка. Попробуйте обновить страницу или вернитесь на главную.
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent className="w-full gap-3">
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              size="lg"
              className="h-11 rounded-2xl bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
              onClick={reset}
            >
              Попробовать снова
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 rounded-2xl border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              <Link href="/">На главную</Link>
            </Button>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <details className="mx-auto w-full max-w-sm text-left text-xs text-neutral-500 dark:text-neutral-400">
              <summary className="cursor-pointer text-neutral-500 transition-colors hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300">
                Детали ошибки
              </summary>
              <pre className="mt-2 max-h-40 overflow-auto rounded-lg bg-neutral-100 p-4 text-[11px] leading-relaxed text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                {error.message}
              </pre>
            </details>
          )}

          <div className="flex flex-wrap justify-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-1">
              <Icon icon="lucide:life-buoy" className="h-3.5 w-3.5" />
              Нужна помощь?
            </span>
            <Link href="#contact" className="font-medium underline-offset-4 hover:text-neutral-900 dark:hover:text-white">
              Свяжитесь с нами
            </Link>
          </div>
        </EmptyContent>

        <EmptyContent className="mt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800">
            <Icon icon="lucide:info" className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Проблема повторяется?
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm text-neutral-700 dark:text-neutral-300"
            >
              <Icon icon="lucide:mail" className="w-4 h-4" />
              Связаться с поддержкой
            </a>

            <a
              href="/faq"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm text-neutral-700 dark:text-neutral-300"
            >
              <Icon icon="lucide:help-circle" className="w-4 h-4" />
              База знаний
            </a>
          </div>
        </EmptyContent>
      </Empty>
    </main>
  )
}
