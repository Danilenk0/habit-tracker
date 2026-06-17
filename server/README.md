# Habits Tracker API

Сервер для отслеживания привычек на Express + MongoDB.

## Установка

```bash
npm install
```

## Конфигурация

Создайте файл `.env` и установите следующие переменные:

```
MONGODB_URI=mongodb://localhost:27017/habits-tracker
JWT_SECRET=your_jwt_secret_key_change_this
PORT=5000
NODE_ENV=development
```

## Запуск

```bash
npm start
```

Для разработки с автоперезагрузкой (требуется nodemon):

```bash
npm install -D nodemon
npm run dev
```

## API Endpoints

### Аутентификация

#### Регистрация
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "user": { "id": "...", "email": "user@example.com" },
  "token": "eyJhbGc..."
}
```

#### Вход
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "user": { "id": "...", "email": "user@example.com" },
  "token": "eyJhbGc..."
}
```

### Привычки

Все запросы требуют заголовка:
```
Authorization: Bearer <token>
```

#### Создать привычку
```
POST /api/habits
Content-Type: application/json

{
  "title": "Чтение",
  "description": "Читать 30 минут в день",
  "frequency": "daily",
  "color": "#FF6B6B"
}

Response: 201 Created
{
  "_id": "...",
  "userId": "...",
  "title": "Чтение",
  "description": "Читать 30 минут в день",
  "frequency": "daily",
  "color": "#FF6B6B",
  "createdAt": "2026-06-17..."
}
```

#### Получить все привычки пользователя
```
GET /api/habits

Response: 200 OK
[
  {
    "_id": "...",
    "title": "Чтение",
    ...
  }
]
```

#### Обновить привычку
```
PATCH /api/habits/:id
Content-Type: application/json

{
  "title": "Чтение книг",
  "frequency": "weekly",
  "color": "#4ECDC4"
}

Response: 200 OK
{
  "_id": "...",
  "title": "Чтение книг",
  ...
}
```

#### Удалить привычку
```
DELETE /api/habits/:id

Response: 200 OK
{
  "message": "Habit deleted"
}
```

## Параметры привычки

- **title** (обязательно): Название привычки
- **description**: Описание привычки (по умолчанию: пустая строка)
- **frequency**: "daily" или "weekly" (по умолчанию: "daily")
- **color**: HEX цвет (по умолчанию: "#3498db")

## Структура проекта

```
.
├── config/
│   └── db.js           # Конфигурация MongoDB
├── models/
│   ├── User.js         # Модель пользователя
│   └── Habit.js        # Модель привычки
├── controllers/
│   ├── authController.js    # Логика авторизации
│   └── habitsController.js  # Логика работы с привычками
├── routes/
│   ├── auth.js         # Роуты авторизации
│   └── habits.js       # Роуты привычек
├── middleware/
│   └── auth.js         # JWT middleware
├── server.js           # Точка входа приложения
├── .env                # Переменные окружения
└── package.json        # Зависимости проекта
```
