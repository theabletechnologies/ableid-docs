---
id: ios-sdk
title: iOS SDK
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

#### 2. Создание транзакции

Создайте объект Transaction с уникальным `your_unique_attempt_id` и `your_liveness_end_point`. ID поможет вам отслеживать конкретную попытку проверки liveness. Endpoint (URL) для API проверки liveness:

```swift
let transaction: Transaction = .init(
    attemptId: "your_unique_attempt_id", 
    baseUrl: "your_liveness_end_point"
)
```

#### 3. Инициация проверки Liveness

Вызовите метод **startLiveness** объекта **AbleID.service**, передав текущий **UIViewController**, объект **Transaction** и желаемую **locale**:

```swift
AbleID.service.startLiveness(from: self, transaction: transaction, locale: .russian) { result in
    switch result {
    case .success(let response):
        // Обработка успешной проверки liveness
        print(response)
    case .failure(let error):
        // Обработка ошибок
        print(error)
    }
}
```

#### 4. Обработка результата

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
        let transaction = Transaction(
            attemptId: UUID().uuidString,
            baseUrl: "https://faceid-back.theable.tech"
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
        
        // Здесь вы можете обработать результат проверки
        // например, отправить данные на ваш сервер
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

## Android SDK

**Статус:** В разработке

## Поддержка

Для получения технической поддержки или сообщения об ошибках:

- **GitHub Issues:** [https://github.com/theabletechnologies/AbleIDSDK/issues](https://github.com/theabletechnologies/AbleIDSDK/issues)
- **Email:** jasurtsalimov@gmail.com

## Автор

Jasur Salimov, jasurtsalimov@gmail.com

## Лицензия

AbleIDSDK доступен под лицензией MIT. Подробности см. в файле LICENSE.
