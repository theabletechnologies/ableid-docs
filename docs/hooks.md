---
id: hooks
title: Получение данных (Webhooks)
---

# Получение данных (Webhooks)

> **ВАЖНО:**
>
> 1. **Статические URL:** Данные отправляются **ТОЛЬКО** на URL-адреса, заранее прописанные в конфигурации вашего проекта. На динамические адреса отправка персональных данных **НЕ** производится.
> 2. **Типы хуков:**
>    - Информация о резидентах
>    - Информация о пересечении нерезидента
>    - Получение прописки резидента
>    - Получение фотографии пользователя
> 3. **Отправка:** Вебхуки с данными приходят **ТОЛЬКО** в случае успешного прохождения идентификации/сессии.

![Схема взаимодействия](/img/schema-hooks.png)

## Необходимые Webhook URL

Для работы с хуками необходимо настроить статические URL в конфигурации проекта. Для настройки или обновления URL обратитесь к нашей команде поддержки:

| Метод API                                  | Webhook URL в конфиге      | Описание                                                   |
| ------------------------------------------ | -------------------------- | ---------------------------------------------------------- |
| `/check/get_passport`, `/check/get_person` | `PERSON_WEBHOOK_URL`       | Получение паспортных данных / полной информации + прописка |
| `/check/registration`                      | `REGISTRATION_WEBHOOK_URL` | Получение только прописки                                  |
| `/check/get_photo`                         | `PHOTO_WEBHOOK_URL`        | Получение фото (Base64)                                    |
| `/check/get_foreign_person`                | `FOREIGN_WEBHOOK_URL`      | Данные пересечения нерезидента                             |

---

## Общая структура ответа

Все webhook-ответы имеют единую обёртку с общими полями:

```json
{
  "data": {
    "attemptId": "RFJkzaealP6XF0CspiAoq",
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "lang": "ru",
    "data": { ... }
  },
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Успешно"
}
```

| Поле         | Тип      | Описание                                 |
| ------------ | -------- | ---------------------------------------- |
| `attemptId`  | `string` | ID сессии идентификации                  |
| `hash`       | `string` | Подпись для верификации данных           |
| `lang`       | `string` | Язык сессии (`ru`, `uz`, `en`)           |
| `data`       | `object` | Полезная нагрузка (зависит от типа хука) |
| `statusCode` | `number` | HTTP-код статуса                         |
| `type`       | `string` | Тип ответа (`SUCCESS`)                   |
| `message`    | `string` | Сообщение о результате                   |

---

## Настройка Redirect URL

Помимо Webhook URL, для корректной работы системы редиректа после завершения идентификации необходимо настроить статические Redirect URL в конфигурации проекта.

> **ВАЖНО:**
>
> 1. **Статические URL:** В конфигурации проекта прописываются **2 статических Redirect URL**:
>    - URL для перенаправления при успешной идентификации/верификации
>    - URL для перенаправления при неуспешном прохождении или ошибке
> 2. **Изменение только через поддержку:** Redirect URL настраиваются **один раз** при создании проекта и изменяются **ТОЛЬКО** по запросу в службу поддержки.
> 3. **Динамическое изменение недоступно:** В процессе работы через API изменить или переопределить Redirect URL **невозможно**.

### Необходимые Redirect URL

Для настройки или обновления Redirect URL обратитесь к нашей команде поддержки:

| Параметр конфигурации  | Описание                                        | Пример                      |
| ---------------------- | ----------------------------------------------- | --------------------------- |
| `SUCCESS_REDIRECT_URL` | URL страницы успешного прохождения              | https://example.com/success |
| `ERROR_REDIRECT_URL`   | URL страницы неуспешного прохождения или ошибки | https://example.com/error   |

---

# Резиденты

В данном разделе описаны хуки для работы с данными резидентов (граждан РУз и лиц с ПИНФЛ).

> **Напоминание:** Данные придут только на заранее прописанный URL и только при успешной сессии.

## 1. Получение паспорта

**Инициализация:** `[POST] https://{domain}/check/get_passport`

**Входные параметры:**

| Поле        | Тип      | Описание               | Обязательное | Пример                           |
| ----------- | -------- | ---------------------- | ------------ | -------------------------------- |
| `pinfl`     | `string` | ПИНФЛ                  | Да           | 12345678901234                   |
| `birthDate` | `string` | Дата рождения          | Да           | "12.12.2000"                     |
| `projectId` | `string` | ID проекта             | Да           | "yDkeHoHWXVqQ9M_URZUtb"          |
| `attemptId` | `string` | ID сессии              | Да           | "3HQVkBm_zCZqKFbTWVrhf"          |
| `secret`    | `string` | Секретный ключ проекта | Да           | "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5" |

```json
{
  "pinfl": "12345678901234",
  "birthDate": "12.12.2000",
  "projectId": "yDkeHoHWXVqQ9M_URZUtb",
  "attemptId": "3HQVkBm_zCZqKFbTWVrhf",
  "secret": "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5"
}
```

### `Хук получения пасспорта`

**Куда приходит:** На статический URL для паспорта.

**Условие:** Успешная сессия.

```json
{
  "data": {
    "attemptId": "RFJkzaealP6XF0CspiAoq",
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "lang": "ru",
    "data": {
      "surname": "IVANOV",
      "name": "IVAN",
      "lastName": "IVANOVICH",
      "document": "AB1234567",
      "sex": 1,
      "passportGivePlace": "РУВД ГОРОДА ТАШКЕНТА",
      "passportGivePlaceId": 12345,
      "passportDateBegin": "2020-01-01",
      "passportDateEnd": "2030-01-01",
      "passportType": "IDMS_RECV_MVD_IDCARD_CITIZEN"
    }
  },
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Успешно"
}
```

**Описание полей:**

| Поле                  | Тип данных       | Описание                                          |
| --------------------- | ---------------- | ------------------------------------------------- |
| `surname`             | `string`         | Фамилия                                           |
| `name`                | `string`         | Имя                                               |
| `lastName`            | `string`         | Отчество                                          |
| `document`            | `string`         | Серия и номер паспорта                            |
| `sex`                 | `number`         | Пол                                               |
| `passportGivePlace`   | `string`         | Кем выдан документ                                |
| `passportGivePlaceId` | `number`         | ID организации выдавшей документ (справочник МВД) |
| `passportDateBegin`   | `string`         | Дата начала действия документа                    |
| `passportDateEnd`     | `string`         | Дата окончания действия документа                 |
| `passportType`        | `string \| null` | Тип документа (см. справочник ниже)               |

---

## 2. Получение полной информации

**Инициализация:** `[POST] https://{domain}/check/get_person`

**Входные параметры:**

| Поле        | Тип      | Описание               | Обязательное | Пример                           |
| ----------- | -------- | ---------------------- | ------------ | -------------------------------- |
| `pinfl`     | `string` | ПИНФЛ                  | Да           | 12345678901234                   |
| `birthDate` | `string` | Дата рождения          | Да           | "12.12.2000"                     |
| `projectId` | `string` | ID проекта             | Да           | "yDkeHoHWXVqQ9M_URZUtb"          |
| `attemptId` | `string` | ID сессии              | Да           | "3HQVkBm_zCZqKFbTWVrhf"          |
| `secret`    | `string` | Секретный ключ проекта | Да           | "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5" |

```json
{
  "pinfl": "12345678901234",
  "birthDate": "12.12.2000",
  "projectId": "yDkeHoHWXVqQ9M_URZUtb",
  "attemptId": "3HQVkBm_zCZqKFbTWVrhf",
  "secret": "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5"
}
```

### `Хук полной информации`

**Куда приходит:** На статический URL для Person Info.

**Условие:** Успешная сессия.

Содержит объект `person` (паспортные данные) и `registration` (прописка).

```json
{
  "data": {
    "attemptId": "RFJkzaealP6XF0CspiAoq",
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "lang": "ru",
    "data": {
      "person": {
        "attemptId": "RFJkzaealP6XF0CspiAoq",
        "pinfl": "12345678901234",
        "document": "AB1234567",
        "surname": "IVANOV",
        "name": "IVAN",
        "lastName": "IVANOVICH",
        "birthCountry": "УЗБЕКИСТАН",
        "birthCountryCbuId": "860",
        "birthCountryId": "182",
        "birthDate": "2000-01-01",
        "birthPlace": "TOSHKENT",
        "birthPlaceId": "11",
        "birthPlaceCbuId": "27",
        "citizenship": "УЗБЕКИСТАН",
        "citizenshipId": "182",
        "citizenshipCbuId": "860",
        "liveStatus": true,
        "nationality": "УЗБЕК/УЗБЕЧКА",
        "nationalityId": "44",
        "nationalityCbuId": "01",
        "passportDateBegin": "2020-01-01",
        "passportDateEnd": "2030-01-01",
        "passportGivePlace": "РУВД ГОРОДА ТАШКЕНТА",
        "passportGivePlaceId": "12345",
        "passportType": "IDMS_RECV_MVD_IDCARD_CITIZEN",
        "passportTypeTitle": "ID КАРТА ГРАЖДАНИНА РЕСПУБЛИКИ УЗБЕКИСТАН",
        "passportTypeId": "501",
        "passportTypeCbuId": "0",
        "sex": 1
      },
      "registration": {
        "permanentRegistration": {
          "address": "МАХАЛЛЯ МФЙ, МАССИВ,  уй:1 хонадон:1",
          "cadastre": "10:01:01:01:01:0001:0001:001",
          "country": "ЎЗБЕКИСТОН",
          "countryId": "182",
          "countryCbuId": "860",
          "region": "ТОШКЕНТ ШАҲРИ",
          "regionId": "10",
          "regionCbuId": "26",
          "district": "ТОШКЕНТ ТУМАНИ",
          "districtId": "1001",
          "districtCbuId": "201",
          "maxala": "МАХАЛЛЯ МФЙ",
          "maxalaId": "1234",
          "street": "МАССИВ",
          "streetId": "5678",
          "registrationDate": "2020-01-01"
        }
      }
    }
  },
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Успешно"
}
```

**Описание полей: Структуры данных пользователя**

| Поле                  | Тип              | Описание                                  |
| --------------------- | ---------------- | ----------------------------------------- |
| `pinfl`               | `string`         | ПИНФЛ                                     |
| `surname`             | `string`         | Фамилия                                   |
| `name`                | `string`         | Имя                                       |
| `lastName`            | `string`         | Отчество                                  |
| `document`            | `string`         | Серия и номер паспорта                    |
| `sex`                 | `number`         | Пол (числовое значение)                   |
| `passportGivePlace`   | `string`         | Кем выдан документ                        |
| `passportGivePlaceId` | `string`         | ID кем выдан документ (справочник МВД)    |
| `passportDateBegin`   | `string`         | Дата начала действия документа            |
| `passportDateEnd`     | `string`         | Дата окончания действия документа         |
| `passportType`        | `string \| null` | Тип паспорта                              |
| `passportTypeTitle`   | `string \| null` | Тип паспорта (заголовок)                  |
| `passportTypeId`      | `string \| null` | ID типа паспорта (справочник МВД)         |
| `passportTypeCbuId`   | `string \| null` | ID типа паспорта (справочник ЦБ)          |
| `birthDate`           | `string`         | Дата рождения (формат `YYYY-MM-DD`)       |
| `birthPlace`          | `string \| null` | Место рождения                            |
| `birthPlaceId`        | `string \| null` | ID места рождения (справочник МВД)        |
| `birthPlaceCbuId`     | `string \| null` | ID места рождения (справочник ЦБ)         |
| `birthCountry`        | `string \| null` | Страна рождения                           |
| `birthCountryId`      | `string \| null` | ID страны рождения (справочник МВД)       |
| `birthCountryCbuId`   | `string \| null` | ID страны рождения (справочник ЦБ)        |
| `liveStatus`          | `boolean`        | Признак, жив ли человек на текущий момент |
| `nationality`         | `string \| null` | Национальность                            |
| `nationalityId`       | `string \| null` | ID национальности (справочник МВД)        |
| `nationalityCbuId`    | `string \| null` | ID национальности (справочник ЦБ)         |
| `citizenship`         | `string \| null` | Гражданство                               |
| `citizenshipId`       | `string \| null` | ID гражданства (справочник МВД)           |
| `citizenshipCbuId`    | `string \| null` | ID гражданства (справочник ЦБ)            |

---

## 3. Получение прописки

**Инициализация:** `[POST] https://{domain}/check/registration`

**Входные параметры:**

| Поле        | Тип      | Описание               | Обязательное | Пример                           |
| ----------- | -------- | ---------------------- | ------------ | -------------------------------- |
| `attemptId` | `string` | ID сессии              | Да           | "3HQVkBm_zCZqKFbTWVrhf"          |
| `pinfl`     | `string` | ПИНФЛ                  | Да           | 12345678901234                   |
| `projectId` | `string` | ID проекта             | Да           | "yDkeHoHWXVqQ9M_URZUtb"          |
| `secret`    | `string` | Секретный ключ проекта | Да           | "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5" |

```json
{
  "attemptId": "3HQVkBm_zCZqKFbTWVrhf",
  "pinfl": "12345678901234",
  "projectId": "yDkeHoHWXVqQ9M_URZUtb",
  "secret": "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5"
}
```

### `Хук получения прописки`

**Куда приходит:** На статический URL для прописки.

**Условие:** Успешная сессия.

```json
{
  "data": {
    "attemptId": "RFJkzaealP6XF0CspiAoq",
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "lang": "ru",
    "data": {
      "address": "МАХАЛЛЯ МФЙ, МАССИВ,  уй:1 хонадон:1",
      "cadastre": "10:01:01:01:01:0001:0001:001",
      "country": "ЎЗБЕКИСТОН",
      "countryId": "182",
      "region": "ТОШКЕНТ ШАҲРИ",
      "regionId": "10",
      "district": "ТОШКЕНТ ТУМАНИ",
      "districtId": "1001",
      "maxala": "МАХАЛЛЯ МФЙ",
      "maxalaId": "1234",
      "street": "МАССИВ",
      "streetId": "5678"
    }
  },
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Успешно"
}
```

**Описание полей: Структуры данных прописки**

| Поле         | Тип              | Описание                      |
| ------------ | ---------------- | ----------------------------- |
| `address`    | `string \| null` | Адрес                         |
| `cadastre`   | `string \| null` | Кадастровый номер             |
| `country`    | `string \| null` | Страна                        |
| `countryId`  | `string \| null` | ID страны из справочника МВД  |
| `region`     | `string \| null` | Регион (область)              |
| `regionId`   | `string \| null` | ID региона из справочника МВД |
| `district`   | `string \| null` | Район                         |
| `districtId` | `string \| null` | ID района из справочника МВД  |
| `maxala`     | `string \| null` | Махалля                       |
| `maxalaId`   | `string \| null` | ID махалли из справочника МВД |
| `street`     | `string \| null` | Улица                         |
| `streetId`   | `string \| null` | ID улицы из справочника МВД   |

---

## 4. Получение фотографии

**Инициализация:** `[POST] https://{domain}/check/get_photo`

**Входные параметры:**

| Поле        | Тип      | Описание               | Обязательное | Пример                           |
| ----------- | -------- | ---------------------- | ------------ | -------------------------------- |
| `projectId` | `string` | ID проекта             | Да           | "yDkeHoHWXVqQ9M_URZUtb"          |
| `attemptId` | `string` | ID сессии              | Да           | "3HQVkBm_zCZqKFbTWVrhf"          |
| `secret`    | `string` | Секретный ключ проекта | Да           | "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5" |

```json
{
  "projectId": "yDkeHoHWXVqQ9M_URZUtb",
  "attemptId": "3HQVkBm_zCZqKFbTWVrhf",
  "secret": "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5"
}
```

### `Хук получения фото`

**Куда приходит:** На статический URL для фото.

**Условие:** Успешная сессия.

```json
{
  "data": {
    "attemptId": "RFJkzaealP6XF0CspiAoq",
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "lang": "ru",
    "data": {
      "crc": "94c07e38",
      "photo": "/9j/4AAQSk..."
    }
  },
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Успешно"
}
```

**Описание полей:**

| Поле    | Тип данных | Описание                       |
| ------- | ---------- | ------------------------------ |
| `crc`   | `string`   | Контрольная сумма              |
| `photo` | `string`   | Base64 фотография пользователя |

---

# Нерезиденты

В данном разделе описаны хуки для работы с иностранными гражданами.

> **Напоминание:** Данные придут только на заранее прописанный URL и только при успешной сессии.

## 1. Получение пересечения

**Инициализация:** `[POST] https://{domain}/check/get_foreign_person`

**Входные параметры:**

| Поле        | Тип      | Описание                        | Обязательное | Пример                           |
| ----------- | -------- | ------------------------------- | ------------ | -------------------------------- |
| `document`  | `string` | Серия и номер паспорта (слитно) | Да           | AB12345678                       |
| `projectId` | `string` | ID проекта                      | Да           | "yDkeHoHWXVqQ9M_URZUtb"          |
| `attemptId` | `string` | ID сессии                       | Да           | "3HQVkBm_zCZqKFbTWVrhf"          |
| `secret`    | `string` | Секретный ключ проекта          | Да           | "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5" |

```json
{
  "document": "AB12345678",
  "projectId": "yDkeHoHWXVqQ9M_URZUtb",
  "attemptId": "3HQVkBm_zCZqKFbTWVrhf",
  "secret": "y1iPwmpVmxOe4RFGvUoVHmPmlQ0nY5"
}
```

### `Хук получения пересечения`

**Куда приходит:** На статический URL для нерезидентов.

**Условие:** Успешная сессия.

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Успешно",
  "data": {
    "attemptId": "RFJkzaealP6XF0CspiAoq",
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "lang": "ru",
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

**Описание полей:**

| Поле                   | Тип              | Описание                      |
| ---------------------- | ---------------- | ----------------------------- |
| `document`             | `string`         | Серия и номер паспорта        |
| `reg_date`             | `string`         | Дата въезда                   |
| `direction_type_id`    | `string`         | Тип направления (въезд/выезд) |
| `transport_type_code`  | `string`         | Код типа транспорта           |
| `citizenship`          | `string`         | Гражданство                   |
| `direction_country_id` | `string \| null` | ID страны направления         |
| `full_name`            | `string \| null` | Ф.И.О.                        |
| `birth_date`           | `string \| null` | Дата рождения                 |

---

# Справочники

### Справочник типов документов

| Код                            | Наименование                              |
| ------------------------------ | ----------------------------------------- |
| `IDMS_RECV_IP_DOCUMENTS`       | Загранпаспорт гражданина РУз              |
| `IDMS_RECV_CITIZ_DOCUMENTS`    | Общегражданский биометрический паспорт    |
| `IDMS_RECV_LBG_DOCUMENTS`      | Проездной документ ЛБГ                    |
| `IDMS_RECV_MVD_IDCARD_CITIZEN` | ID-карта гражданина Республики Узбекистан |
| `IDMS_RECV_MVD_IDCARD_FOREIGN` | ID-карта иностранного гражданина          |
| `IDMS_RECV_MVD_IDCARD_LBG`     | ID-карта ЛБГ                              |
| `IDMS_RECV_MVD_IDCARD_NEWBORN` | ID-карта новорожденного                   |
| `IDMS_RECV_MJ_BIRTH_CERTS`     | Свидетельства о рождении                  |
