import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { AdminDashboard } from '@/components/admin/dashboard';

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/admin/login');
  }

  return <AdminDashboard user={session.user} />;
}
