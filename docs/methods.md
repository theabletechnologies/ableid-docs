---
id: methods
title: Методы API
---

# Методы

## `POST /check/start/second`

**Описание:** Идентификация резидентов

https://ableid-dev-back.theable.tech/public/check/faceid/ - Тестирование веб версии с браузера

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

## `POST /check/start/verification/second`

**Описание:** Верификация резидентов

https://ableid-dev-back.theable.tech/public/check/faceid/verification/ - Тестирование веб версии с браузера

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

https://ableid-dev-back.theable.tech/public/check/faceid/foreign/ - Тестирование веб версии с браузера

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

## `POST /check/start/verification/foreign`

**Описание:** Верификация нерезидентов

https://ableid-dev-back.theable.tech/public/check/faceid/foreign_verification/ - Тестирование веб версии с браузера

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

## `POST /check/start/pay/second`

**Описание:** Инициализация AblePay

https://ableid-dev-back.theable.tech/public/pay/generate/ - Тестирование веб версии с браузера

### Тело запроса

```json
{
  "projectId": "",
  "transactionId": "",
  "secret": "",
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
        "fullName": "string",
        "document": "string",
        "pinfl": "string",
        "isResident": true
      },
      "personas": [
        {
          "fullName": "string",
          "document": "string",
          "pinfl": "string",
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

---

## `POST /check/get_passport`

**Описание:** Запрос на получение паспорта

### Тело запроса

```json
{
  "pinfl": "12345678901234",
  "birthDate": "12.12.2000",
  "projectId": "",
  "attemptId": "",
  "secret": ""
}
```

**Описание полей:**

| Поле        | Тип      | Описание               | Обязательное | Пример         |
|-------------|----------|------------------------|--------------|----------------|
| `pinfl`     | `string` | ПИНФЛ                  | Да           | 12345678901234 |
| `birthDate` | `string` | Дата рождения          | Да           | "12.12.2000"   |
| `projectId` | `string` | ID проекта             | Да           | ""             |
| `attemptId` | `string` | ID сессии              | Да           | ""             |
| `secret`    | `string` | Секретный ключ проекта | Да           | ""             |

### Ответы

#### `Успешный ответ: Придет на хук ранее прописанный для получения паспорта`

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

---

## `POST /check/registration`

**Описание:** Получение данных по прописке

### Тело запроса

```json
{
  "attemptId": "",
  "pinfl": "12345678901234",
  "projectId": "",
  "secret": ""
}
```

**Описание полей:**

| Поле        | Тип      | Описание               | Обязательное | Пример         |
|-------------|----------|------------------------|--------------|----------------|
| `attemptId` | `string` | ID сессии              | Да           | ""             |
| `pinfl`     | `string` | ПИНФЛ                  | Да           | 12345678901234 |
| `projectId` | `string` | ID проекта             | Да           | ""             |
| `secret`    | `string` | Секретный ключ проекта | Да           | ""             |

### Ответы

#### `Успешный ответ: Придет на хук ранее прописанный для прописки`

#### `Ошибка: 400`

Описание: Пример ошибки в получении данных

```json
{
  "statusCode": 10101,
  "type": "FACE_SESSION_EXPIRED",
  "data": null,
  "message": "Сообщение"
}
```

---

## `POST /check/get_person`

**Описание:** Запрос на получение полной информации о человеке

### Тело запроса

```json
{
  "pinfl": "12345678901234",
  "birthDate": "12.12.2000",
  "projectId": "",
  "attemptId": "",
  "secret": ""
}
```

**Описание полей:**

| Поле        | Тип      | Описание               | Обязательное | Пример         |
|-------------|----------|------------------------|--------------|----------------|
| `pinfl`     | `string` | ПИНФЛ                  | Да           | 12345678901234 |
| `birthDate` | `string` | Дата рождения          | Да           | "12.12.2000"   |
| `projectId` | `string` | ID проекта             | Да           | ""             |
| `attemptId` | `string` | ID сессии              | Да           | ""             |
| `secret`    | `string` | Секретный ключ проекта | Да           | ""             |

### Ответы

#### `Успешный ответ: Придет на хук ранее прописанный для получения паспорта`
