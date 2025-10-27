import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ApplicationsList } from '@/components/admin/applications-list';

export default async function ApplicationsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/admin/login');
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <ApplicationsList />
    </div>
  );
}
