---
id: p2p
title: Able P2P
---

# Методы

## Верификация резидентов

**[POST]** `https://{domain}/check/start/verification/second` - URL для отправки запроса

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
|-----------------|---------------------------------|----------------------------------|--------------|----------------------------------|
| `projectId`     | `string`                        | ID проекта                       | Да           | "yDkeHoHWXVqQ9M_URZUtb"          |
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
|-------------|---------------------------------|------------|--------------|------------------------------------------------|
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

### Webhook уведомления

После завершения сессии верификации система отправит webhook-уведомление на все URL, указанные в параметре `hooks`.

**Описание полей:**

| Поле            | Тип      | Описание                     |
|-----------------|----------|------------------------------|
| `redirect`      | `string` | URL редиректа                |
| `attemptId`     | `string` | ID сессии                    |
| `hash`          | `string` | Хеш для проверки целостности |
| `transactionId` | `string` | ID транзакции клиента        |

#### `Успешная верификация`

Webhook отправляется при успешной биометрической верификации резидента.

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Успешно",
  "data": {
    "redirect": "https://example.com/success",
    "attemptId": "RFJkzaealP6XF0CspiAoq",
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "transactionId": "your-transaction-id"
  }
}
```

#### `Неуспешная верификация`

Webhook отправляется при провале биометрической верификации (лицо не совпало).

```json
{
  "statusCode": 10203,
  "type": "FACE_NOT_VALID",
  "message": "Лицо не прошло проверку",
  "data": {
    "redirect": "https://example.com/error",
    "attemptId": "3HQVkBm_zCZqKFbTWVrhf",
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "transactionId": "your-transaction-id"
  }
}
```

> Подробная информация о редиректах: [Настройка редиректов](/home#настройка-редиректов)

---

## Верификация нерезидентов

**[POST]** `https://{domain}/check/start/verification/foreign` - URL для отправки запроса

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
|-----------------|---------------------------------|----------------------------------|--------------|----------------------------------|
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
|-------------|---------------------------------|------------|--------------|------------------------------------------------|
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

### Webhook уведомления

После завершения сессии верификации система отправит webhook-уведомление на все URL, указанные в параметре `hooks`.

**Описание полей:**

| Поле            | Тип      | Описание                     |
|-----------------|----------|------------------------------|
| `redirect`      | `string` | URL редиректа                |
| `attemptId`     | `string` | ID сессии                    |
| `hash`          | `string` | Хеш для проверки целостности |
| `transactionId` | `string` | ID транзакции клиента        |

#### `Успешная верификация`

Webhook отправляется при успешной биометрической верификации нерезидента.

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Успешно",
  "data": {
    "redirect": "https://example.com/success",
    "attemptId": "RFJkzaealP6XF0CspiAoq",
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "transactionId": "your-transaction-id"
  }
}
```

#### `Неуспешная верификация`

Webhook отправляется при провале биометрической верификации (лицо не совпало).

```json
{
  "statusCode": 10203,
  "type": "FACE_NOT_VALID",
  "message": "Лицо не прошло проверку",
  "data": {
    "redirect": "https://example.com/error",
    "attemptId": "3HQVkBm_zCZqKFbTWVrhf",
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "transactionId": "your-transaction-id"
  }
}
```
