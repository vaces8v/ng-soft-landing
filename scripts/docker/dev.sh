#!/bin/bash

set -e

CONTAINER_NAME="ngsoft-postgres-dev"
POSTGRES_USER="ngsoft"
POSTGRES_PASSWORD="ngsoft_password"
POSTGRES_DB="ngsoft"
POSTGRES_PORT="5432"
VOLUME_NAME="ngsoft-postgres-data"

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

start_postgres() {
    echo "Запуск PostgreSQL контейнера..."
    
    # Проверяем, запущен ли контейнер
    if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
        print_warning "Контейнер $CONTAINER_NAME уже запущен"
        return
    fi
    
    # Проверяем, существует ли остановленный контейнер
    if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
        print_warning "Запуск существующего контейнера..."
        docker start $CONTAINER_NAME
    else
        # Создаем и запускаем новый контейнер
        docker run -d \
            --name $CONTAINER_NAME \
            -e POSTGRES_USER=$POSTGRES_USER \
            -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
            -e POSTGRES_DB=$POSTGRES_DB \
            -e PGDATA=/var/lib/postgresql/data/pgdata \
            -p $POSTGRES_PORT:5432 \
            -v $VOLUME_NAME:/var/lib/postgresql/data \
            --restart unless-stopped \
            postgres:16-alpine
    fi
    
    echo "Ожидание готовности базы данных..."
    sleep 3
    
    max_attempts=30
    attempt=0
    
    while [ $attempt -lt $max_attempts ]; do
        if docker exec $CONTAINER_NAME pg_isready -U $POSTGRES_USER > /dev/null 2>&1; then
            print_success "PostgreSQL готов к работе!"
            echo ""
            echo "Параметры подключения:"
            echo "  Host: localhost"
            echo "  Port: $POSTGRES_PORT"
            echo "  User: $POSTGRES_USER"
            echo "  Password: $POSTGRES_PASSWORD"
            echo "  Database: $POSTGRES_DB"
            echo ""
            echo "DATABASE_URL=\"postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:$POSTGRES_PORT/$POSTGRES_DB?schema=public\""
            return
        fi
        attempt=$((attempt + 1))
        sleep 1
    done
    
    print_error "Не удалось дождаться готовности PostgreSQL"
    exit 1
}

stop_postgres() {
    echo "Остановка PostgreSQL контейнера..."
    
    if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
        docker stop $CONTAINER_NAME
        print_success "Контейнер остановлен"
    else
        print_warning "Контейнер не запущен"
    fi
}

restart_postgres() {
    stop_postgres
    sleep 2
    start_postgres
}

show_logs() {
    if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
        docker logs -f $CONTAINER_NAME
    else
        print_error "Контейнер не найден"
        exit 1
    fi
}

clean_postgres() {
    echo "Удаление контейнера и данных..."
    
    # Останавливаем и удаляем контейнер
    if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
        docker stop $CONTAINER_NAME 2>/dev/null || true
        docker rm $CONTAINER_NAME
        print_success "Контейнер удален"
    fi
    
    if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
        read -p "Удалить данные базы данных? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            docker volume rm $VOLUME_NAME
            print_success "Данные удалены"
        fi
    fi
}

status_postgres() {
    if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
        print_success "PostgreSQL работает"
        docker ps -f name=$CONTAINER_NAME
    elif [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
        print_warning "PostgreSQL остановлен"
    else
        print_warning "PostgreSQL не установлен"
    fi
}

# Основная логика
case "${1:-start}" in
    start)
        start_postgres
        ;;
    stop)
        stop_postgres
        ;;
    restart)
        restart_postgres
        ;;
    logs)
        show_logs
        ;;
    clean)
        clean_postgres
        ;;
    status)
        status_postgres
        ;;
    *)
        echo "Использование: $0 {start|stop|restart|logs|clean|status}"
        echo ""
        echo "Команды:"
        echo "  start   - Запустить PostgreSQL"
        echo "  stop    - Остановить PostgreSQL"
        echo "  restart - Перезапустить PostgreSQL"
        echo "  logs    - Показать логи"
        echo "  clean   - Удалить контейнер и данные"
        echo "  status  - Показать статус"
        exit 1
        ;;
esac
