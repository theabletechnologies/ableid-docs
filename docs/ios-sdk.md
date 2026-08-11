---
id: ios-sdk
title: Able ID - iOS(sdk)
---

# iOS SDK

Able ID SDK обеспечивает надежное распознавание лиц и защиту от мошеннических попыток. Использует биометрическую верификацию и предотвращает атаки подмены, включая статические изображения, печатные фотографии, видеоповторы, инъекции и маски, обеспечивая безопасную и надежную идентификацию.

<p align="center">
<a href="https://github.com/theabletechnologies/AbleIDSDK/releases"><img src="https://img.shields.io/github/v/tag/theabletechnologies/AbleIDSDK.svg?color=blue&include_prereleases=&sort=semver"/></a>
<a href="https://swift.org/package-manager/"><img src="https://img.shields.io/badge/SPM-supported-DE5C43.svg?style=flat"/></a>
<a href="https://raw.githubusercontent.com/theabletechnologies/AbleIDSDK/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-black"/></a>
<a href="https://developer.apple.com/ios/"><img src="https://img.shields.io/badge/platform-iOS-lightgrey.svg?style=flat"/></a>
</p>

## Возможности

- [x] Распознавание лиц с технологией Active Liveness Detection

## iOS SDK

**Платформа:** iOS устройства  
**Репозиторий:** [https://github.com/theabletechnologies/AbleIDSDK](https://github.com/theabletechnologies/AbleIDSDK)

### Требования

- iOS 13.0+
- Swift 5.5+ (Xcode 13 или новее)

### Установка

#### Swift Package Manager

SDK распространяется через Swift Package Manager. В Xcode выберите **File ▸ Add Package Dependencies…** и введите адрес репозитория:

```
https://github.com/theabletechnologies/AbleIDSDK
```

Добавьте библиотеку `AbleIDSDK` к вашей цели (app target). Все необходимые зависимости разрешаются автоматически — не добавляйте их вручную.

Либо укажите зависимость в вашем `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/theabletechnologies/AbleIDSDK.git", from: "1.1.6")
]
```

:::note

При первом разрешении пакета Xcode может пометить бинарный фреймворк как неподписанную зависимость (unsigned dependency) — подтвердите, чтобы продолжить.

:::

:::caution Переход с CocoaPods

Установка через CocoaPods больше не поддерживается. Если вы использовали `pod 'AbleIDSDK'`, удалите его из Podfile и подключите SDK через Swift Package Manager.

:::

#### Разрешение на использование камеры

SDK требует доступ к камере. Добавьте следующий ключ в `Info.plist` вашего приложения:

```xml
<key>NSCameraUsageDescription</key>
<string>Доступ к камере необходим для проверки liveness.</string>
```

### Быстрый старт

#### 1. Импорт SDK

Убедитесь, что вы интегрировали Able ID SDK в ваш проект. Затем импортируйте необходимый модуль:

```swift
import AbleIDSDK
```

#### 2. Получение данных сессии

**Важно:** Прежде чем использовать SDK, необходимо получить данные сессии (`attemptId` и `baseUrl`) от AbleID backend через ваш сервер. Ваш backend должен вызвать один из методов AbleID API для инициализации сессии идентификации и передать полученные данные в мобильное приложение.

API возвращает `attempt_id` и `full_url`. **Важно:** `full_url` — это полная ссылка для веб-браузера (например, `https://ableid-dev-back.theable.tech/public/zChFkO2AQ6Ab_IOF5uR5Z?lang=ru`). Для SDK нужен только домен — `baseUrl` (например, `https://ableid-dev-back.theable.tech`).

#### 3. Создание транзакции

Создайте объект Transaction используя данные, полученные от вашего backend сервера:

```swift
let transaction: Transaction = .init(
    attemptId: receivedAttemptId,  // Получен от вашего backend
    baseUrl: receivedBaseUrl       // Только домен, например: "https://ableid-dev-back.theable.tech"
)
```

:::caution Не путайте fullUrl и baseUrl

API возвращает `full_url` вида:
`https://ableid-dev-back.theable.tech/public/zChFkO2AQ6Ab_IOF5uR5Z?lang=ru`

Для SDK необходим только домен (**baseUrl**):
`https://ableid-dev-back.theable.tech`

:::

#### 4. Инициация проверки Liveness

Вызовите метод **startLiveness** объекта **AbleID.service**, передав текущий **UIViewController**, объект **Transaction** и желаемую **locale**:

```swift
AbleID.service.startLiveness(from: self, transaction: transaction, locale: .russian) { result in
    switch result {
    case .success(let response):
        // Обработка успешной проверки liveness
        print("Liveness check completed successfully: \(response)")
        handleSuccess(response)
    case .failure(let error):
        // Обработка ошибок
        print("Liveness check failed: \(error)")
        handleError(error)
    }
}
```

#### 5. Обработка результата

Метод **startLiveness** выполняется асинхронно, возвращая **LivenessResult**, который указывает, была ли проверка liveness успешной или неудачной:

```swift
public typealias LivenessResult = Result<AbleIDSDK.AbleIdLivenessResponse, AbleIDSDK.AbleIdLivenessError>
```

При успешном завершении возвращается **AbleIdLivenessResponse** со следующими полями:

| Поле            | Тип        | Описание                                        |
|-----------------|------------|-------------------------------------------------|
| `transactionId` | `String?`  | Идентификатор транзакции, присвоенный сервером  |
| `estimatedAge`  | `NSNumber?`| Предполагаемый возраст пользователя             |
| `status`        | `UInt?`    | Код статуса от liveness-движка                  |
| `tag`           | `String?`  | Опциональный тег от backend                     |
| `error`         | `NSError?` | Низкоуровневая ошибка движка, если возникла     |

### Локализация

Able ID SDK поддерживает несколько языков. Вы можете указать желаемый язык, используя enum **AbleLocale**:

- **.russian** - Русский язык
- **.english** - Английский язык  
- **.uzbek** - Узбекский язык
- **.preferred** - Использует предпочитаемый язык устройства (значение по умолчанию)

```swift
AbleID.service.startLiveness(
    from: UIViewController, 
    transaction: Transaction, 
    locale: AbleLocale
)
```

### Настройка внешнего вида

SDK позволяет настроить цвета экранов под стиль вашего приложения. Создайте объект **AbleIdConfiguration** и передайте его в метод **configure** до запуска проверки liveness:

```swift
let configuration = AbleIdConfiguration(
    screenBackgroundColor: .white,
    buttonBackgroundColor: .black,
    buttonTitleColor: .white,
    livenessSectorTargetColor: .green
)

AbleID.service.configure(with: configuration)
```

| Параметр                    | Описание                                              |
|-----------------------------|-------------------------------------------------------|
| `screenBackgroundColor`     | Фон всех экранов SDK                                  |
| `buttonBackgroundColor`     | Цвет заливки основных кнопок                          |
| `buttonTitleColor`          | Цвет текста основных кнопок                           |
| `livenessSectorTargetColor` | Цвет целевого сектора во время проверки liveness      |

### Обработка ошибок

Able ID SDK предоставляет перечисление ошибок **AbleIdLivenessError**, которое включает пять различных случаев:

- **userCancellationError** - Пользователь отменил процесс liveness
- **ableLivenessProcessingError** - Не удалось запустить Able Liveness
- **ableInstructionsLoadError** - Не удалось загрузить инструкции
- **ableInitializationError** - Не удалось инициализировать Able Liveness
- **ableCompletionRequestError** - Не удалось завершить запрос

### Пример полной интеграции

```swift
import UIKit
import AbleIDSDK

class ViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func startLivenessCheck(_ sender: UIButton) {
        // Предполагается, что данные сессии уже получены от вашего backend
        startLivenessCheck(with: receivedAttemptId, baseUrl: receivedBaseUrl)
    }
    
    private func startLivenessCheck(with attemptId: String, baseUrl: String) {
        let transaction = Transaction(
            attemptId: attemptId,  // Получен от вашего backend
            baseUrl: baseUrl       // Получен от вашего backend
        )
        
        AbleID.service.startLiveness(
            from: self,
            transaction: transaction,
            locale: .russian
        ) { [weak self] result in
            DispatchQueue.main.async {
                switch result {
                case .success(let response):
                    self?.handleSuccess(response)
                case .failure(let error):
                    self?.handleError(error)
                }
            }
        }
    }
    
    private func handleSuccess(_ response: AbleIdLivenessResponse) {
        // Обработка успешного результата
        print("Liveness check completed successfully: \(response)")
        
        // Результат будет автоматически отправлен на ваш webhook URL
        // Вы можете также уведомить ваш backend о завершении процесса
      
    }
    
    private func handleError(_ error: AbleIdLivenessError) {
        let message: String
        
        switch error {
        case .userCancellationError:
            message = "Пользователь отменил проверку"
        case .ableLivenessProcessingError:
            message = "Ошибка обработки liveness"
        case .ableInstructionsLoadError:
            message = "Ошибка загрузки инструкций"
        case .ableInitializationError:
            message = "Ошибка инициализации"
        case .ableCompletionRequestError:
            message = "Ошибка завершения запроса"
        }
        
        // Показать пользователю сообщение об ошибке
        let alert = UIAlertController(
            title: "Ошибка",
            message: message,
            preferredStyle: .alert
        )
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
}
```

## Поддержка

Для получения технической поддержки или сообщения об ошибках:

- **GitHub Issues:** [https://github.com/theabletechnologies/AbleIDSDK/issues](https://github.com/theabletechnologies/AbleIDSDK/issues)
- **Email:** jasurtsalimov@gmail.com

## Автор

Jasur Salimov, jasurtsalimov@gmail.com

## Лицензия

AbleIDSDK доступен под лицензией MIT. Подробности см. в файле LICENSE.
