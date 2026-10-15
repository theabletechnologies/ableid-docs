---
id: android-sdk
title: Able ID - Android(sdk)
---

# Android SDK

Able ID SDK обеспечивает надежное распознавание лиц и защиту от мошеннических попыток. Использует биометрическую верификацию и предотвращает атаки подмены, включая статические изображения, печатные фотографии, видеоповторы, инъекции и маски, обеспечивая безопасную и надежную идентификацию.

## Возможности

- [x] Распознавание лиц с технологией Liveness Detection в активном и пассивном режимах

Режим проверки определяется для каждой сессии на стороне AbleID — в приложении ничего настраивать не нужно.

## Требования

- **minSdk:** 21
- **compileSdk:** 35 или выше
- **JavaVersion:** 17
- **Kotlin:** 2.1 или новее — если приложение написано на Kotlin (в том числе Android-часть Flutter-проекта)
- **Тема приложения:** наследуется от `Theme.AppCompat` (подходят также `Theme.MaterialComponents` и `Theme.Material3`)

:::caution Тема приложения

Экраны SDK используют тему, заданную у элемента `<application>` в `AndroidManifest.xml`. Если она не наследуется от `Theme.AppCompat` (например, `android:Theme.Material.Light.NoActionBar` из шаблона Jetpack Compose), при запуске проверки приложение завершится с ошибкой `IllegalStateException: You need to use a Theme.AppCompat theme`. Укажите у `<application>` тему на основе AppCompat — для своих Activity прежнюю тему можно сохранить, задав ее в атрибуте `android:theme` каждой Activity.

:::

:::note Обновление до 1.2.0

Версия 1.2.0 не меняет API и требования по сравнению с 1.1.6 — достаточно обновить номер версии. В ней обновлен движок проверки liveness: улучшена защита от атак подмены, активная проверка работает стабильнее, а подсказки на экране камеры больше не отображаются без перевода. Если вы обновляетесь с версии ниже 1.1.6, учтите, что начиная с 1.1.6 для приложений на Kotlin нужен Kotlin 2.1 или новее.

:::

## Установка

### Добавление зависимости библиотеки

В файле `build.gradle.kts` модуля app добавьте зависимость SDK (последняя версия — `v1.2.0`):

```kotlin
dependencies {
    implementation("com.github.theabletechnologies:AbleIDSDK-Jitpack:v1.2.0")
}
```

### Настройка dependencyResolutionManagement в settings.gradle.kts

В секции `dependencyResolutionManagement` файла `settings.gradle.kts` добавьте необходимые Maven репозитории, сохранив существующие `google()` и `mavenCentral()`. **Примечание:** Убедитесь, что включили учетные данные для доступа к приватным репозиториям, используемым библиотекой. Учетные данные будут предоставлены отдельно:

```kotlin
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven {
            url = uri("https://jitpack.io")
            credentials {
                username = "YOUR_JITPACK_USERNAME" // Будет предоставлен отдельно
            }
        }
        maven {
            url = uri("https://maven.regulaforensics.com/RegulaDocumentReader")
        }
    }
}
```

**Важно:** Замените `YOUR_JITPACK_USERNAME` на учетные данные, которые будут предоставлены вам командой AbleID.

### Разрешения

Добавлять разрешения в `AndroidManifest.xml` не нужно: SDK объявляет `CAMERA`, `INTERNET`, `VIBRATE` и `FLASHLIGHT` в своем манифесте, и при сборке они автоматически попадают в ваше приложение. Доступ к камере SDK запрашивает у пользователя сам перед началом проверки.

## Быстрый старт

### 1. Импорт SDK

Убедитесь, что вы интегрировали Able ID SDK в ваш проект. Затем импортируйте необходимые классы:

```kotlin
import com.ableid.sdk.external.AbleID
import com.ableid.sdk.external.AbleIdLivenessError
import com.ableid.sdk.external.AbleIdLivenessResponse
import com.ableid.sdk.external.AbleLocale
import com.ableid.sdk.external.LivenessResult
import com.ableid.sdk.external.Transaction
```

### 2. Получение данных сессии

**Важно:** Прежде чем использовать SDK, необходимо получить данные сессии (`attemptId` и `baseUrl`) от AbleID backend через ваш сервер. Ваш backend должен вызвать один из методов AbleID API для инициализации сессии идентификации и передать полученные данные в мобильное приложение.

API возвращает `attemptId` и `fullUrl`. **Важно:** `fullUrl` — это полная ссылка для веб-браузера (например, `https://ableid-dev-back.theable.tech/public/zChFkO2AQ6Ab_IOF5uR5Z?lang=ru`). Для SDK нужен только домен — `baseUrl` (например, `https://ableid-dev-back.theable.tech`). `attemptId` передавайте в SDK без изменений.

### 3. Создание транзакции

Создайте объект Transaction используя данные, полученные от вашего backend сервера:

```kotlin
val transaction: Transaction = Transaction(
    attemptId = receivedAttemptId,  // Получен от вашего backend
    baseUrl = receivedBaseUrl       // Только домен, например: "https://ableid-dev-back.theable.tech"
)
```

:::caution Не путайте fullUrl и baseUrl

API возвращает `fullUrl` вида:
`https://ableid-dev-back.theable.tech/public/zChFkO2AQ6Ab_IOF5uR5Z?lang=ru`

Для SDK необходим только домен (**baseUrl**) — без пути и завершающего `/`:
`https://ableid-dev-back.theable.tech`

:::

### 4. Инициация проверки Liveness

Вызовите метод **startLiveness** объекта **AbleID.service()**, передав текущую **Activity**, объект **Transaction** и желаемую **locale**:

```kotlin
AbleID.service().startLiveness(this, transaction, AbleLocale.ru) { result ->
    when (result) {
        is LivenessResult.Success -> {
            val response = result.response
            Log.d("tag", "Able Liveness final result - success $response")
            // Обработка успешного результата
            handleSuccess(response)
        }
        is LivenessResult.Failure -> {
            val error = result.error
            Log.d("tag", "Able Liveness final result - fail $error")
            // Обработка ошибки
            handleError(error)
        }
    }
}
```

SDK открывает свои экраны поверх вашего приложения и закрывает их сам.

:::caution Обработка результата в колбэке

Колбэк вызывается в главном потоке до того, как SDK закроет свой экран, — в этот момент ваша Activity остановлена. Транзакции фрагментов и навигация (например, `navigate()`) прямо в колбэке завершатся ошибкой `IllegalStateException` или будут проигнорированы. Сохраните результат (например, во `ViewModel`) и обработайте его, когда Activity снова станет активной. Логирование и `Toast` можно вызывать сразу.

:::

### 5. Обработка результата

Метод **startLiveness** выполняется асинхронно и передает в колбэк значение **LivenessResult**, которое указывает, была ли проверка liveness успешной или неудачной:

```kotlin
public sealed class LivenessResult {
    public data class Success(val response: AbleIdLivenessResponse) : LivenessResult()
    public data class Failure(val error: AbleIdLivenessError) : LivenessResult()
}
```

При успешном завершении возвращается **AbleIdLivenessResponse** со следующими полями:

| Поле            | Тип       | Описание                                                                  |
|-----------------|-----------|---------------------------------------------------------------------------|
| `transactionId` | `String?` | Идентификатор транзакции, присвоенный сервером                            |
| `estimatedAge`  | `Number?` | Предполагаемый возраст пользователя                                       |
| `tag`           | `String?` | Уникальный идентификатор (UUID), который SDK присваивает каждой проверке |

Успешный результат означает, что проверка liveness пройдена и сессия передана в AbleID. Итоговый результат идентификации или верификации AbleID отправляет на ваш backend через [webhook](ableid.md#webhook-уведомления) — ориентируйтесь на него.

## Локализация

Able ID SDK поддерживает несколько языков. Язык экранов SDK задается обязательным параметром `locale` метода `startLiveness` — язык устройства автоматически не определяется.

### Поддерживаемые языки

SDK поддерживает следующие языки через enum `AbleLocale`:

- **AbleLocale.en** - Английский язык
- **AbleLocale.ru** - Русский язык  
- **AbleLocale.uz** - Узбекский язык

```kotlin
AbleID.service().startLiveness(this, transaction, AbleLocale.uz) { result ->
    // ...
}
```

## Обработка ошибок

Able ID SDK предоставляет sealed-класс ошибок **AbleIdLivenessError**, который включает три случая:

- **UserCancellationError** - Пользователь закрыл экран SDK (кнопкой закрытия или кнопкой «Назад»), не начав проверку
- **AbleLivenessProcessingError** - Проверка liveness не пройдена или прервана: например, исчерпаны попытки, нет доступа к камере, ошибка сети или сервера, не удалось сообщить серверу AbleID о завершении сессии
- **AbleInstructionsLoadError** - Не удалось загрузить видеоинструкции или инициализировать модуль проверки liveness

При `AbleInstructionsLoadError` SDK сам показывает пользователю сообщение об ошибке и вызывает колбэк после того, как пользователь его закроет.

Краткое описание ошибки на английском языке доступно в свойстве `message` (например, для логов).

## Пример полной интеграции

```kotlin
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.ableid.sdk.external.AbleID
import com.ableid.sdk.external.AbleIdLivenessError
import com.ableid.sdk.external.AbleIdLivenessResponse
import com.ableid.sdk.external.AbleLocale
import com.ableid.sdk.external.LivenessResult
import com.ableid.sdk.external.Transaction

class MainActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        findViewById<Button>(R.id.startLivenessButton).setOnClickListener {
            // Предполагается, что данные сессии уже получены от вашего backend
            startLivenessCheck(receivedAttemptId, receivedBaseUrl)
        }
    }

    private fun startLivenessCheck(attemptId: String, baseUrl: String) {
        val transaction = Transaction(
            attemptId = attemptId,  // Получен от вашего backend
            baseUrl = baseUrl       // Только домен, например: "https://ableid-dev-back.theable.tech"
        )
        val locale = AbleLocale.ru
        
        // Колбэк вызывается в главном потоке до закрытия экрана SDK,
        // поэтому здесь только логируем и показываем Toast
        AbleID.service().startLiveness(this, transaction, locale) { result ->
            when (result) {
                is LivenessResult.Success -> {
                    val response = result.response
                    Log.d("AbleID", "Liveness check completed successfully: $response")
                    handleSuccess(response)
                }
                is LivenessResult.Failure -> {
                    val error = result.error
                    Log.e("AbleID", "Liveness check failed: $error")
                    handleError(error)
                }
            }
        }
    }
    
    private fun handleSuccess(response: AbleIdLivenessResponse) {
        Toast.makeText(this, "Проверка liveness завершена успешно", Toast.LENGTH_SHORT).show()
        // Результат будет автоматически отправлен на ваш webhook URL
        // Вы можете также уведомить ваш backend о завершении процесса
        Log.d("AbleID", "Transaction ID: ${response.transactionId}")
        Log.d("AbleID", "Estimated Age: ${response.estimatedAge}")
    }
    
    private fun handleError(error: AbleIdLivenessError) {
        val message = when (error) {
            is AbleIdLivenessError.UserCancellationError -> "Пользователь отменил проверку"
            is AbleIdLivenessError.AbleLivenessProcessingError -> "Ошибка обработки liveness"
            is AbleIdLivenessError.AbleInstructionsLoadError -> "Ошибка загрузки инструкций"
        }
        
        Toast.makeText(this, message, Toast.LENGTH_LONG).show()
        Log.e("AbleID", "Error: $message")
    }
}
```

## Инструкции для Flutter

### Добавление ссылок на репозитории

В файле `build.gradle.kts` проекта (Project: android) добавьте следующие репозитории в блок `allprojects`, сохранив существующие `google()` и `mavenCentral()`:

```kotlin
allprojects {
    repositories {
        google()
        mavenCentral()
        maven {
            url = uri("https://jitpack.io")
            credentials {
                username = "YOUR_JITPACK_USERNAME" // Будет предоставлен отдельно
            }
        }
        maven {
            url = uri("https://maven.regulaforensics.com/RegulaDocumentReader")
        }
    }
}
```

**Важно:** Замените `YOUR_JITPACK_USERNAME` на учетные данные, которые будут предоставлены вам командой AbleID.

### Добавление зависимости библиотеки

В файле `build.gradle.kts` модуля app добавьте зависимость SDK в блок dependencies (последняя версия — `v1.2.0`):

```kotlin
dependencies {
    implementation("com.github.theabletechnologies:AbleIDSDK-Jitpack:v1.2.0")
}
```

Версия Kotlin Gradle Plugin (`org.jetbrains.kotlin.android`, обычно задается в `android/settings.gradle.kts`) должна быть 2.1 или новее.

### Настройка темы AppCompat

Экраны SDK используют тему, заданную у элемента `<application>`, а во Flutter-проекте она по умолчанию не указана. Добавьте в файл `android/app/src/main/res/values/styles.xml` тему с кастомным именем (например, `your_theme_name`), которая наследуется от `Theme.AppCompat.NoActionBar`. Существующие стили `LaunchTheme` и `NormalTheme` не удаляйте — на них ссылается `AndroidManifest.xml`:

```xml
<resources>
    <!-- LaunchTheme и NormalTheme оставьте без изменений -->
    <style name="your_theme_name" parent="Theme.AppCompat.NoActionBar">
    </style>
</resources>
```

Затем укажите эту тему у элемента `<application>` в файле `android/app/src/main/AndroidManifest.xml`:

```xml
<application
    android:theme="@style/your_theme_name"
    ...>
```

Тема `MainActivity` задается отдельно (`LaunchTheme` и `NormalTheme`), поэтому внешний вид Flutter-приложения не изменится.

## Поддержка

Для получения технической поддержки или сообщения об ошибках:

- **Email:** jasurtsalimov@gmail.com

## Автор

Jasur Salimov, jasurtsalimov@gmail.com

## Лицензия

AbleIDSDK доступен под лицензией MIT.

## Получение учетных данных

Для получения необходимых учетных данных JitPack:

1. Обратитесь к команде AbleID по email: jasurtsalimov@gmail.com
2. Укажите название вашего проекта и цель использования SDK
3. Вам будут предоставлены персональные учетные данные для доступа к приватному репозиторию

**Безопасность:** Не передавайте учетные данные третьим лицам и не публикуйте их в открытых репозиториях.
