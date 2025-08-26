---
id: android-sdk
title: Able ID - Android(sdk)
---

# Android SDK

Able ID SDK обеспечивает надежное распознавание лиц и защиту от мошеннических попыток. Использует биометрическую верификацию и предотвращает атаки подмены, включая статические изображения, печатные фотографии, видеоповторы, инъекции и маски, обеспечивая безопасную и надежную идентификацию.

## Возможности

- [x] Распознавание лиц с технологией Active Liveness Detection

## Требования

- **minSdk:** 21
- **compileSdk:** 35  
- **JavaVersion:** 17

## Установка

### Добавление зависимости библиотеки

В файле `build.gradle.kts` модуля app добавьте следующую зависимость, заменив `Tag` на последнюю версию релиза (например, 0.4.9):

```kotlin
dependencies {
    implementation("com.github.theabletechnologies:AbleIDSDK-Jitpack:Tag")
}
```

### Настройка dependencyResolutionManagement в settings.gradle.kts

В секции `dependencyResolutionManagement` файла `settings.gradle.kts` добавьте необходимые Maven репозитории. **Примечание:** Убедитесь, что включили учетные данные для доступа к приватным репозиториям, используемым библиотекой. Учетные данные будут предоставлены отдельно:

```kotlin
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
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

## Быстрый старт

### 1. Импорт SDK

Убедитесь, что вы интегрировали Able ID SDK в ваш проект. Затем импортируйте необходимый модуль:

```kotlin
import com.example.ableidsdk.external.AbleID
```

### 2. Создание транзакции

Создайте объект Transaction с уникальным `your_unique_attempt_id` и `your_liveness_end_point`. ID поможет вам отслеживать конкретную попытку проверки liveness. Endpoint (URL) для API проверки liveness:

```kotlin
val transaction: Transaction = Transaction("your_unique_attempt_id", "your_liveness_end_point")
```

### 3. Инициация проверки Liveness

Вызовите метод **startLiveness** объекта **AbleID.service**, передав текущий **Activity(context)** и объект **Transaction**:

```kotlin
AbleID.service().startLiveness(this, transaction) { result ->
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

### 4. Обработка результата

Метод **startLiveness** выполняется асинхронно, возвращая **LivenessResult**, который указывает, была ли проверка liveness успешной или неудачной:

```kotlin
public sealed class LivenessResult {
    public data class Success(val response: AbleIdLivenessResponse) : LivenessResult()
    public data class Failure(val error: AbleIdLivenessError) : LivenessResult()
}
```

## Локализация

Able ID SDK поддерживает несколько языков. SDK автоматически наследует локаль приложения и использует её. Язык по умолчанию - английский.

## Пример полной интеграции

```kotlin
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.ableidsdk.external.AbleID
import java.util.*

class MainActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        findViewById<Button>(R.id.startLivenessButton).setOnClickListener {
            startLivenessCheck()
        }
    }
    
    private fun startLivenessCheck() {
        val transaction = Transaction(
            attemptId = UUID.randomUUID().toString(),
            livenessEndPoint = "https://faceid-back.theable.tech"
        )
        
        AbleID.service().startLiveness(this, transaction) { result ->
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
        runOnUiThread {
            Toast.makeText(this, "Проверка liveness завершена успешно", Toast.LENGTH_SHORT).show()
            // Здесь вы можете обработать успешный результат
            // например, отправить данные на ваш сервер
            Log.d("AbleID", "Attempt ID: ${response.attemptId}")
            Log.d("AbleID", "Status: ${response.status}")
            Log.d("AbleID", "Confidence: ${response.confidence}")
            
        }
    }
    
    private fun handleError(error: AbleIdLivenessError) {
        runOnUiThread {
            val message = when (error) {
                is AbleIdLivenessError.UserCancellationError -> "Пользователь отменил проверку"
                is AbleIdLivenessError.AbleLivenessProcessingError -> "Ошибка обработки liveness"
                is AbleIdLivenessError.AbleInstructionsLoadError -> "Ошибка загрузки инструкций"
                is AbleIdLivenessError.AbleInitializationError -> "Ошибка инициализации"
                is AbleIdLivenessError.AbleCompletionRequestError -> "Ошибка завершения запроса"
                else -> "Неизвестная ошибка"
            }
            
            Toast.makeText(this, message, Toast.LENGTH_LONG).show()
            Log.e("AbleID", "Error: $message")
        }
    }
    
}
```

## Инструкции для Flutter

### Добавление ссылок на репозитории

В файле `build.gradle.kts` проекта (Project: android) добавьте следующие репозитории:

```kotlin
allprojects {
    repositories {
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

В файле `build.gradle.kts` модуля app добавьте следующую зависимость в блок dependencies. Замените `Tag` на последнюю версию релиза (например, 0.4.9):

```kotlin
dependencies {
    implementation("com.github.theabletechnologies:AbleIDSDK-Jitpack:Tag")
}
```

### Настройка темы AppCompat

В Android модуле измените файл `styles.xml`, заменив стандартный XML следующим кодом. Убедитесь, что задали кастомное имя темы (например, `your_theme_name`), которое наследуется от `Theme.AppCompat.NoActionBar`:

```xml
<resources>
    <style name="your_theme_name" parent="Theme.AppCompat.NoActionBar">
    </style>
</resources>
```

## Поддержка

Для получения технической поддержки или сообщения об ошибках:

- **Email:** jasurtsalimov@gmail.com

## Автор

Jasur Salimov, jasurtsalimov@gmail.com

## Лицензия

AbleIDSDK доступен под лицензией MIT. Подробности см. в файле LICENSE.

## Получение учетных данных

Для получения необходимых учетных данных JitPack:

1. Обратитесь к команде AbleID по email: jasurtsalimov@gmail.com
2. Укажите название вашего проекта и цель использования SDK
3. Вам будут предоставлены персональные учетные данные для доступа к приватному репозиторию

**Безопасность:** Не передавайте учетные данные третьим лицам и не публикуйте их в открытых репозиториях.