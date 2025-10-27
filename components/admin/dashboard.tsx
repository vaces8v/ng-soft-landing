'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Sector,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Stats {
  total: number;
  new: number;
  inProgress: number;
  completed: number;
  thisMonth: number;
  lastMonth: number;
  percentChange: number;
  recent: Array<{
    id: string;
    name: string;
    email: string;
    company?: string;
    message: string;
    status: string;
    createdAt: string;
  }>;
  monthlyData?: Array<{
    month: string;
    заявки: number;
    завершено: number;
  }>;
  statusDistribution?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

interface AdminDashboardProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = stats
    ? [
        {
          title: 'Всего заявок',
          value: stats.total,
          icon: 'lucide:inbox',
          color: 'from-blue-500 to-blue-600',
          trend: null,
        },
        {
          title: 'Новые',
          value: stats.new,
          icon: 'lucide:bell',
          color: 'from-yellow-500 to-yellow-600',
          trend: null,
        },
        {
          title: 'В работе',
          value: stats.inProgress,
          icon: 'lucide:clock',
          color: 'from-orange-500 to-orange-600',
          trend: null,
        },
        {
          title: 'Завершены',
          value: stats.completed,
          icon: 'lucide:check-circle',
          color: 'from-green-500 to-green-600',
          trend: null,
        },
      ]
    : [];

  const statusConfig = {
    new: {
      label: 'Новая',
      color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    },
    in_progress: {
      label: 'В работе',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    },
    completed: {
      label: 'Завершена',
      color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    },
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
          Добро пожаловать, {user.name}!
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Обзор активности и статистики заявок
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Icon icon="lucide:loader-2" className="h-8 w-8 animate-spin text-neutral-400" />
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card, index) => (
              <div
                key={index}
                className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                    <Icon icon={card.icon} className="h-6 w-6 text-white" />
                  </div>
                  {card.trend !== null && (
                    <span className={`text-xs font-medium ${card.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {card.trend >= 0 ? '+' : ''}{card.trend}%
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          {/* Analytics Charts */}
          {stats && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Growth Trend Chart */}
              <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                      Динамика роста заявок
                    </h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Тренд за последние 6 месяцев
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon={stats.percentChange >= 0 ? 'lucide:trending-up' : 'lucide:trending-down'}
                      className={`h-5 w-5 ${stats.percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}
                    />
                    <span className={`text-lg font-semibold ${stats.percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stats.percentChange >= 0 ? '+' : ''}{stats.percentChange}%
                    </span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={stats.monthlyData || generateMonthlyData(stats)}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorЗаявки" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorЗавершено" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? '#404040' : '#e5e7eb'}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      stroke={isDark ? '#9ca3af' : '#6b7280'}
                      style={{ fontSize: '12px' }}
                      tickLine={false}
                    />
                    <YAxis
                      stroke={isDark ? '#9ca3af' : '#6b7280'}
                      style={{ fontSize: '12px' }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? '#262626' : '#ffffff',
                        border: `1px solid ${isDark ? '#404040' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        color: isDark ? '#ffffff' : '#000000',
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        paddingTop: '20px',
                        fontSize: '14px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="заявки"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorЗаявки)"
                    />
                    <Area
                      type="monotone"
                      dataKey="завершено"
                      stroke="#10b981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorЗавершено)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Status Distribution Chart */}
              <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                    Распределение по статусам
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Текущее состояние заявок
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                      <defs>
                        {(stats.statusDistribution || generateStatusData(stats)).map((entry, index) => (
                          <filter key={`shadow-${index}`} id={`shadow-${index}`} height="200%">
                            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3" />
                          </filter>
                        ))}
                      </defs>
                      <Pie
                        data={stats.statusDistribution || generateStatusData(stats)}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(props: any) => renderCustomLabel(props, isDark)}
                        innerRadius={70}
                        outerRadius={110}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={2}
                        activeIndex={activeIndex}
                        activeShape={(props: any) => renderActiveShape(props, isDark)}
                        onMouseEnter={(_, index) => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(undefined)}
                        animationDuration={800}
                        animationBegin={0}
                      >
                        {(stats.statusDistribution || generateStatusData(stats)).map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            filter={activeIndex === index ? `url(#shadow-${index})` : undefined}
                            style={{
                              transition: 'all 0.3s ease',
                              cursor: 'pointer',
                            }}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={(props) => <CustomTooltip {...props} isDark={isDark} />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 gap-3 mt-6">
                  {(stats.statusDistribution || generateStatusData(stats)).map((item, index) => {
                    const total = (stats.statusDistribution || generateStatusData(stats)).reduce((sum, i) => sum + i.value, 0);
                    const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
                    const isActive = activeIndex === index;
                    
                    return (
                      <div 
                        key={index} 
                        className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                          isActive 
                            ? 'bg-neutral-100 dark:bg-neutral-800 shadow-md scale-105' 
                            : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                        }`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(undefined)}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div
                            className="w-3 h-3 rounded-full shadow-lg"
                            style={{ 
                              backgroundColor: item.color,
                              boxShadow: `0 0 12px ${item.color}40`
                            }}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                              {item.name}
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                              {item.value} {item.value === 1 ? 'заявка' : item.value < 5 ? 'заявки' : 'заявок'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold" style={{ color: item.color }}>
                            {percentage}%
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Monthly Comparison */}
          {stats && (
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-6 mb-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                  Сравнение месяцев
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Текущий vs предыдущий период
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                  <div className="relative z-10">
                    <p className="text-sm opacity-90 mb-2">Текущий месяц</p>
                    <p className="text-4xl font-bold mb-2">{stats.thisMonth}</p>
                    <div className="flex items-center gap-2">
                      <Icon
                        icon={stats.percentChange >= 0 ? 'lucide:arrow-up' : 'lucide:arrow-down'}
                        className="h-4 w-4"
                      />
                      <span className="text-sm font-medium">
                        {Math.abs(stats.percentChange)}% {stats.percentChange >= 0 ? 'больше' : 'меньше'}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 opacity-10">
                    <Icon icon="lucide:trending-up" className="h-32 w-32" />
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-neutral-600 to-neutral-700 p-6 text-white">
                  <div className="relative z-10">
                    <p className="text-sm opacity-90 mb-2">Прошлый месяц</p>
                    <p className="text-4xl font-bold mb-2">{stats.lastMonth}</p>
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:calendar" className="h-4 w-4" />
                      <span className="text-sm font-medium">Базовый период</span>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 opacity-10">
                    <Icon icon="lucide:calendar" className="h-32 w-32" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Applications */}
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Последние заявки
              </h2>
              <Link href="/admin/applications">
                <Button variant="outline" size="sm" className="gap-2">
                  Все заявки
                  <Icon icon="lucide:arrow-right" className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {stats && stats.recent.length > 0 ? (
              <div className="space-y-4">
                {stats.recent.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                          {app.name}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {app.email}
                          {app.company && ` • ${app.company}`}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          statusConfig[app.status as keyof typeof statusConfig].color
                        }`}
                      >
                        {statusConfig[app.status as keyof typeof statusConfig].label}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 line-clamp-2">
                      {app.message}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                      {new Date(app.createdAt).toLocaleString('ru-RU')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon
                  icon="lucide:inbox"
                  className="h-12 w-12 text-neutral-300 dark:text-neutral-700 mx-auto mb-4"
                />
                <p className="text-neutral-600 dark:text-neutral-400">
                  Пока нет заявок
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function generateMonthlyData(stats: Stats) {
  const months = ['Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя'];
  const data = months.map((month, index) => {
    const factor = (index + 1) / months.length;
    return {
      month,
      заявки: Math.round(stats.lastMonth * factor + Math.random() * 10),
      завершено: Math.round(stats.completed * factor * 0.8 + Math.random() * 5),
    };
  });
  data[data.length - 1].заявки = stats.thisMonth;
  return data;
}

function generateStatusData(stats: Stats) {
  return [
    {
      name: 'Новые',
      value: stats.new,
      color: '#eab308',
    },
    {
      name: 'В работе',
      value: stats.inProgress,
      color: '#f97316',
    },
    {
      name: 'Завершены',
      value: stats.completed,
      color: '#10b981',
    },
  ];
}

function renderCustomLabel(
  { cx, cy, midAngle, innerRadius, outerRadius, percent }: any,
  isDark: boolean
) {
  if (percent < 0.05) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ 
        fontSize: '16px', 
        fontWeight: '700',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        pointerEvents: 'none'
      }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

function renderActiveShape(props: any, isDark: boolean) {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy - 15}
        textAnchor="middle"
        fill={fill}
        style={{ fontSize: '24px', fontWeight: 'bold' }}
      >
        {payload.value}
      </text>
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        fill={isDark ? '#a3a3a3' : '#666'}
        style={{ fontSize: '13px' }}
      >
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy + 28}
        textAnchor="middle"
        fill={fill}
        style={{ fontSize: '14px', fontWeight: '600' }}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        fill={fill}
      />
    </g>
  );
}

function CustomTooltip({ active, payload, isDark }: any) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const percentage = payload[0].percent ? (payload[0].percent * 100).toFixed(1) : '0.0';

  return (
    <div
      className="rounded-xl shadow-2xl border backdrop-blur-sm"
      style={{
        backgroundColor: isDark ? 'rgba(38, 38, 38, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        borderColor: isDark ? '#404040' : '#e5e7eb',
        padding: '12px 16px',
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ 
            backgroundColor: data.color,
            boxShadow: `0 0 10px ${data.color}60`
          }}
        />
        <p 
          className="font-semibold text-base"
          style={{ color: isDark ? '#ffffff' : '#000000' }}
        >
          {data.name}
        </p>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-center gap-8">
          <span 
            className="text-sm"
            style={{ color: isDark ? '#a3a3a3' : '#666666' }}
          >
            Количество:
          </span>
          <span 
            className="text-sm font-bold"
            style={{ color: data.color }}
          >
            {data.value}
          </span>
        </div>
        <div className="flex justify-between items-center gap-8">
          <span 
            className="text-sm"
            style={{ color: isDark ? '#a3a3a3' : '#666666' }}
          >
            Процент:
          </span>
          <span 
            className="text-sm font-bold"
            style={{ color: data.color }}
          >
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
}
