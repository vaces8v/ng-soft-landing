import { PrismaClient } from '../lib/generated/prisma';
import { hash } from 'bcryptjs';
import * as readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdmin() {
  try {
    console.log('\n=== Создание администратора ===\n');

    const name = await question('Имя администратора: ');
    const email = await question('Email администратора: ');
    const password = await question('Пароль: ');

    if (!name || !email || !password) {
      console.error('\n❌ Все поля обязательны для заполнения!');
      process.exit(1);
    }

    // Проверяем, существует ли уже пользователь с таким email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.error(`\n❌ Пользователь с email ${email} уже существует!`);
      process.exit(1);
    }

    // Хешируем пароль
    const hashedPassword = await hash(password, 10);

    // Создаем администратора
    const admin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('\n✅ Администратор успешно создан!');
    console.log('\nДанные для входа:');
    console.log(`Email: ${admin.email}`);
    console.log(`Пароль: ${password}`);
    console.log('\nВы можете войти в админ-панель по адресу: http://localhost:3000/admin');
  } catch (error) {
    console.error('\n❌ Ошибка при создании администратора:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

createAdmin();
