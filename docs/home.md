---
id: home
title: Главная
---

# Описание для работы с AbleID

**Среда разработки:** [https://ableid-dev-back.theable.tech](https://ableid-dev-back.theable.tech)  
**Продакшн-среда:** [https://faceid-back.theable.tech](https://faceid-back.theable.tech)

API предназначено для создания, обработки и завершения сессий идентификации с использованием уникальных ключей `projectId` и `secret`.

> **Для обеспечения безопасности запросы должны отправляться только с backend-а**

---

## Пример успешного ответа от API по идентификации пользователя

После идентификации результат отправляется на указанный URL.

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Сообщение",
  "data": {
    "attemptId": "3HQVkBm_zCZqKFbTWVrhf",
    "fullUrl": "https://ableid.domain/3HQVkBm_zCZqKFbTWVrhf",
    "lang": "ru"
  }
}
```

| Поле          | Тип данных | Описание                                                                                                 |
|---------------|------------|----------------------------------------------------------------------------------------------------------|
| `signature`   | `string`   | Код верификации (см. справочник ниже) |
| `transactionId` | `string` | ID транзакции клиента                                                                                   |
| `attemptId`   | `string`   | ID сессии AbleID                                                                                         |

> Поле `signature` используется для проверки подлинности запроса от AbleID. Оно подтверждает, что запрос не был подделан.

### Верификация `signature`:

```
sha1(sha1(projectId + secret).toUpperCase() + attemptId).toUpperCase()
```

---
