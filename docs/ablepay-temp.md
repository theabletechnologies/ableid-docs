---
id: ablepay-temp
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
|-----------------|---------------------------------|----------------------------------|--------------|----------------------------------|
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

После завершения сессии временной регистрации система отправит webhook-уведомление на все URL, указанные в параметре `hooks`.

#### `Успешная регистрация`

Webhook отправляется при успешной временной регистрации нерезидента (сохранение фото).

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Успешно",
  "data": {
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "attemptId": "RFJkzaealP6XF0CspiAoq",
    "transactionId": "your-transaction-id"
  }
}
```

**Описание полей:**

| Поле            | Тип      | Описание                         |
|-----------------|----------|----------------------------------|
| `hash`          | `string` | Хеш для проверки целостности     |
| `attemptId`     | `string` | ID сессии                        |
| `transactionId` | `string` | ID транзакции клиента            |

#### `Неуспешная регистрация`

Webhook отправляется при провале временной регистрации.

```json
{
  "statusCode": 10107,
  "type": "FACE_DATA_NOT_FOUND",
  "message": "Данные не найдены",
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

--

## Привязка карты к AblePay и мерчанту

**[POST]** `https://{domain}/check/start/pay/card/attach` - URL для отправки запроса

### Тело запроса

```json
{
  "projectId": "yDkeHoHWXVqQ9M_URZUtb",
  "secret": "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5",
  "cardId": "i1dtVzFclm5lEh0oPsjTf",
  "merchantId": "bIolONvGxrEGZ2mmwnVAd",
  "pinfl": "12345678901234"
}
```

**Описание полей:**

| Поле         | Тип      | Описание               | Обязательное | Пример                           |
| ------------ | -------- | ---------------------- | ------------ | -------------------------------- |
| `projectId`  | `string` | ID проекта             | Да           | "yDkeHoHWXVqQ9M_URZUtb"          |
| `secret`     | `string` | Секретный ключ проекта | Да           | "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5" |
| `cardId`     | `string` | ID карты               | Да           | "i1dtVzFclm5lEh0oPsjTf"          |
| `merchantId` | `string` | ID мерчанта            | Да           | "bIolONvGxrEGZ2mmwnVAd"          |
| `pinfl`      | `string` | ПИНФЛ                  | Да           | "12345678901234"                 |

### Ответы

#### `Успешный ответ: 201`

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Карта успешно привязана",
  "data": null
}
```

#### `Ошибка: 400`

```json
{
  "statusCode": 400,
  "type": "ERROR",
  "message": "Ошибка при привязке карты",
  "data": null
}
```

---

## Отвязывание карты к AblePay и мерчанту

**[POST]** `https://{domain}/check/start/pay/card/detach` - URL для отправки запроса

### Тело запроса

```json
{
  "projectId": "yDkeHoHWXVqQ9M_URZUtb",
  "secret": "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5",
  "cardId": "i1dtVzFclm5lEh0oPsjTf",
  "merchantId": "bIolONvGxrEGZ2mmwnVAd",
  "pinfl": "12345678901234"
}
```

**Описание полей:**

| Поле         | Тип      | Описание               | Обязательное | Пример                           |
| ------------ | -------- | ---------------------- | ------------ | -------------------------------- |
| `projectId`  | `string` | ID проекта             | Да           | "yDkeHoHWXVqQ9M_URZUtb"          |
| `secret`     | `string` | Секретный ключ проекта | Да           | "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5" |
| `cardId`     | `string` | ID карты               | Да           | "i1dtVzFclm5lEh0oPsjTf"          |
| `merchantId` | `string` | ID мерчанта            | Да           | "bIolONvGxrEGZ2mmwnVAd"          |
| `pinfl`      | `string` | ПИНФЛ                  | Да           | "12345678901234"                 |

### Ответы

#### `Успешный ответ: 201`

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Карта успешно отвязана",
  "data": null
}
```

#### `Ошибка: 400`

```json
{
  "statusCode": 400,
  "type": "ERROR",
  "message": "Ошибка при отвязке карты",
  "data": null
}
```
