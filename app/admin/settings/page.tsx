import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Settings } from '@/components/admin/settings';

export default async function AdminSettingsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/admin/login');
  }
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <Settings />
      </div>
    </div>
  );
}
