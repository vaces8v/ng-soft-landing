import { PrismaClient } from '../lib/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Checking job applications in database...');
  
  const applications = await prisma.jobApplication.findMany({
    include: {
      vacancy: {
        select: {
          title: true,
        },
      },
    },
  });
  
  console.log(`Found ${applications.length} applications:`);
  applications.forEach((app, i) => {
    console.log(`${i + 1}. ${app.name} -> ${app.vacancy.title} (${app.status})`);
  });
  
  if (applications.length === 0) {
    console.log('\n⚠️  No applications found.');
  }
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
