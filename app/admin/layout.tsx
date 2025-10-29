import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { AdminHeader } from '@/components/admin/header';
import { prisma } from '@/lib/prisma';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  let headerUser: any = session?.user || null;
  if (headerUser) {
    const dbUser = await prisma.user.findUnique({
      where: { id: (headerUser as any).id },
      select: { name: true, email: true },
    });
    if (dbUser) headerUser = { ...headerUser, ...dbUser };
  }
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {headerUser && <AdminHeader user={headerUser} />}
      <main>{children}</main>
    </div>
  );
}
