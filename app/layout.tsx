import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import dynamic from 'next/dynamic';
import { SpeedInsights } from "@vercel/speed-insights/next"

const CookieConsent = dynamic(
  () => import('@/components/cookie-consent').then(mod => ({ default: mod.CookieConsent })),
  { ssr: true }
);

const AIAssistant = dynamic(
  () => import('@/components/ai-assistant').then(mod => ({ default: mod.AIAssistant })),
  { ssr: true }
);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ng-soft.ru'),
  title: {
    default: "NG-Soft - Современные решения для вашего бизнеса",
    template: "%s | NG-Soft",
  },
  description: "Разработка программного обеспечения, веб-приложений, мобильных приложений и облачных решений. Более 5 лет опыта, 50+ успешных проектов. Профессиональная разработка под ключ.",
  keywords: ['разработка программного обеспечения', 'веб-разработка', 'мобильные приложения', 'облачные решения', 'enterprise решения', 'разработка под ключ', 'NG-Soft', 'IT компания'],
  authors: [{ name: 'NG-Soft Team' }],
  creator: 'NG-Soft',
  publisher: 'NG-Soft',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ng-soft.ru',
    title: "NG-Soft - Современные решения для вашего бизнеса",
    description: "Разработка программного обеспечения, веб-приложений, мобильных приложений и облачных решений. Более 5 лет опыта, 50+ успешных проектов.",
    siteName: "NG-Soft",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NG-Soft - Разработка программного обеспечения',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "NG-Soft - Современные решения для вашего бизнеса",
    description: "Разработка программного обеспечения, веб-приложений, мобильных приложений и облачных решений.",
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.iconify.design" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://ng-soft.ru'} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'NG-Soft',
              description: 'Разработка программного обеспечения и веб-приложений',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ng-soft.com',
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ng-soft.com'}/logo.png`,
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                availableLanguage: ['Russian', 'English'],
              },
              sameAs: [
                //  Ссылки на социальные сети
              ],
              areaServed: 'RU',
              serviceType: [
                'Разработка программного обеспечения',
                'Веб-разработка',
                'Мобильная разработка',
                'Облачные решения',
              ],
            }),
          }}
        />
      </head>
      <SpeedInsights />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CookieConsent />
          <AIAssistant />
        </ThemeProvider>
      </body>
    </html>
  );
}
