---
id: home
title: Главная
---

## Описание работы с AbleID

**Base URLs:**  
**Дев среда:** [https://ableid-dev-back.theable.tech](https://ableid-dev-back.theable.tech)  
**Продакшн-среда:** [https://faceid-back.theable.tech](https://faceid-back.theable.tech)

API предназначено для инициации, обработки и завершения сессий идентификации с использованием уникальных ключей
`projectId` и `secret`.

> **Для обеспечения безопасности все запросы должны выполняться исключительно с backend-сервера**

> Доступ предоставляется дифференцированно в зависимости от используемых ключей: для каждой среды (Production, Staging,
> Development) применяется отдельный набор ключей, что обеспечивает независимость и изоляцию доступа.

---

## Пример ответа создания сессии

При создании сессии идентификации API возвращает следующий ответ:

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Успешно",
  "data": {
    "attemptId": "NS7gSQGA2JwwbLVTPwHY1",
    "lang": "ru",
    "fullUrl": "https://faceid-back.theable.tech/public/NS7gSQGA2JwwbLVTPwHY1?lang=ru",
    "redirect": "/check/redirect/NS7gSQGA2JwwbLVTPwHY1"
  }
}
```

| Поле        | Тип данных | Описание                                    |
|-------------|------------|---------------------------------------------|
| `attemptId` | `string`   | ID сессии AbleID                            |
| `lang`      | `string`   | Язык интерфейса (ru, uz, en)                |
| `fullUrl`   | `string`   | Полный URL для перенаправления пользователя |
| `redirect`  | `string`   | Путь редиректа после завершения сессии      |

> **Важно:** Поле `hash` НЕ возвращается на создании сессии. Оно приходит только на вебхуках.

---

## О поле `hash`

Поле `hash` — это код верификации, который используется для проверки подлинности запросов от AbleID.

### Где используется `hash`:

**В вебхуках** — отправляется на ваш сервер для верификации после завершения идентификации:

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Успешно",
  "data": {
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "attemptId": "3HQVkBm_zCZqKFbTWVrhf",
    "transactionId": "your-transaction-id",
    "data": {}
  }
}
```

### Как генерируется `hash`:

```javascript
sha1(sha1(projectId + secret).toUpperCase() + attemptId).toUpperCase()
```

### Как проверить `hash`:

При получении запроса от AbleID (например, на вебхук), вы должны проверить подлинность, пересчитав hash:

```javascript
const calculatedHash = sha1(
  sha1(projectId + secret).toUpperCase() + attemptId
).toUpperCase();

if (calculatedHash === receivedHash) {
  // Запрос подлинный
} else {
  // Запрос подделан
}
```

---
