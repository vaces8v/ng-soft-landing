/**
 * Компоненты для структурированных данных (Schema.org / JSON-LD)
 * Используйте эти компоненты на соответствующих страницах для улучшения SEO
 */

interface ServiceStructuredDataProps {
  service: string
  description: string
}

export function ServiceStructuredData({ service, description }: ServiceStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service,
    provider: {
      '@type': 'Organization',
      name: 'NG-Soft',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ng-soft.ru',
    },
    description,
    areaServed: {
      '@type': 'Country',
      name: 'Россия',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbStructuredDataProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ng-soft.ru'
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface FAQItem {
  question: string
  answer: string
}

interface FAQStructuredDataProps {
  items: FAQItem[]
}

export function FAQStructuredData({ items }: FAQStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface ArticleStructuredDataProps {
  title: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author?: string
}

export function ArticleStructuredData({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author = 'NG-Soft Team',
}: ArticleStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ng-soft.ru'
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: `${baseUrl}${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'NG-Soft',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface LocalBusinessStructuredDataProps {
  name?: string
  address?: {
    street: string
    city: string
    region: string
    postalCode: string
  }
  geo?: {
    latitude: string
    longitude: string
  }
  telephone?: string
  openingHours?: string
}

export function LocalBusinessStructuredData({
  name = 'NG-Soft',
  address,
  geo,
  telephone,
  openingHours = 'Mo-Fr 09:00-18:00',
}: LocalBusinessStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ng-soft.ru'
  
  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    image: `${baseUrl}/logo.png`,
    url: baseUrl,
  }

  if (address) {
    structuredData.address = {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: 'RU',
    }
  }

  if (geo) {
    structuredData.geo = {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    }
  }

  if (telephone) {
    structuredData.telephone = telephone
  }

  if (openingHours) {
    structuredData.openingHoursSpecification = {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
