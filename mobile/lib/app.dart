import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import 'config/theme.dart';
import 'config/routes.dart';
import 'providers/theme_provider.dart';
import 'providers/auth_provider.dart';
import 'screens/splash/splash_screen.dart';
import 'screens/home/home_screen.dart';
import 'screens/auth/login_screen.dart';

class GovtHelpApp extends StatelessWidget {
  const GovtHelpApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(375, 812),
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (context, child) {
        return Consumer2<ThemeProvider, AuthProvider>(
          builder: (context, themeProvider, authProvider, _) {
            return MaterialApp(
              title: 'Government & Student Help',
              debugShowCheckedModeBanner: false,
              
              // Localization
              localizationsDelegates: context.localizationDelegates,
              supportedLocales: context.supportedLocales,
              locale: context.locale,
              
              // Theme
              theme: AppTheme.lightTheme,
              darkTheme: AppTheme.darkTheme,
              themeMode: themeProvider.themeMode,
              
              // Routes
              initialRoute: AppRoutes.splash,
              routes: AppRoutes.routes,
              onGenerateRoute: AppRoutes.onGenerateRoute,
              
              // Home
              home: _getInitialScreen(authProvider),
            );
          },
        );
      },
    );
  }

  Widget _getInitialScreen(AuthProvider authProvider) {
    if (authProvider.isLoading) {
      return const SplashScreen();
    }
    
    if (authProvider.isAuthenticated) {
      return const HomeScreen();
    }
    
    return const LoginScreen();
  }
}
