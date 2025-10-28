'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Application, Vacancy } from '@/lib/vacancies-store';

interface ApplicationsViewerProps {
  vacancyId: string;
}

export function ApplicationsViewer({ vacancyId }: ApplicationsViewerProps) {
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'reviewed' | 'accepted' | 'rejected'>('all');
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectingApplicationId, setRejectingApplicationId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [vacancyId]);

  const fetchData = async () => {
    try {
      const [vacancyRes, appsRes] = await Promise.all([
        fetch(`/api/vacancies/${vacancyId}`),
        fetch(`/api/job-applications?vacancyId=${vacancyId}`),
      ]);
      
      const vacancyData = await vacancyRes.json();
      const appsData = await appsRes.json();
      
      setVacancy(vacancyData);
      setApplications(Array.isArray(appsData) ? appsData : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId: string, status: Application['status']) => {
    // Если статус "rejected", показываем диалог подтверждения
    if (status === 'rejected') {
      setRejectingApplicationId(applicationId);
      setIsRejectDialogOpen(true);
      return;
    }

    try {
      const res = await fetch(`/api/job-applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleRejectConfirm = async () => {
    if (!rejectingApplicationId) return;

    try {
      const res = await fetch(`/api/job-applications/${rejectingApplicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' }),
      });

      if (res.ok) {
        await fetchData();
        setIsRejectDialogOpen(false);
        setRejectingApplicationId(null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleRejectCancel = () => {
    setIsRejectDialogOpen(false);
    setRejectingApplicationId(null);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string; color: string }> = {
      new: { variant: 'default', label: 'Новый', color: 'bg-blue-500' },
      reviewed: { variant: 'secondary', label: 'Просмотрен', color: 'bg-yellow-500' },
      accepted: { variant: 'default', label: 'Принят', color: 'bg-green-500' },
      rejected: { variant: 'outline', label: 'Отклонен', color: 'bg-red-500' },
    };
    const config = variants[status] || variants.new;
    return (
      <Badge variant={config.variant} className="gap-1">
        <div className={`w-2 h-2 rounded-full ${config.color}`} />
        {config.label}
      </Badge>
    );
  };

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  const counts = {
    all: applications.length,
    new: applications.filter(a => a.status === 'new').length,
    reviewed: applications.filter(a => a.status === 'reviewed').length,
    accepted: applications.filter(a => a.status === 'accepted').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icon icon="lucide:loader-2" className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!vacancy) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Вакансия не найдена</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <div className="mb-6 md:mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <a href="/admin/vacancies">
            <Icon icon="lucide:arrow-left" className="h-4 w-4" />
            <span className="hidden sm:inline">Назад к вакансиям</span>
            <span className="sm:hidden">Назад</span>
          </a>
        </Button>
        <h1 className="text-2xl md:text-4xl font-bold">{vacancy.title}</h1>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mt-2">
          Отклики на вакансию
        </p>
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="mb-6">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="all" className="text-xs md:text-sm">Все ({counts.all})</TabsTrigger>
          <TabsTrigger value="new" className="text-xs md:text-sm">Новые ({counts.new})</TabsTrigger>
          <TabsTrigger value="reviewed" className="text-xs md:text-sm">Просмотрены ({counts.reviewed})</TabsTrigger>
          <TabsTrigger value="accepted" className="text-xs md:text-sm">Приняты ({counts.accepted})</TabsTrigger>
          <TabsTrigger value="rejected" className="text-xs md:text-sm">Отклонены ({counts.rejected})</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6">
        {filteredApplications.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Icon icon="lucide:inbox" className="h-12 w-12 mx-auto mb-4 text-neutral-400" />
              <p className="text-neutral-600 dark:text-neutral-400">
                Нет откликов
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredApplications.map((application) => (
            <Card key={application.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg md:text-xl">{application.name}</CardTitle>
                    <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-xs md:text-sm">
                      <span className="flex items-center gap-1 truncate">
                        <Icon icon="lucide:mail" className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{application.email}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon icon="lucide:phone" className="h-4 w-4 flex-shrink-0" />
                        {application.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon icon="lucide:calendar" className="h-4 w-4 flex-shrink-0" />
                        {new Date(application.createdAt).toLocaleDateString('ru-RU')}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusBadge(application.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="text-sm md:text-base font-semibold mb-2">Сопроводительное письмо:</h4>
                  <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap break-words">
                    {application.coverLetter}
                  </p>
                </div>
                {application.resume && (
                  <div className="mb-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href={application.resume} target="_blank" rel="noopener noreferrer">
                        <Icon icon="lucide:file-text" className="h-4 w-4" />
                        Скачать резюме
                      </a>
                    </Button>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {application.status !== 'reviewed' && application.status !== 'accepted' && application.status !== 'rejected' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(application.id, 'reviewed')}
                    >
                      <Icon icon="lucide:eye" className="h-4 w-4" />
                      Отметить просмотренным
                    </Button>
                  )}
                  {application.status !== 'accepted' && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleStatusChange(application.id, 'accepted')}
                    >
                      <Icon icon="lucide:check" className="h-4 w-4" />
                      Принять
                    </Button>
                  )}
                  {application.status !== 'rejected' && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleStatusChange(application.id, 'rejected')}
                    >
                      <Icon icon="lucide:x" className="h-4 w-4" />
                      Отклонить
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Подтверждение отклонения</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите отклонить эту заявку? Кандидат будет уведомлен об отклонении.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 space-x-1 sm:gap-0">
            <Button variant="outline" onClick={handleRejectCancel}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={handleRejectConfirm}>
              <Icon icon="lucide:x" className="h-4 w-4" />
              Отклонить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
