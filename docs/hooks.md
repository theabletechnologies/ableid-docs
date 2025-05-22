---
id: hooks
title: Хуки
---

## `Хук получения паспорта`

**Описание:** Получение паспорта

### Ответы

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Сообщение",
  "data": {
    "signature": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "attemptId": "RFJkzaealP6XF0CspiAoq",
    "data": {
      "address": null,
      "cadastre": null,
      "country": null,
      "countryId": null,
      "region": null,
      "regionId": null,
      "district": null,
      "districtId": null,
      "maxala": null,
      "maxalaId": null,
      "street": null,
      "streetId": null
    }
  }
}
```

**Описание полей:**

| Поле        | Тип данных       | Описание                          |
|-------------|------------------|-----------------------------------|
| `address`   | `string \| null` | Адрес                             |
| `cadastre`  | `string \| null` | Кадастровый номер                 |
| `country`   | `string \| null` | Данные о стране                   |
| `countryId` | `string \| null` | ID страны                         |
| `region`    | `string \| null` | Данные о регионе (области)        |
| `regionId`  | `string \| null` | ID региона (области)              |
| `district`  | `string \| null` | Данные о районе                   |
| `districtId`| `string \| null` | ID района                         |
| `maxala`    | `string \| null` | Данные о махалле                  |
| `maxalaId`  | `string \| null` | ID махалли                        |
| `street`    | `string \| null` | Данные о улице                    |
| `streetId`  | `string \| null` | ID улицы                          |


---
## `Хук получения прописки`

**Описание:** Получение прописки

### Ответы

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Сообщение",
  "data": {
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "attemptId": "RFJkzaealP6XF0CspiAoq",
    "data": {
      "attemptId": "",
      "surname": "",
      "name": "",
      "lastName": "",
      "document": "",
      "sex": 0,
      "passportGivePlace": "",
      "passportGivePlaceId": 0,
      "passportDateBegin": "",
      "passportDateEnd": "",
      "passportType": ""
    }
  }
}
```

**Описание полей:**

| Поле                  | Тип данных        | Описание                                               |
|-----------------------|------------------|--------------------------------------------------------|
| `attemptId`           | `string`         | ID сессии                                              |
| `surname`             | `string`         | Фамилия                                                |
| `name`                | `string`         | Имя                                                    |
| `lastName`            | `string`         | Отчество                                               |
| `document`            | `string`         | Серия и номер паспорта                                 |
| `sex`                 | `number`         | Пол                                                    |
| `passportGivePlace`   | `string`         | Кем выдан документ                                     |
| `passportGivePlaceId` | `number`         | Кем выдан документ (из справочника)                   |
| `passportDateBegin`   | `string`         | Дата начала действия документа                         |
| `passportDateEnd`     | `string`         | Дата окончания действия документа                      |
| `passportType`        | `string \| null` | Тип документа (см. справочник ниже)                   |

### Справочник типов документов

| Код                                 | Наименование                                         |
|-------------------------------------|------------------------------------------------------|
| `IDMS_RECV_IP_DOCUMENTS`            | Загранпаспорт гражданина РУз                         |
| `IDMS_RECV_CITIZ_DOCUMENTS`         | Общегражданский биометрический паспорт              |
| `IDMS_RECV_LBG_DOCUMENTS`           | Проездной документ ЛБГ                               |
| `IDMS_RECV_MVD_IDCARD_CITIZEN`      | ID-карта гражданина Республики Узбекистан            |
| `IDMS_RECV_MVD_IDCARD_FOREIGN`      | ID-карта иностранного гражданина                     |
| `IDMS_RECV_MVD_IDCARD_LBG`          | ID-карта ЛБГ                                         |
| `IDMS_RECV_MVD_IDCARD_NEWBORN`      | ID-карта новорожденного                              |
| `IDMS_RECV_MJ_BIRTH_CERTS`          | Свидетельства о рождении                             |

## `Хук получения полной информации о человеке`

**Описание:** Получение полной информации о человеке. Все информация об прописке опциональная, временная прописка приходит массивом, если данные есть

### Ответы

```json
{
  "statusCode": 200,
  "type": "SUCCESS",
  "message": "Сообщение",
  "data": {
    "hash": "1BF41318DFA700936EC613BB8711DC4C68B23C7F",
    "attemptId": "RFJkzaealP6XF0CspiAoq",
    "data": {
      "person": {
        "attemptId": "",
        "pinfl": "",
        "surname": "",
        "name": "",
        "lastName": "",
        "document": "",
        "sex": "",
        "passportGivePlace": "",
        "passportGivePlaceId": "",
        "passportDateBegin": "",
        "passportDateEnd": "",
        "passportType": "",
        "passportTypeTitle": "",
        "passportTypeId": "",
        "passportTypeCbuId": "",
        "birthDate": "",
        "birthPlace": "",
        "birthPlaceId": "",
        "birthPlaceCbuId": "",
        "birthCountry": "",
        "birthCountryId": "",
        "birthCountryCbuId": "",
        "liveStatus": true,
        "nationality": "",
        "nationalityId": "",
        "nationalityCbuId": "",
        "citizenship": "",
        "citizenshipId": "",
        "citizenshipCbuId": ""
      },
      "registration": {
        "permanentRegistration": {
          "address": null,
          "cadastre": null,
          "country": null,
          "countryId": null,
          "countryCbuId": null,
          "region": null,
          "regionId": null,
          "regionCbuId": null,
          "district": null,
          "districtId": null,
          "districtCbuId": null,
          "maxala": null,
          "maxalaId": null,
          "maxalaCbuId": null,
          "street": null,
          "streetId": null,
          "streetCbuId": null,
          "registrationDate": null
        },
        "temporaryRegistrations": null
      }
    }
  }
}
```

**Описание полей: Структуры данных пользователя**

| Поле                  | Тип              | Описание                                  |
| --------------------- | ---------------- | ----------------------------------------- |
| `attemptId`           | `string`         | ID сессии                                 |
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

**Описание полей: Структуры данных прописки (permanentRegistration и temporaryRegistrations)**

| Поле               | Тип              | Описание                      |
| ------------------ | ---------------- |-------------------------------|
| `address`          | `string \| null` | Адрес                         |
| `cadastre`         | `string \| null` | Кадастровый номер             |
| `country`          | `string \| null` | Страна                        |
| `countryId`        | `string \| null` | ID страны из справочника МВД  |
| `countryCbuId`     | `string \| null` | ID страны из справочника ЦБ   |
| `region`           | `string \| null` | Регион (область)              |
| `regionId`         | `string \| null` | ID региона из справочника МВД |
| `regionCbuId`      | `string \| null` | ID региона из справочника ЦБ  |
| `district`         | `string \| null` | Район                         |
| `districtId`       | `string \| null` | ID района из справочника МВД  |
| `districtCbuId`    | `string \| null` | ID района из справочника ЦБ   |
| `maxala`           | `string \| null` | Махалля                       |
| `maxalaId`         | `string \| null` | ID махалли из справочника МВД |
| `maxalaCbuId`      | `string \| null` | ID махалли из справочника ЦБ  |
| `street`           | `string \| null` | Улица                         |
| `streetId`         | `string \| null` | ID улицы из справочника МВД   |
| `streetCbuId`      | `string \| null` | ID улицы из справочника ЦБ    |
| `registrationDate` | `string \| null` | Дата регистрации              |

---
