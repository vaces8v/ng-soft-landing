import { PrismaClient } from '../lib/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Checking vacancies in database...');
  
  const vacancies = await prisma.vacancy.findMany();
  
  console.log(`Found ${vacancies.length} vacancies:`);
  vacancies.forEach((v, i) => {
    console.log(`${i + 1}. ${v.title} (${v.status})`);
  });
  
  if (vacancies.length === 0) {
    console.log('\n⚠️  No vacancies found. Run: npx tsx scripts/seed-vacancies.ts');
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
