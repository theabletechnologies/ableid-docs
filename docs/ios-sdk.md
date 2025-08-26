---
id: ios-sdk
title: Able ID - iOS(sdk)
---

# iOS SDK

Able ID SDK обеспечивает надежное распознавание лиц и защиту от мошеннических попыток. Использует биометрическую верификацию и предотвращает атаки подмены, включая статические изображения, печатные фотографии, видеоповторы, инъекции и маски, обеспечивая безопасную и надежную идентификацию.

<p align="center">
<a href="https://cocoapods.org/pods/AbleIDSDK"><img src="https://img.shields.io/github/v/tag/JasurSalimov/AbleIDSDK.svg?color=blue&include_prereleases=&sort=semver"/></a>
<a href="https://swift.org/package-manager/"><img src="https://img.shields.io/badge/SPM-supported-DE5C43.svg?style=flat"/></a>
<a href="https://raw.githubusercontent.com/onevcat/AbleIDSDK/LICENSE"><img src="https://img.shields.io/badge/license-MIT-black"/></a>
<a href="https://cocoapods.org/pods/AbleIDSDK"><img src="https://img.shields.io/cocoapods/v/AbleIDSDK.svg?style=flat"/></a>
<a href="https://cocoapods.org/pods/AbleIDSDK"><img src="https://img.shields.io/cocoapods/p/AbleIDSDK.svg?style=flat"/></a>
</p>

## Возможности

- [x] Распознавание лиц с технологией Active Liveness Detection

## iOS SDK

**Платформа:** iOS устройства  
**Репозиторий:** [https://github.com/theabletechnologies/AbleIDSDK](https://github.com/theabletechnologies/AbleIDSDK)

### Требования

- iOS 13.0+
- Swift 5.0+

### Установка

#### CocoaPods

```ruby
source 'https://github.com/CocoaPods/Specs.git'
platform :ios, '13.0'
use_frameworks!

target 'MyApp' do
  pod 'AbleIDSDK'
end
```

#### Swift Package Manager

Скоро будет доступен

#### Pre-built Framework

1. Откройте [страницу релизов](https://github.com/theabletechnologies/AbleIDSDK/releases), скачайте последнюю версию AbleIDSDK из раздела assets
2. Перетащите `AbleIDSDK.xcframework` в ваш проект и добавьте к цели (обычно app target)
3. Выберите вашу цель, во вкладке "General" найдите секцию "Frameworks, Libraries, and Embedded Content", установите `Embed Without Signing` для AbleIDSDK

### Быстрый старт

#### 1. Импорт SDK

Убедитесь, что вы интегрировали Able ID SDK в ваш проект. Затем импортируйте необходимый модуль:

```swift
import AbleIDSDK
```

#### 2. Получение данных сессии

**Важно:** Прежде чем использовать SDK, необходимо получить данные сессии (`attemptId` и `baseUrl`) от AbleID backend через ваш сервер. Ваш backend должен вызвать один из методов AbleID API для инициализации сессии идентификации и передать полученные данные в мобильное приложение.

#### 3. Создание транзакции

Создайте объект Transaction используя данные, полученные от вашего backend сервера:

```swift
let transaction: Transaction = .init(
    attemptId: receivedAttemptId,  // Получен от вашего backend
    baseUrl: receivedBaseUrl       // Получен от вашего backend
)
```

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

### Локализация

Able ID SDK поддерживает несколько языков. Вы можете указать желаемый язык, используя enum **AbleLocale**:

- **.russian** - Русский язык
- **.english** - Английский язык  
- **.uzbek** - Узбекский язык
- **.preferred** - Использует предпочитаемый язык устройства

```swift
AbleID.service.startLiveness(
    from: UIViewController, 
    transaction: Transaction, 
    locale: AbleLocale
)
```

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
