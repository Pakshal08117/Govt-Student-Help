class AppConstants {
  // App Info
  static const String appName = 'Government Help';
  static const String appVersion = '1.0.0';
  
  // API Endpoints
  static const String apiBaseUrl = 'https://your-api.vercel.app';
  static const String schemesEndpoint = '/api/schemes';
  static const String applicationsEndpoint = '/api/applications';
  
  // Storage Keys
  static const String tokenKey = 'auth_token';
  static const String userKey = 'user_data';
  static const String languageKey = 'selected_language';
  static const String themeKey = 'theme_mode';
  
  // Supported Languages
  static const List<String> supportedLanguages = [
    'en', 'hi', 'mr', 'bn', 'te', 'ta', 'gu', 'kn', 'ml', 'pa', 'or', 'as'
  ];
  
  // Categories
  static const List<String> schemeCategories = [
    'Healthcare',
    'Agriculture',
    'Housing',
    'Employment',
    'Social Security',
    'Food Security',
    'Education',
  ];
  
  // Cache Duration
  static const Duration cacheDuration = Duration(hours: 24);
  
  // Pagination
  static const int itemsPerPage = 20;
  
  // Timeouts
  static const Duration apiTimeout = Duration(seconds: 30);
  static const Duration connectionTimeout = Duration(seconds: 10);
}
