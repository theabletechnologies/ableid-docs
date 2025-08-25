---
id: ableid
title: Able ID
---

# Методы

## `POST /check/start/second`

**Описание:** Идентификация резидентов

`https://{baseUrl}/public/check/faceid/` - Тестирование веб версии с браузера

### Тело запроса

```json
{
  "projectId": "",
  "transactionId": "",
  "secret": "",
  "pinfl": "",
  "birthDate": "",
  "lang": "",
  "hooks": [
    "string"
  ]
}
```

**Описание полей:**

| Поле            | Тип                             | Описание               | Обязательное | Пример                           |
|-----------------|---------------------------------|------------------------|--------------|----------------------------------|
| `projectId`     | `string`                        | ID проекта             | Да           | ""                               |
| `transactionId` | `string`                        | ID транзакции          | Да           | ""                               |
| `secret`        | `string`                        | Секретный ключ проекта | Да           | ""                               |
| `pinfl`         | `string`                        | ПИНФЛ                  | Да           | 12345678901234                   |
| `birthDate`     | `string`                        | Дата рождения          | Да           | "12.12.2000"                     |
| `lang`          | `string` (enum: ru, en, uz, oz) | Язык                   | Нет          | "ru"                             |
| `hooks`         | `array of string`               | URLs для оповещений    | Да           | ["https://domain.back/callback"] |

### Ответы

#### `Успешный ответ: 201`

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Сообщение",
  "data": {
    "attemptId": "3HQVkBm_zCZqKFbTWVrhf",
    "fullUrl": "https://ableid.backend/3HQVkBm_zCZqKFbTWVrhf",
    "lang": "ru"
  }
}
```

**Описание полей:**

| Поле        | Тип                             | Описание   | Обязательное | Пример                                         |
|-------------|---------------------------------|------------|--------------|------------------------------------------------|
| `attemptId` | `string`                        | ID сессии  | Да           | "3HQVkBm_zCZqKFbTWVrhf"                        |
| `fullUrl`   | `string`                        | URL сессии | Да           | "https://ableid.backend/3HQVkBm_zCZqKFbTWVrhf" |
| `lang`      | `string` (enum: ru, en, uz, oz) | Язык окна  | Да           | -                                              |

#### `Ошибка: 400`

```json
{
  "statusCode": 10101,
  "type": "FACE_SESSION_EXPIRED",
  "data": null,
  "message": "Сообщение"
}
```

---

## `POST /check/start/foreign`

**Описание:** Идентификация нерезидентов

`https://{baseUrl}/public/check/faceid/foreign/` - Тестирование веб версии с браузера

### Тело запроса

```json
{
  "projectId": "",
  "transactionId": "",
  "secret": "",
  "document": "string",
  "lang": "ru",
  "hooks": [
    "string"
  ]
}
```

**Описание полей:**

| Поле            | Тип                             | Описание               | Обязательное | Пример                           |
|-----------------|---------------------------------|------------------------|--------------|----------------------------------|
| `projectId`     | `string`                        | ID проекта             | Да           | ""                               |
| `transactionId` | `string`                        | ID транзакции          | Да           | ""                               |
| `secret`        | `string`                        | Секретный ключ проекта | Да           | ""                               |
| `document`      | `string`                        | Документ               | Да           | -                                |
| `lang`          | `string` (enum: ru, en, uz, oz) | Язык                   | Нет          | "ru"                             |
| `hooks`         | `array of string`               | URLs для оповещений    | Да           | ["https://domain.back/callback"] |

### Ответы

#### `Успешный ответ: 201`

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Сообщение",
  "data": {
    "attemptId": "3HQVkBm_zCZqKFbTWVrhf",
    "fullUrl": "https://ableid.backend/3HQVkBm_zCZqKFbTWVrhf",
    "lang": "ru"
  }
}
```

**Описание полей:**

| Поле        | Тип                             | Описание   | Обязательное | Пример                                         |
|-------------|---------------------------------|------------|--------------|------------------------------------------------|
| `attemptId` | `string`                        | ID сессии  | Да           | "3HQVkBm_zCZqKFbTWVrhf"                        |
| `fullUrl`   | `string`                        | URL сессии | Да           | "https://ableid.backend/3HQVkBm_zCZqKFbTWVrhf" |
| `lang`      | `string` (enum: ru, en, uz, oz) | Язык окна  | Да           | -                                              |

#### `Ошибка: 400`

Описание: Ошибка

```json
{
  "statusCode": 10101,
  "type": "FACE_SESSION_EXPIRED",
  "data": null,
  "message": "Сообщение"
}
```

---

## `POST /check/get_photo`

**Описание:** Запрос на получение хука фотографии

### Тело запроса

```json
{
  "projectId": "",
  "attemptId": "",
  "secret": ""
}
```

**Описание полей:**

| Поле        | Тип      | Описание               | Обязательное | Пример |
|-------------|----------|------------------------|--------------|--------|
| `projectId` | `string` | ID проекта             | Да           | ""     |
| `attemptId` | `string` | ID сессии              | Да           | ""     |
| `secret`    | `string` | Секретный ключ проекта | Да           | ""     |

### Ответы

#### `Успешный ответ: Придет на хук ранее прописанный для получения фотографии`
