'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Vacancy } from '@/lib/vacancies-store';

const ICON_OPTIONS = [
  { value: 'lucide:code-2', label: 'Код / Разработка' },
  { value: 'lucide:server', label: 'Сервер / Backend' },
  { value: 'lucide:palette', label: 'Дизайн / UI/UX' },
  { value: 'lucide:git-branch', label: 'DevOps / Git' },
  { value: 'lucide:database', label: 'База данных' },
  { value: 'lucide:smartphone', label: 'Мобильная разработка' },
  { value: 'lucide:cloud', label: 'Облачные технологии' },
  { value: 'lucide:shield', label: 'Безопасность' },
  { value: 'lucide:chart-bar', label: 'Аналитика / Data' },
  { value: 'lucide:users', label: 'Команда / HR' },
  { value: 'lucide:briefcase', label: 'Бизнес / Менеджмент' },
  { value: 'lucide:megaphone', label: 'Маркетинг' },
  { value: 'lucide:pen-tool', label: 'Креатив / Контент' },
  { value: 'lucide:headphones', label: 'Поддержка / Support' },
  { value: 'lucide:rocket', label: 'Продукт / Стартап' },
];

export function VacanciesManager() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [applications, setApplications] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    location: '',
    icon: 'lucide:briefcase',
    description: '',
    requirements: [''],
  });

  useEffect(() => {
    fetchVacancies();
  }, []);

  useEffect(() => {
    fetchApplicationsCounts();
  }, [vacancies]);

  const fetchVacancies = async () => {
    try {
      const res = await fetch('/api/vacancies');
      const data = await res.json();
      setVacancies(data);
    } catch (error) {
      console.error('Error fetching vacancies:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicationsCounts = async () => {
    try {
      const counts: Record<string, number> = {};
      vacancies.forEach((vacancy: any) => {
        if (vacancy._count?.jobApplications) {
          counts[vacancy.id] = vacancy._count.jobApplications;
        }
      });
      setApplications(counts);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleCreate = () => {
    setEditingVacancy(null);
    setFormData({
      title: '',
      type: '',
      location: '',
      icon: 'lucide:briefcase',
      description: '',
      requirements: [''],
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (vacancy: Vacancy) => {
    setEditingVacancy(vacancy);
    setFormData({
      title: vacancy.title,
      type: vacancy.type,
      location: vacancy.location,
      icon: vacancy.icon,
      description: vacancy.description,
      requirements: vacancy.requirements,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      const url = editingVacancy
        ? `/api/vacancies/${editingVacancy.id}`
        : '/api/vacancies';
      const method = editingVacancy ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await fetchVacancies();
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error('Error saving vacancy:', error);
    }
  };

  const handleStatusChange = async (vacancyId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/vacancies/${vacancyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        await fetchVacancies();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту вакансию?')) return;

    try {
      const res = await fetch(`/api/vacancies/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        await fetchVacancies();
      }
    } catch (error) {
      console.error('Error deleting vacancy:', error);
    }
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, ''],
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req),
    }));
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string; color: string }> = {
      active: { variant: 'default', label: 'Активна', color: 'bg-green-500' },
      closed: { variant: 'outline', label: 'Закрыта', color: 'bg-red-500' },
    };
    const config = variants[status] || variants.active;
    return (
      <Badge variant={config.variant} className="gap-1">
        <div className={`w-2 h-2 rounded-full ${config.color}`} />
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icon icon="lucide:loader-2" className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold">Управление вакансиями</h1>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mt-2">
            Создавайте и редактируйте вакансии
          </p>
        </div>
        <Button onClick={handleCreate} className="w-full sm:w-auto">
          <Icon icon="lucide:plus" className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Создать вакансию</span>
          <span className="sm:hidden">Создать</span>
        </Button>
      </div>

      <div className="grid gap-4 md:gap-6">
        {vacancies.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Icon icon="lucide:inbox" className="h-12 w-12 mx-auto mb-4 text-neutral-400" />
              <p className="text-sm md:text-lg text-neutral-600 dark:text-neutral-400">
                Нет вакансий
              </p>
            </CardContent>
          </Card>
        ) : (
          vacancies.map((vacancy) => (
            <Card key={vacancy.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center flex-shrink-0">
                      <Icon icon={vacancy.icon} className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg md:text-2xl truncate">{vacancy.title}</CardTitle>
                      <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-xs md:text-sm">
                        <span className="flex items-center gap-1">
                          <Icon icon="lucide:briefcase" className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{vacancy.type}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon icon="lucide:map-pin" className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{vacancy.location}</span>
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusBadge(vacancy.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                  {vacancy.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {vacancy.requirements.slice(0, 3).map((req, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                  {vacancy.requirements.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{vacancy.requirements.length - 3}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(vacancy)}
                    className="flex-1 sm:flex-none"
                  >
                    <Icon icon="lucide:edit" className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Редактировать</span>
                  </Button>
                  {vacancy.status === 'active' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(vacancy.id, 'closed')}
                      className="flex-1 sm:flex-none"
                    >
                      <Icon icon="lucide:x" className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Закрыть</span>
                    </Button>
                  )}
                  {vacancy.status === 'closed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(vacancy.id, 'active')}
                      className="flex-1 sm:flex-none"
                    >
                      <Icon icon="lucide:check" className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Открыть</span>
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(vacancy.id)}
                    className="flex-1 sm:flex-none"
                  >
                    <Icon icon="lucide:trash-2" className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Удалить</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 sm:flex-none"
                  >
                    <a href={`/admin/vacancies/${vacancy.id}/applications`}>
                      <Icon icon="lucide:file-text" className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Отклики ({applications[vacancy.id] || 0})</span>
                      <span className="sm:hidden">({applications[vacancy.id] || 0})</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingVacancy ? 'Редактировать вакансию' : 'Создать вакансию'}
            </DialogTitle>
            <DialogDescription>
              Заполните информацию о вакансии
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className='space-y-1'>
              <Label htmlFor="title">Название вакансии</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Senior Frontend Developer"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className='space-y-1'>
                <Label htmlFor="type">Тип занятости</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  placeholder="Полная занятость"
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor="location">Локация</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Удаленно / Офис"
                />
              </div>
            </div>
            <div className='space-y-1'>
              <Label htmlFor="icon">Иконка</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) => setFormData({ ...formData, icon: value })}
              >
                <SelectTrigger>
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <Icon icon={formData.icon} className="h-4 w-4" />
                      <span>{ICON_OPTIONS.find(opt => opt.value === formData.icon)?.label || 'Выберите иконку'}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {ICON_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <Icon icon={option.value} className="h-4 w-4" />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-1'>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Описание вакансии..."
                rows={4}
              />
            </div>
            <div>
              <Label>Требования</Label>
              <div className="space-y-2 mt-2">
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={req}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                      placeholder="Требование..."
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeRequirement(index)}
                      disabled={formData.requirements.length === 1}
                    >
                      <Icon icon="lucide:x" className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addRequirement}
                >
                  <Icon icon="lucide:plus" className="h-4 w-4 mr-2" />
                  Добавить требование
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSave}>
              {editingVacancy ? 'Сохранить' : 'Создать'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
