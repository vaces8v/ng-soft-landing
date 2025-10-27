'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';

interface Application {
  id: string;
  name: string;
  phone: string;
  email: string;
  company?: string;
  message: string;
  status: 'new' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function ApplicationsList() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    fetchApplications();
  }, [statusFilter, currentPage]);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      });
      if (statusFilter) {
        params.append('status', statusFilter);
      }

      const response = await fetch(`/api/applications?${params}`);
      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchApplications();
        setSelectedApp(null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteApplication = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту заявку?')) return;

    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchApplications();
        setSelectedApp(null);
      }
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const statusConfig = {
    new: {
      label: 'Новая',
      color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      icon: 'lucide:bell',
    },
    in_progress: {
      label: 'В работе',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      icon: 'lucide:clock',
    },
    completed: {
      label: 'Завершена',
      color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      icon: 'lucide:check-circle',
    },
  };

  const filters = [
    { value: '', label: 'Все' },
    { value: 'new', label: 'Новые' },
    { value: 'in_progress', label: 'В работе' },
    { value: 'completed', label: 'Завершенные' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
          Заявки
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Управление заявками от клиентов
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-4 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Фильтр:
          </span>
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={statusFilter === filter.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setStatusFilter(filter.value);
                setCurrentPage(1);
              }}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Icon icon="lucide:loader-2" className="h-8 w-8 animate-spin text-neutral-400" />
        </div>
      ) : applications.length > 0 ? (
        <>
          <div className="grid gap-4 mb-6">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-white dark:text-neutral-900 font-semibold">
                          {app.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-neutral-900 dark:text-white mb-1">
                          {app.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                          <div className="flex items-center gap-1">
                            <Icon icon="lucide:mail" className="h-4 w-4" />
                            <a href={`mailto:${app.email}`} className="hover:underline">
                              {app.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon icon="lucide:phone" className="h-4 w-4" />
                            <a href={`tel:${app.phone}`} className="hover:underline">
                              {app.phone}
                            </a>
                          </div>
                          {app.company && (
                            <div className="flex items-center gap-1">
                              <Icon icon="lucide:building" className="h-4 w-4" />
                              <span>{app.company}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
                        {app.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                      <Icon icon="lucide:calendar" className="h-3 w-3" />
                      <span>Создана: {new Date(app.createdAt).toLocaleString('ru-RU')}</span>
                      {app.updatedAt !== app.createdAt && (
                        <>
                          <span>•</span>
                          <span>Обновлена: {new Date(app.updatedAt).toLocaleString('ru-RU')}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex lg:flex-col items-start gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusConfig[app.status].color}`}>
                      <Icon icon={statusConfig[app.status].icon} className="h-3 w-3" />
                      {statusConfig[app.status].label}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedApp(app)}
                      className="gap-2"
                    >
                      <Icon icon="lucide:settings" className="h-4 w-4" />
                      Управление
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <Icon icon="lucide:chevron-left" className="h-4 w-4" />
              </Button>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Страница {currentPage} из {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={currentPage === pagination.totalPages}
              >
                <Icon icon="lucide:chevron-right" className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-12 text-center">
          <Icon
            icon="lucide:inbox"
            className="h-16 w-16 text-neutral-300 dark:text-neutral-700 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Заявок не найдено
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            {statusFilter ? 'Попробуйте изменить фильтр' : 'Пока нет заявок от клиентов'}
          </p>
        </div>
      )}

      {/* Modal for managing application */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Управление заявкой
              </h3>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
              >
                <Icon icon="lucide:x" className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  Изменить статус:
                </p>
                <div className="space-y-2">
                  {Object.entries(statusConfig).map(([status, config]) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedApp.id, status)}
                      className={`w-full p-3 rounded-lg border transition-colors ${
                        selectedApp.status === status
                          ? 'border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800'
                          : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon icon={config.icon} className="h-5 w-5" />
                        <span className="font-medium text-neutral-900 dark:text-white">
                          {config.label}
                        </span>
                        {selectedApp.status === status && (
                          <Icon
                            icon="lucide:check"
                            className="h-5 w-5 ml-auto text-green-600"
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <Button
                  variant="outline"
                  onClick={() => deleteApplication(selectedApp.id)}
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 gap-2"
                >
                  <Icon icon="lucide:trash-2" className="h-4 w-4" />
                  Удалить заявку
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
