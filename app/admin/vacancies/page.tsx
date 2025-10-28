import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { VacanciesManager } from '@/components/admin/vacancies-manager';

export default async function AdminVacanciesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/admin/login');
  }

  return <VacanciesManager />;
}
