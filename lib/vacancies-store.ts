// TypeScript типы для вакансий и откликов (теперь используем Prisma)
export interface Vacancy {
  id: string;
  title: string;
  type: string;
  location: string;
  icon: string;
  description: string;
  requirements: string[];
  status: 'active' | 'closed';
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Application {
  id: string;
  vacancyId: string;
  name: string;
  email: string;
  phone: string;
  resume?: string | null;
  coverLetter: string;
  status: 'new' | 'reviewed' | 'rejected' | 'accepted';
  createdAt: Date | string;
}
