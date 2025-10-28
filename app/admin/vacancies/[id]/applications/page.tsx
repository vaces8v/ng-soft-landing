import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ApplicationsViewer } from '@/components/admin/applications-viewer';

export default async function VacancyApplicationsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();

  if (!session?.user) {
    redirect('/admin/login');
  }

  const { id } = await params;

  return <ApplicationsViewer vacancyId={id} />;
}
