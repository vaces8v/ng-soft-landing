import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { AdminHeader } from '@/components/admin/header';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {session?.user && <AdminHeader user={session.user} />}
      <main>{children}</main>
    </div>
  );
}
