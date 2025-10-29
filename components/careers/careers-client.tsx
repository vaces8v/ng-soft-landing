'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { ApplicationDrawer } from './application-drawer';
import type { Vacancy } from '@/lib/vacancies-store';

interface CareersClientProps {
  vacancies: Vacancy[];
}

export function CareersClient({ vacancies }: CareersClientProps) {
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleApply = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <div className="grid gap-6">
        {vacancies.map((position) => (
          <article
            key={position.id}
            className="group rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Icon icon={position.icon} className="h-8 w-8" />
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Icon icon="lucide:clock" className="h-4 w-4" />
                        {position.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon icon="lucide:map-pin" className="h-4 w-4" />
                        {position.location}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleApply(position)}
                    className="group/btn bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900"
                  >
                    Откликнуться
                    <Icon icon="lucide:arrow-right" className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>

                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {position.description}
                </p>

                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">
                    Требования:
                  </h4>
                  <ul className="space-y-2">
                    {position.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <Icon icon="lucide:check" className="h-4 w-4 mt-0.5 flex-shrink-0 text-neutral-900 dark:text-white" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <ApplicationDrawer
        vacancy={selectedVacancy}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </>
  );
}
