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
  "hooks": [
    "https://domain.back/callback"
  ]
}
```

**Описание полей:**

| Поле            | Тип                             | Описание               | Обязательное | Пример                           |
|-----------------|---------------------------------|------------------------|--------------|----------------------------------|
| `projectId`     | `string`                        | ID проекта             | Да           | "yDkeHoHWXVqQ9M_URZUtb"          |
| `transactionId` | `string`                        | ID транзакции          | Да           | "1"                              |
| `secret`        | `string`                        | Секретный ключ проекта | Да           | "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5" |
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
| `lang`      | `string` (enum: ru, en, uz, oz) | Язык окна  | Да           | "ru"                                           |

--

#### `Успешный ответ: Хуком на переданные URLs`

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "string",
  "data": {
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "attemptId": "RFJkzaealP6XF0CspiAoq",
    "data": {
      "person": {
        "fullName": "Test Test",
        "document": "AA123456",
        "pinfl": "12345678901234",
        "isResident": true
      },
      "personas": [
        {
          "fullName": "Test Test",
          "document": "AA123456",
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
|------------|-----------------|------------------------------------------------------------|-------------|
| `person`   | `object`        | Объект с данными основного лица. Если несколько лиц `null` | Да          |
| `personas` | `array<object>` | Массив объектов с данными дополнительных лиц               | Нет         |

Содержимое объекта person / personas

| Поле         | Тип       | Описание                                                    | Опционально |
|--------------|-----------|-------------------------------------------------------------|-------------|
| `fullName`   | `string`  | Полное ФИО лица                                             | Нет         |
| `document`   | `string`  | Номер документа, удостоверяющего личность                   | Нет         |
| `pinfl`      | `string`  | ПИНФЛ. Если нерезидент `null`                               | Да          |
| `isResident` | `boolean` | Статус резидента (`true` - резидент, `false` - нерезидент). | Нет         |

--

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
