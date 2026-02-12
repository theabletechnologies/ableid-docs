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

**Описание полей:**

| Поле            | Тип      | Описание                     |
|-----------------|----------|------------------------------|
| `redirect`      | `string` | URL редиректа                |
| `attemptId`     | `string` | ID сессии                    |
| `hash`          | `string` | Хеш для проверки целостности |
| `transactionId` | `string` | ID транзакции клиента        |

#### `Успешная регистрация`

Webhook отправляется при успешной временной регистрации нерезидента (сохранение фото).

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

#### `Неуспешная регистрация`

Webhook отправляется при провале временной регистрации.

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

---

## Настройка редиректов

В личном кабинете проекта AbleID необходимо указать **два** URL-адреса для редиректа:

- **Успешная страница** (`successUrl`) — URL, на который пользователь будет перенаправлен после **успешного** прохождения верификации. Например: `https://example.com/success`
- **Неуспешная страница** (`failUrl`) — URL, на который пользователь будет перенаправлен после **неуспешной** верификации (лицо не совпало, сессия истекла и т.д.). Например: `https://example.com/error`

После завершения процесса верификации система автоматически перенаправит пользователя на одну из указанных страниц в зависимости от результата. URL выбранной страницы будет возвращён в поле `redirect` в webhook-уведомлении.
