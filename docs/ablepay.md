---
id: ablepay
title: Able Pay
---

## Инициализация AblePay

**[POST]** `https://{domain}/check/start/pay/second` - URL для отправки запроса

### Тело запроса

```json
{
  "projectId": "yDkeHoHWXVqQ9M_URZUtb",
  "transactionId": "1",
  "secret": "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5",
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

---

### Webhook уведомления

После завершения сессии верификации система отправит webhook-уведомление на все URL, указанные в параметре `hooks`.

#### `Успешная верификация (найдено одно лицо)`

Webhook отправляется когда система нашла совпадение с одним лицом в базе.

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Успешно",
  "data": {
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "attemptId": "RFJkzaealP6XF0CspiAoq",
    "data": {
      "person": {
        "fullName": "IVANOV IVAN IVANOVICH",
        "document": "AB1234567",
        "pinfl": "12345678901234",
        "isResident": true
      },
      "personas": [
        {
          "fullName": "IVANOV IVAN IVANOVICH",
          "document": "AB1234567",
          "pinfl": "12345678901234",
          "isResident": true
        }
      ]
    }
  }
}
```

**Описание полей:**

Содержимое объекта data

| Поле       | Тип             | Описание                                                   | Опционально |
| ---------- | --------------- | ---------------------------------------------------------- | ----------- |
| `person`   | `object`        | Объект с данными основного лица. Если несколько лиц `null` | Да          |
| `personas` | `array<object>` | Массив объектов с данными всех найденных лиц               | Нет         |

Содержимое объекта person / personas

| Поле         | Тип       | Описание                                                    | Опционально |
| ------------ | --------- | ----------------------------------------------------------- | ----------- |
| `fullName`   | `string`  | Полное ФИО лица                                             | Нет         |
| `document`   | `string`  | Номер документа, удостоверяющего личность                   | Нет         |
| `pinfl`      | `string`  | ПИНФЛ. Если нерезидент `null`                               | Да          |
| `isResident` | `boolean` | Статус резидента (`true` - резидент, `false` - нерезидент). | Нет         |

#### `Успешная верификация (найдено несколько лиц)`

Webhook отправляется когда система нашла совпадения с несколькими лицами в базе.

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Успешно",
  "data": {
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "attemptId": "RFJkzaealP6XF0CspiAoq",
    "data": {
      "person": null,
      "personas": [
        {
          "fullName": "IVANOV IVAN IVANOVICH",
          "document": "AB1234567",
          "pinfl": "12345678901234",
          "isResident": true
        },
        {
          "fullName": "PETROV PETR PETROVICH",
          "document": "AC7654321",
          "pinfl": "43210987654321",
          "isResident": true
        }
      ]
    }
  }
}
```

**Примечание:** При нахождении нескольких лиц поле `person` будет `null`, а массив `personas` будет содержать всех найденных кандидатов.

#### `Неуспешная верификация`

Webhook отправляется при провале биометрической верификации (лицо не найдено в базе или не прошло проверку).

```json
{
  "statusCode": 10106,
  "type": "FACE_NOT_VALID",
  "message": "Лицо не прошло проверку",
  "data": {
    "redirect": "https://example.com/error"
  }
}
```

**Описание полей:**

| Поле       | Тип      | Описание                                    |
| ---------- | -------- | ------------------------------------------- |
| `redirect` | `string` | URL для редиректа на страницу ошибки        |

---

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
