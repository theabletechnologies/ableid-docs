---
id: direct_hooks
title: Получение персональных данных по документу и фотографии
---

# Получение персональных данных по документу и фотографии

Получение данные резидента или нерезидента **без прохождения биометрической идентификации** — только по документу и фотографии.

> **ВАЖНО:**
>
> 1. **Двухшаговый процесс:** Сначала создаётся сессия (`start_direct`), затем выполняется запрос данных (`get_person_direct` или `get_foreign_direct`).
> 2. **Верификация подписи:** `signature` из шага 1 совпадает с полем `hash` в вебхуке — клиент может сверить их для подтверждения подлинности данных.
> 3. **Статические URL:** Данные отправляются только на URL, прописанные в конфигурации проекта.
> 4. **Фото:** Передаётся в формате Base64, должно быть JPEG или PNG.

---

## Верификация подписи

Поле `hash` — это код верификации, который используется для проверки подлинности запросов от AbleID.

### Как генерируется `hash`:

```javascript
sha1(sha1(projectId + secret).toUpperCase() + attemptId).toUpperCase()
```

---

## Шаг 1. Создание сессии

**`[POST]`** `https://{domain}/check/start_direct`

### Тело запроса

```json
{
  "projectId": "yDkeHoHWXVqQ9M_URZUtb",
  "transactionId": "tx-001",
  "secret": "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5"
}
```

| Поле            | Тип      | Описание                         | Обязательное | Пример                           |
|-----------------|----------|----------------------------------|--------------|----------------------------------|
| `projectId`     | `string` | ID проекта AbleID                | Да           | "yDkeHoHWXVqQ9M_URZUtb"          |
| `transactionId` | `string` | Уникальный ID транзакции клиента | Да           | "tx-001"                         |
| `secret`        | `string` | Секретный ключ проекта           | Да           | "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5" |

### Успешный ответ `200`

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Успешно",
  "data": {
    "attemptId": "3HQVkBm_zCZqKFbTWVrhf",
    "signature": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "transactionId": "tx-001"
  }
}
```

| Поле            | Тип      | Описание                                   |
|-----------------|----------|--------------------------------------------|
| `attemptId`     | `string` | ID сессии — передаётся в последующих шагах |
| `signature`     | `string` | Подпись для верификации вебхука            |
| `transactionId` | `string` | ID транзакции клиента                      |

> **Переиспользование:** При повторном запросе с тем же `transactionId` (в течение 1 часа) возвращается существующая сессия с той же `signature`.

### Ошибка `400`

```json
{
  "statusCode": 10101,
  "type": "FACE_SESSION_EXPIRED",
  "data": null,
  "message": "Сессия истекла"
}
```

---

## Получение данных резидента

**`[POST]`** `https://{domain}/check/get_person_direct`

### Тело запроса

```json
{
  "projectId": "yDkeHoHWXVqQ9M_URZUtb",
  "secret": "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5",
  "attemptId": "3HQVkBm_zCZqKFbTWVrhf",
  "pinfl": "12345678901234",
  "birthDate": "12.12.2000",
  "photo": "/9j/4AAQSkZJRgABAQ..."
}
```

| Поле        | Тип      | Описание                                      | Обязательное | Пример                           |
|-------------|----------|-----------------------------------------------|--------------|----------------------------------|
| `projectId` | `string` | ID проекта                                    | Да           | "yDkeHoHWXVqQ9M_URZUtb"          |
| `secret`    | `string` | Секретный ключ проекта                        | Да           | "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5" |
| `attemptId` | `string` | ID сессии из шага 1                           | Да           | "3HQVkBm_zCZqKFbTWVrhf"          |
| `pinfl`     | `string` | ПИНФЛ (14 цифр)                               | Да           | "12345678901234"                 |
| `birthDate` | `string` | Дата рождения (`DD.MM.YYYY` или `YYYY-MM-DD`) | Да           | "12.12.2000"                     |
| `photo`     | `string` | Фото в Base64 (JPEG или PNG)                  | Да           | "/9j/4AAQSkZJRgABAQ..."          |

### Успешный ответ `200`

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Успешно",
  "data": {
    "isSuccess": true
  }
}
```

Данные приходят **вебхуком** на `PERSON_WEBHOOK_URL` (см. ниже).

---

## Получение данных нерезидента

**`[POST]`** `https://{domain}/check/get_foreign_direct`

### Тело запроса

```json
{
  "projectId": "yDkeHoHWXVqQ9M_URZUtb",
  "secret": "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5",
  "attemptId": "3HQVkBm_zCZqKFbTWVrhf",
  "document": "AB12345678",
  "photo": "/9j/4AAQSkZJRgABAQ..."
}
```

| Поле        | Тип      | Описание                            | Обязательное | Пример                           |
|-------------|----------|-------------------------------------|--------------|----------------------------------|
| `projectId` | `string` | ID проекта                          | Да           | "yDkeHoHWXVqQ9M_URZUtb"          |
| `secret`    | `string` | Секретный ключ проекта              | Да           | "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5" |
| `attemptId` | `string` | ID сессии из шага 1                 | Да           | "3HQVkBm_zCZqKFbTWVrhf"          |
| `document`  | `string` | Серия и номер паспорта (слитно)     | Да           | "AB12345678"                     |
| `photo`     | `string` | Фото в Base64 (JPEG или PNG)        | Да           | "/9j/4AAQSkZJRgABAQ..."          |

### Успешный ответ `200`

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Успешно",
  "data": {
    "isSuccess": true
  }
}
```

Данные приходят **вебхуком** на `FOREIGN_WEBHOOK_URL` (см. ниже).

---

## Вебхуки

### Вебхук резидента (`PERSON_WEBHOOK_URL`)

Структура аналогична [хуку `/check/get_person`](/hooks#2-получение-полной-информации), но без поля `lang`.

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Успешно",
  "data": {
    "attemptId": "3HQVkBm_zCZqKFbTWVrhf",
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "data": {
      "person": {
        "attemptId": "3HQVkBm_zCZqKFbTWVrhf",
        "pinfl": "12345678901234",
        "document": "AB1234567",
        "surname": "IVANOV",
        "name": "IVAN",
        "lastName": "IVANOVICH",
        "birthDate": "2000-01-01",
        "birthPlace": "TOSHKENT",
        "birthCountry": "УЗБЕКИСТАН",
        "citizenship": "УЗБЕКИСТАН",
        "nationality": "УЗБЕК/УЗБЕЧКА",
        "liveStatus": true,
        "passportDateBegin": "2020-01-01",
        "passportDateEnd": "2030-01-01",
        "passportGivePlace": "РУВД ГОРОДА ТАШКЕНТА",
        "passportGivePlaceId": "12345",
        "passportType": "IDMS_RECV_MVD_IDCARD_CITIZEN",
        "passportTypeTitle": "ID КАРТА ГРАЖДАНИНА РЕСПУБЛИКИ УЗБЕКИСТАН",
        "sex": 1
      },
      "registration": {
        "permanentRegistration": {
          "address": "МАХАЛЛЯ МФЙ, МАССИВ, уй:1 хонадон:1",
          "region": "ТОШКЕНТ ШАҲРИ",
          "district": "ТОШКЕНТ ТУМАНИ",
          "maxala": "МАХАЛЛЯ МФЙ",
          "street": "МАССИВ",
          "country": "ЎЗБЕКИСТОН"
        }
      }
    }
  }
}
```

> Полное описание полей `person` и `registration` — в разделе [Хуки → Получение полной информации](/hooks#2-получение-полной-информации).

---

### Вебхук нерезидента (`FOREIGN_WEBHOOK_URL`)

Структура аналогична [хуку `/check/get_foreign_person`](/hooks#6-получение-пересечения).

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Успешно",
  "data": {
    "attemptId": "3HQVkBm_zCZqKFbTWVrhf",
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "data": {
      "person": {
        "document": "AB12345678",
        "reg_date": "2024-01-01",
        "direction_type_id": "1",
        "transport_type_code": "AIR",
        "citizenship": "RUSSIA",
        "direction_country_id": "643",
        "full_name": "IVANOV IVAN",
        "birth_date": "2000-01-01"
      }
    }
  }
}
```

> Полное описание полей — в разделе [Хуки → Получение пересечения](/hooks#6-получение-пересечения).

---

## Коды ошибок

| Код   | Тип                           | Описание                                      |
|-------|-------------------------------|-----------------------------------------------|
| `400` | `FACE_INCORRECT_PINFL`        | Некорректный ПИНФЛ                            |
| `400` | `INCORRECT_DATA_FORMAT`       | Некорректный формат даты рождения             |
| `400` | `FACE_NOT_VALID`              | Фото не является JPEG/PNG                     |
| `400` | `FACE_SESSION_EXPIRED`        | Сессия истекла (TTL 1 час)                    |
| `400` | `FACE_LIMIT_HAS_BEEN_REACHED` | Превышен лимит запросов проекта               |