# Docker Scripts

Скрипты для работы с Docker контейнерами проекта.

## Доступные скрипты

### `dev.sh` - PostgreSQL для локальной разработки

Скрипт для управления PostgreSQL контейнером во время разработки.

#### Использование:

```bash
# Запустить PostgreSQL
./scripts/docker/dev.sh start

# Остановить PostgreSQL
./scripts/docker/dev.sh stop

# Перезапустить PostgreSQL
./scripts/docker/dev.sh restart

# Показать логи
./scripts/docker/dev.sh logs

# Показать статус
./scripts/docker/dev.sh status

# Удалить контейнер и данные
./scripts/docker/dev.sh clean
```

#### Параметры подключения:

После запуска скрипт выведет параметры подключения:

```bash
Host: localhost
Port: 5432
User: ngsoft
Password: ngsoft_password
Database: ngsoft
```

#### DATABASE_URL для .env:

```bash
DATABASE_URL="postgresql://ngsoft:ngsoft_password@localhost:5432/ngsoft?schema=public"
```

## Docker Compose

Для запуска всего проекта (приложение + PostgreSQL) используйте docker-compose в корне проекта:

```bash
# Запустить все сервисы
docker-compose up -d

# Остановить все сервисы
docker-compose down

# Пересобрать и запустить
docker-compose up -d --build

# Показать логи
docker-compose logs -f

# Показать логи конкретного сервиса
docker-compose logs -f app
docker-compose logs -f postgres

# Остановить и удалить все данные
docker-compose down -v
```

## Первый запуск

### Вариант 1: Только PostgreSQL (локальная разработка)

1. Запустите PostgreSQL:
   ```bash
   ./scripts/docker/dev.sh start
   ```

2. Создайте `.env` файл с параметрами подключения

3. Запустите миграции:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. Запустите приложение локально:
   ```bash
   npm run dev
   ```

### Вариант 2: Полный Docker Compose

1. Создайте `.env` файл (или измените переменные в docker-compose.yml)

2. Запустите все сервисы:
   ```bash
   docker-compose up -d
   ```

3. Приложение будет доступно на http://localhost:3000

## Полезные команды

### Подключение к PostgreSQL

```bash
# Через docker exec
docker exec -it ngsoft-postgres-dev psql -U ngsoft -d ngsoft

# Через docker-compose
docker-compose exec postgres psql -U ngsoft -d ngsoft
```

### Просмотр логов

```bash
# Скрипт dev.sh
./scripts/docker/dev.sh logs

# Docker compose
docker-compose logs -f app
```

### Очистка данных

```bash
# Удалить только контейнер dev PostgreSQL
./scripts/docker/dev.sh clean

# Удалить все сервисы и volumes docker-compose
docker-compose down -v
```
