---
id: ableid
title: Able ID
---

# Методы

## Идентификация резидентов

**[POST]** `https://{domain}/check/start/second` - URL для отправки запроса

### Тело запроса

```json
{
  "projectId": "yDkeHoHWXVqQ9M_URZUtb",
  "transactionId": "1",
  "secret": "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5",
  "pinfl": "12345678901234",
  "birthDate": "12.12.2000",
  "lang": "ru",
  "hooks": ["https://domain.back/callback"]
}
```

**Описание полей:**

| Поле            | Тип                             | Описание                         | Обязательное | Пример                           |
| --------------- | ------------------------------- | -------------------------------- | ------------ | -------------------------------- |
| `projectId`     | `string`                        | ID проекта AbleID                | Да           | "yDkeHoHWXVqQ9M_URZUtb"          |
| `transactionId` | `string`                        | Уникальный ID транзакции клиента | Да           | "1"                              |
| `secret`        | `string`                        | Секретный ключ проекта           | Да           | "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5" |
| `pinfl`         | `string`                        | ПИНФЛ                            | Да           | 12345678901234                   |
| `birthDate`     | `string`                        | Дата рождения                    | Да           | "12.12.2000"                     |
| `lang`          | `string` (enum: ru, en, uz, oz) | Язык                             | Нет          | "ru"                             |
| `hooks`         | `array of string`               | URLs для оповещений              | Да           | ["https://domain.back/callback"] |

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
| ----------- | ------------------------------- | ---------- | ------------ | ---------------------------------------------- |
| `attemptId` | `string`                        | ID сессии  | Да           | "3HQVkBm_zCZqKFbTWVrhf"                        |
| `fullUrl`   | `string`                        | URL сессии | Да           | "https://ableid.backend/3HQVkBm_zCZqKFbTWVrhf" |
| `lang`      | `string` (enum: ru, en, uz, oz) | Язык окна  | Да           | "ru"                                           |

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

## Идентификация нерезидентов

**[POST]** `https://{domain}/check/start/foreign`- URL для отправки запроса

### Тело запроса

```json
{
  "projectId": "yDkeHoHWXVqQ9M_URZUtb",
  "transactionId": "1",
  "secret": "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5",
  "document": "AA123123",
  "lang": "ru",
  "hooks": ["https://domain.back/callback"]
}
```

**Описание полей:**

| Поле            | Тип                             | Описание                         | Обязательное | Пример                           |
| --------------- | ------------------------------- | -------------------------------- | ------------ | -------------------------------- |
| `projectId`     | `string`                        | ID проекта                       | Да           | "yDkeHoHWXVqQ9M_URZUtb"          |
| `transactionId` | `string`                        | Уникальный ID транзакции клиента | Да           | "1"                              |
| `secret`        | `string`                        | Секретный ключ проекта           | Да           | "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5" |
| `document`      | `string`                        | Документ                         | Да           | "AA123123"                       |
| `lang`          | `string` (enum: ru, en, uz, oz) | Язык                             | Нет          | "ru"                             |
| `hooks`         | `array of string`               | URLs для оповещений              | Да           | ["https://domain.back/callback"] |

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
| ----------- | ------------------------------- | ---------- | ------------ | ---------------------------------------------- |
| `attemptId` | `string`                        | ID сессии  | Да           | "3HQVkBm_zCZqKFbTWVrhf"                        |
| `fullUrl`   | `string`                        | URL сессии | Да           | "https://ableid.backend/3HQVkBm_zCZqKFbTWVrhf" |
| `lang`      | `string` (enum: ru, en, uz, oz) | Язык окна  | Да           | "ru"                                           |

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
