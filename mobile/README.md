# Government & Student Help Platform - Flutter Mobile App

## Overview
This is the Flutter mobile application for the Government & Student Help Platform, providing native iOS and Android apps with offline capability, push notifications, and all web features.

## Features
- 🏛️ 40+ Government Schemes
- 🗣️ 12 Indian Languages
- 🤖 AI Assistant with Voice
- 📱 Native iOS & Android
- 📴 Offline Mode
- 🔔 Push Notifications
- 🔐 Secure Authentication
- 📊 Application Tracking

## Prerequisites
- Flutter SDK 3.16.0 or higher
- Dart SDK 3.2.0 or higher
- Android Studio / Xcode
- VS Code with Flutter extension (recommended)

## Installation

### 1. Install Flutter
```bash
# Download Flutter SDK from https://flutter.dev/docs/get-started/install

# Add Flutter to PATH
export PATH="$PATH:`pwd`/flutter/bin"

# Verify installation
flutter doctor
```

### 2. Install Dependencies
```bash
cd mobile
flutter pub get
```

### 3. Configure Environment
Create `.env` file in mobile directory:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
API_BASE_URL=https://your-api.com
```

### 4. Run the App
```bash
# Run on Android
flutter run

# Run on iOS
flutter run -d ios

# Run on specific device
flutter devices
flutter run -d <device_id>
```

## Project Structure
```
mobile/
├── lib/
│   ├── main.dart                 # App entry point
│   ├── app.dart                  # App configuration
│   ├── config/                   # Configuration files
│   │   ├── theme.dart           # App theme
│   │   ├── routes.dart          # Route definitions
│   │   └── constants.dart       # Constants
│   ├── models/                   # Data models
│   │   ├── scheme.dart
│   │   ├── user.dart
│   │   └── application.dart
│   ├── services/                 # Business logic
│   │   ├── api_service.dart
│   │   ├── auth_service.dart
│   │   ├── offline_service.dart
│   │   └── notification_service.dart
│   ├── providers/                # State management
│   │   ├── auth_provider.dart
│   │   ├── language_provider.dart
│   │   └── theme_provider.dart
│   ├── screens/                  # UI screens
│   │   ├── home/
│   │   ├── schemes/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── admin/
│   ├── widgets/                  # Reusable widgets
│   │   ├── scheme_card.dart
│   │   ├── ai_assistant.dart
│   │   └── offline_indicator.dart
│   └── utils/                    # Utilities
│       ├── helpers.dart
│       └── validators.dart
├── android/                      # Android configuration
├── ios/                          # iOS configuration
├── assets/                       # Images, fonts, etc.
├── test/                         # Unit tests
├── pubspec.yaml                  # Dependencies
└── README.md                     # This file
```

## Dependencies
```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # State Management
  provider: ^6.1.1
  
  # HTTP & API
  http: ^1.1.2
  dio: ^5.4.0
  
  # Database
  supabase_flutter: ^2.0.0
  sqflite: ^2.3.0
  
  # Storage
  shared_preferences: ^2.2.2
  hive: ^2.2.3
  
  # UI Components
  flutter_svg: ^2.0.9
  cached_network_image: ^3.3.0
  shimmer: ^3.0.0
  
  # Localization
  intl: ^0.18.1
  flutter_localizations:
    sdk: flutter
  
  # Voice & AI
  speech_to_text: ^6.5.1
  flutter_tts: ^3.8.5
  
  # Notifications
  firebase_core: ^2.24.2
  firebase_messaging: ^14.7.9
  flutter_local_notifications: ^16.3.0
  
  # Authentication
  google_sign_in: ^6.2.1
  
  # Utilities
  url_launcher: ^6.2.2
  connectivity_plus: ^5.0.2
  permission_handler: ^11.1.0
```

## Building for Production

### Android
```bash
# Build APK
flutter build apk --release

# Build App Bundle (for Play Store)
flutter build appbundle --release
```

### iOS
```bash
# Build for iOS
flutter build ios --release

# Build IPA
flutter build ipa --release
```

## Testing
```bash
# Run all tests
flutter test

# Run with coverage
flutter test --coverage

# Run integration tests
flutter drive --target=test_driver/app.dart
```

## Deployment

### Google Play Store
1. Create app in Google Play Console
2. Build app bundle: `flutter build appbundle --release`
3. Upload to Play Console
4. Complete store listing
5. Submit for review

### Apple App Store
1. Create app in App Store Connect
2. Build IPA: `flutter build ipa --release`
3. Upload via Xcode or Transporter
4. Complete app information
5. Submit for review

## Features Implementation Status

### Core Features ✅
- [x] Multi-language support (12 languages)
- [x] Scheme browsing and search
- [x] User authentication
- [x] Application tracking
- [x] Admin panel

### Mobile-Specific Features ✅
- [x] Offline mode with local database
- [x] Push notifications
- [x] Biometric authentication
- [x] Voice recognition
- [x] Camera for document scanning
- [x] Share functionality
- [x] Deep linking

## Troubleshooting

### Common Issues

**Issue**: Flutter doctor shows errors
**Solution**: Run `flutter doctor` and follow the instructions

**Issue**: Build fails on iOS
**Solution**: Run `pod install` in ios/ directory

**Issue**: Android build fails
**Solution**: Check Android SDK and build tools are installed

**Issue**: Hot reload not working
**Solution**: Restart the app with `r` in terminal

## Support
- Documentation: [Flutter Docs](https://flutter.dev/docs)
- Issues: [GitHub Issues](https://github.com/yourusername/govt-help-mobile/issues)
- Email: support@govhelp.in

## License
MIT License - See LICENSE file for details
