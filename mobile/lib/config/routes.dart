import 'package:flutter/material.dart';
import '../screens/splash/splash_screen.dart';
import '../screens/home/home_screen.dart';
import '../screens/auth/login_screen.dart';
import '../screens/auth/register_screen.dart';
import '../screens/schemes/schemes_list_screen.dart';
import '../screens/schemes/scheme_detail_screen.dart';
import '../screens/dashboard/user_dashboard_screen.dart';
import '../screens/admin/admin_panel_screen.dart';
import '../screens/profile/profile_screen.dart';
import '../screens/applications/applications_screen.dart';
import '../screens/settings/settings_screen.dart';

class AppRoutes {
  static const String splash = '/';
  static const String home = '/home';
  static const String login = '/login';
  static const String register = '/register';
  static const String schemes = '/schemes';
  static const String schemeDetail = '/scheme-detail';
  static const String dashboard = '/dashboard';
  static const String admin = '/admin';
  static const String profile = '/profile';
  static const String applications = '/applications';
  static const String settings = '/settings';

  static Map<String, WidgetBuilder> get routes => {
        splash: (context) => const SplashScreen(),
        home: (context) => const HomeScreen(),
        login: (context) => const LoginScreen(),
        register: (context) => const RegisterScreen(),
        schemes: (context) => const SchemesListScreen(),
        dashboard: (context) => const UserDashboardScreen(),
        admin: (context) => const AdminPanelScreen(),
        profile: (context) => const ProfileScreen(),
        applications: (context) => const ApplicationsScreen(),
        settings: (context) => const SettingsScreen(),
      };

  static Route<dynamic>? onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case schemeDetail:
        final args = settings.arguments as Map<String, dynamic>?;
        return MaterialPageRoute(
          builder: (context) => SchemeDetailScreen(
            schemeId: args?['schemeId'] ?? '',
          ),
        );
      default:
        return null;
    }
  }
}
