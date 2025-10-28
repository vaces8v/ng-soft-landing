import { PrismaClient } from '../lib/generated/prisma';

const prisma = new PrismaClient();

const initialVacancies = [
  {
    title: 'Senior Frontend Developer',
    type: 'Полная занятость',
    location: 'Удаленно / Офис',
    icon: 'lucide:code-2',
    description: 'Ищем опытного frontend разработчика для работы над сложными веб-приложениями.',
    requirements: [
      'Опыт с React/Next.js 3+ года',
      'TypeScript, современные практики',
      'Понимание производительности',
    ],
    status: 'active',
  },
  {
    title: 'Backend Developer (Node.js)',
    type: 'Полная занятость',
    location: 'Удаленно',
    icon: 'lucide:server',
    description: 'Разработка и поддержка серверной части приложений на Node.js.',
    requirements: [
      'Node.js, Express/Fastify',
      'PostgreSQL, MongoDB',
      'Опыт с микросервисами',
    ],
    status: 'active',
  },
  {
    title: 'UI/UX Designer',
    type: 'Полная занятость',
    location: 'Гибрид',
    icon: 'lucide:palette',
    description: 'Создание интуитивных и красивых интерфейсов для веб и мобильных приложений.',
    requirements: [
      'Figma, Adobe Creative Suite',
      'Портфолио с реальными кейсами',
      'Понимание UX принципов',
    ],
    status: 'active',
  },
  {
    title: 'DevOps Engineer',
    type: 'Полная занятость',
    location: 'Удаленно',
    icon: 'lucide:git-branch',
    description: 'Автоматизация процессов разработки и развертывания приложений.',
    requirements: [
      'Docker, Kubernetes',
      'CI/CD (GitHub Actions, GitLab)',
      'AWS/Azure опыт',
    ],
    status: 'active',
  },
];

async function main() {
  console.log('🌱 Seeding vacancies...');

  for (const vacancy of initialVacancies) {
    const created = await prisma.vacancy.create({
      data: vacancy,
    });
    console.log(`✅ Created vacancy: ${created.title}`);
  }

  console.log('✨ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding vacancies:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
